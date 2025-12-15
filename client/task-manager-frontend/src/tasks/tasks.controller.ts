// src/tasks/tasks.controller.ts

import { Controller, Get, Post, Body, Param, Delete, Patch, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { Role } from '../users/entities/user.entity';

interface AuthRequest extends Request {
    user: {
        sub: number;
        role: Role;
    };
}

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    findAll() {
        return this.tasksService.findAll();
    }

    @Post()
    create(@Body() createTaskDto: any, @Req() req: AuthRequest) {
        return this.tasksService.create(createTaskDto, req.user.sub);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTaskDto: any, @Req() req: AuthRequest) {
        return this.tasksService.update(+id, updateTaskDto, req.user.sub, req.user.role);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: AuthRequest) {
        return this.tasksService.remove(+id, req.user.sub, req.user.role);
    }
}