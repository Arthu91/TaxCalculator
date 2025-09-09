import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  getGroups() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  getGroup(@Param('id') id: number) {
    return this.groupsService.findOne(+id);
  }

  @Post()
  createGroup(@Body() dto: CreateGroupDto) {
    return this.groupsService.createGroup(dto);
  }

  @Put(':id')
  updateGroup(@Param('id') id: number, @Body() body: UpdateGroupDto) {
    return this.groupsService.updateGroup(+id, body);
  }

  @Delete(':id')
  deleteGroup(@Param('id') id: number) {
    return this.groupsService.deleteGroup(+id);
  }
}
