import { Test, TestingModule } from '@nestjs/testing';
import { GroupsService } from './groups.service';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

describe('GroupsService', () => {
  let service: GroupsService;
  let repo: jest.Mocked<Repository<Group>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsService,
        {
          provide: getRepositoryToken(Group),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
    repo = module.get(getRepositoryToken(Group));
  });

  it('should return all groups', async () => {
    const mockGroups = [{ id: 1, name: 'Test Group', users: [] }];
    repo.find.mockResolvedValue(mockGroups as any);

    const result = await service.findAll();

    expect(result).toEqual(mockGroups);
    expect(repo.find).toHaveBeenCalledWith({ relations: ['users'] });
  });

  it('should return one group by id', async () => {
    const mockGroup = { id: 1, name: 'Test Group', users: [] };
    repo.findOne.mockResolvedValue(mockGroup as any);

    const result = await service.findOne(1);

    expect(result).toEqual(mockGroup);
  });

  it('should throw if group not found', async () => {
    repo.findOne.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(BadRequestException);
  });

  it('should create a group', async () => {
    const dto = { name: 'New Group' };
    const mockGroup = { id: 1, ...dto };

    repo.create.mockReturnValue(mockGroup as any);
    repo.save.mockResolvedValue(mockGroup as any);

    const result = await service.createGroup(dto);

    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(mockGroup);
    expect(result).toEqual(mockGroup);
  });

  it('should update a group', async () => {
    const existingGroup = { id: 1, name: 'Old Name' };
    const dto = { name: 'Updated Name' };

    repo.findOne.mockResolvedValue(existingGroup as any);
    repo.save.mockResolvedValue({ ...existingGroup, ...dto } as any);

    const result = await service.updateGroup(1, dto);

    expect(result.name).toBe('Updated Name');
    expect(repo.save).toHaveBeenCalled();
  });

  it('should throw if updating non-existing group', async () => {
    repo.findOne.mockResolvedValue(null);

    await expect(service.updateGroup(999, { name: 'Test' }))
      .rejects.toThrow(BadRequestException);
  });

  it('should delete a group', async () => {
    repo.delete.mockResolvedValue({} as any);

    await service.deleteGroup(1);

    expect(repo.delete).toHaveBeenCalledWith(1);
  });
});
