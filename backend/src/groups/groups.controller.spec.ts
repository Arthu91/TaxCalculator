import { Test, TestingModule } from '@nestjs/testing';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

describe('GroupsController', () => {
  let controller: GroupsController;
  let service: GroupsService;

  const mockGroupsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    createGroup: jest.fn(),
    updateGroup: jest.fn(),
    deleteGroup: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [
        {
          provide: GroupsService,
          useValue: mockGroupsService,
        },
      ],
    }).compile();

    controller = module.get<GroupsController>(GroupsController);
    service = module.get<GroupsService>(GroupsService);
  });

  it('should return all groups', async () => {
    const groups = [{ id: 1, name: 'Test Group' }];
    mockGroupsService.findAll.mockResolvedValue(groups);

    const result = await controller.getGroups();
    expect(result).toEqual(groups);
  });

  it('should return one group', async () => {
    const group = { id: 1, name: 'Test Group' };
    mockGroupsService.findOne.mockResolvedValue(group);

    const result = await controller.getGroup(1);
    expect(result).toEqual(group);
  });

  it('should create a group', async () => {
    const dto: CreateGroupDto = { name: 'New Group' };
    const group = { id: 1, ...dto };
    mockGroupsService.createGroup.mockResolvedValue(group);

    const result = await controller.createGroup(dto);
    expect(result).toEqual(group);
  });

  it('should update a group', async () => {
    const dto: UpdateGroupDto = { name: 'Updated Group' };
    const updated = { id: 1, ...dto };
    mockGroupsService.updateGroup.mockResolvedValue(updated);

    const result = await controller.updateGroup(1, dto);
    expect(result).toEqual(updated);
  });

  it('should delete a group', async () => {
    mockGroupsService.deleteGroup.mockResolvedValue(undefined);

    const result = await controller.deleteGroup(1);
    expect(result).toBeUndefined();
  });
});
