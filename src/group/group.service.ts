import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Group } from './entity/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { endOfDay, startOfDay } from 'date-fns';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
    ) { }

    async createNotification(createGroupDto: CreateGroupDto): Promise<Group> {
        return this.groupRepository.save(createGroupDto);
    }

    async getAllGroups(): Promise<Group[]> {
        return await this.groupRepository.find();
    }

    async getGroupById(groupId: string): Promise<Group> {
        const group = await this.groupRepository.findOne({ where: { group_id: groupId } });
        if (!group) {
            throw new NotFoundException(`Group with ID ${groupId} not found`);
        }
        return group;
    }

    async getGroupByUserId(createdBy: string): Promise<Group[]> {
        return this.groupRepository.find({ where: { created_by: createdBy } });
    }

    async editGroup(groupId: string, updateData: Partial<CreateGroupDto>): Promise<Group> {
        const group = await this.groupRepository.findOne({ where: { group_id: groupId } });
        if (!group) {
            throw new NotFoundException(`Group with ID ${groupId} not found`);
        }
        Object.assign(group, updateData);
        return this.groupRepository.save(group);
    }

    async deleteGroup(groupId: string): Promise<void> {
        const result = await this.groupRepository.delete({ group_id: groupId });
        if (result.affected === 0) {
            throw new NotFoundException(`Group with ID ${groupId} not found`);
        }
    }

}
