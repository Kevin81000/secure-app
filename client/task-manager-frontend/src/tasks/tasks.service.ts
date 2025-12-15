import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Role } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) { }

    findAll() {
        return this.tasksRepository.find({ relations: ['owner'] });
    }

    async create(createTaskDto: any, userId: number) {
        const task = this.tasksRepository.create({
            ...createTaskDto,
            ownerId: userId,
        });
        return this.tasksRepository.save(task);
    }

    async update(id: number, updateTaskDto: any, userId: number, role: Role) {
        const task = await this.tasksRepository.findOne({ where: { id } });
        if (!task) throw new ForbiddenException('Task not found');
        if (task.ownerId !== userId && role !== Role.ADMIN) {
            throw new ForbiddenException('You can only edit your own tasks');
        }
        return this.tasksRepository.update(id, updateTaskDto);
    }

    async remove(id: number, userId: number, role: Role) {
        const task = await this.tasksRepository.findOne({ where: { id } });
        if (!task) throw new ForbiddenException('Task not found');
        if (task.ownerId !== userId && role !== Role.ADMIN) {
            throw new ForbiddenException('You can only delete your own tasks');
        }
        return this.tasksRepository.delete(id);
    }
}