import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get()
  async findAll(@Req() req: any) {
    return this.tasksService.findForUser(req.user);
  }

  @Post()
async create(@Body() body: any, @Req() req: any) {
  console.log('REQ USER:', req.user);
  console.log('TASK BODY:', body);

  const user = req.user;

  const newTask = {
    ...body,
    createdBy: user?.id,
    organizationId: user?.organizationId,
  };

  console.log('FINAL TASK:', newTask);

  return this.tasksService.create(newTask);
}






  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    return this.tasksService.findOneForUser(id, req.user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any, @Req() req: any) {
    return this.tasksService.update(id, body, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    return this.tasksService.remove(id, req.user);
  }
}
