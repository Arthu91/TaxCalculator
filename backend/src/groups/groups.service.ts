import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly repo: Repository<Group>,
  ) {}

  async findAll(): Promise<Group[]> {
    return this.repo.find({ relations: ['users'] });
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.repo.findOne({ where: { id: id.toString() }, relations: ['users'] });
    if (!group) {
      throw new BadRequestException('Group not found');
    }
    return group;
  }

  async createGroup(dto: CreateGroupDto): Promise<Group> {
    try {
      const group = this.repo.create(dto);
      return await this.repo.save(group);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Group name must be unique');
      }
      throw error;
    }
  }

  async updateGroup(id: number, dto: UpdateGroupDto): Promise<Group> {
    const group = await this.repo.findOne({ where: { id: id.toString() } });
    if (!group) throw new BadRequestException('Group not found');

    group.name = dto.name;
    try {
      return await this.repo.save(group);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Group name must be unique');
      }
      throw error;
    }
  }

  async deleteGroup(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
