import { Controller, UseGuards, Get, Post, Body, Req, Patch, Param, Delete } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';

interface AuthRequest extends Request {
    user: {
        sub: number;
        role: string;
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
        const userId = req.user.sub;
        return this.tasksService.create(createTaskDto, userId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTaskDto: any, @Req() req: AuthRequest) {
        const userId = req.user.sub;
        const role = req.user.role as 'user' | 'admin';
        return this.tasksService.update(+id, updateTaskDto, userId, role);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: AuthRequest) {
        const userId = req.user.sub;
        const role = req.user.role as 'user' | 'admin';
        return this.tasksService.remove(+id, userId, role);
    }
}
