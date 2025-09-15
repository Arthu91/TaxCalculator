import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { TaxService } from '../tax/tax.service';

// Mocks
const mockUserRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockTaxService = {
  computeMonthlyWithholding: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let userRepo: jest.Mocked<Repository<User>>;
  let taxService: jest.Mocked<TaxService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: TaxService, useValue: mockTaxService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepo = module.get(getRepositoryToken(User));
    taxService = module.get(TaxService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should call userRepo.find', async () => {
    const users = [{ id: '1', name: 'Alice' }];
    userRepo.find.mockResolvedValue(users as any);

    const result = await service.findAll();
    expect(userRepo.find).toHaveBeenCalledWith({ relations: ['group'] });
    expect(result).toEqual(users);
  });

  it('computeUserTax should return tax result for a user', async () => {
    const user = { id: '1', salary: 50000 } as User;
    userRepo.findOne.mockResolvedValue(user);
    taxService.computeMonthlyWithholding.mockReturnValue({ annualTax: 24000, monthlyTax: 2000 });

    const result = await service.computeUserTax(1);

    expect(userRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(taxService.computeMonthlyWithholding).toHaveBeenCalledWith(50000);
    expect(result).toEqual({
      userId: '1',
      salary: 50000,
      annualTax: 24000,
      monthlyTax: 2000,
    });
  });

  it('computeUserTax should throw if user not found', async () => {
    userRepo.findOne.mockResolvedValue(null);

    await expect(service.computeUserTax(99)).rejects.toThrow('User not found');
  });
});
