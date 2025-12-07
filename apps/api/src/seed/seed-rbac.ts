import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app/app.module';
import { UsersService } from '../users/users.service';
import { Role } from '../auth/roles.enum';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const users = app.get(UsersService);

  const seedUsers = [
    {
      organizationId: 1,
      name: 'Owner User',
      email: 'owner@example.com',
      password: 'password',
      role: Role.OWNER,
    },
    {
      organizationId: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password',
      role: Role.ADMIN,
    },
    {
      organizationId: 1,
      name: 'Viewer User',
      email: 'viewer@example.com',
      password: 'password',
      role: Role.VIEWER,
    },
  ];

  for (const u of seedUsers) {
    await users.create(u);
  }

  console.log('RBAC seed complete');
  await app.close();
}

bootstrap();
