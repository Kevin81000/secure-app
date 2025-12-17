import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Role } from '../auth/roles.enum';

@Injectable()
export class TaskOwnershipGuard implements CanActivate {
  constructor(private readonly tasksService: TasksService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const taskId = req.params.id;


    const task = await this.tasksService.findOneForUser(taskId, user);


    return true;
  }
}
