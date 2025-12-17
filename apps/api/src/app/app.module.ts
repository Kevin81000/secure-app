// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { TasksModule } from '../tasks/tasks.module';
import { User } from '../users/entities/user.entity';
import { Task } from '../tasks/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Task],
      synchronize: true, // Set to false in production
      logging: false,
    }),
    JwtModule.register({
      global: true,
      secret: 'your-super-secret-jwt-key-change-in-production',
      signOptions: { expiresIn: '24h' },
    }),
    AuthModule,
    UsersModule,
    TasksModule,
  ],
})
export class AppModule { }
