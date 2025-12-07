import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Role } from '../auth/roles.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) { }

  async findForUser(user: any): Promise<Task[]> {
    if (user.role === Role.OWNER || user.role === Role.ADMIN) {
      return this.taskRepo.find({
        where: { organizationId: user.organizationId },
      });
    }

    return this.taskRepo.find({
      where: { createdBy: user.id },
    });
  }

  async create(data: Partial<Task>): Promise<Task> {
    const task = this.taskRepo.create(data);
    return this.taskRepo.save(task);
  }

  async findOneForUser(id: string, user: any): Promise<Task> {
    const task = await this.taskRepo.findOne({ where: { id } });

    if (!task) throw new NotFoundException(`Task ${id} not found`);

    // USER — must own the task
    if (user.role === Role.USER) {
      if (task.createdBy !== user.id) {
        throw new ForbiddenException('This task does not belong to you');
      }
      return task;
    }

    // ADMIN / OWNER — must match organization
    if (task.organizationId !== user.organizationId) {
      throw new ForbiddenException('Task not in your organization');
    }

    return task;
  }

  async update(id: string, body: Partial<Task>, user: any): Promise<Task> {
    const task = await this.findOneForUser(id, user);
    Object.assign(task, body);
    return this.taskRepo.save(task);
  }

  async remove(id: string, user: any): Promise<void> {
    const task = await this.findOneForUser(id, user);
    await this.taskRepo.remove(task);
  }
}
