import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupService } from './group.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) { }

    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create group' })
    @Post('create')
    async createNotification(@Body() createGroupDto: CreateGroupDto) {
        return this.groupService.createNotification(createGroupDto);
    }

    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get group by Id' })
    @Get('/:id')
    async getGroupById(
        @Param('id') id: string
    ) {
        return this.groupService.getGroupById(id);
    }

    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get user groups' })
    @Get('/user/:id')
    async getGroupByUserId(
        @Param('id') id: string
    ) {
        return this.groupService.getGroupByUserId(id);
    }

    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Edit group' })
    @Put('/:id')
    async editGroup(
        @Param('id') id: string, @Body() updateData: Partial<CreateGroupDto>
    ) {
        return this.groupService.editGroup(id, updateData);
    }

    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete group' })
    @Delete('/:id')
    async deleteGroup(
        @Param('id') id: string
    ) {
        await this.groupService.deleteGroup(id);
        return { message: `Group with ID ${id} has been deleted` };
    }

    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get all groups' })
    @Get('/')
    async getAllGroups() {
        return this.groupService.getAllGroups();
    }
}
