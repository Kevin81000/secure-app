import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async register(dto: {
        name: string;
        email: string;
        password: string;
        role?: Role;
        organizationId?: string;
    }) {
        const existing = await this.usersRepo.findOne({ where: { email: dto.email } });
        if (existing) throw new ConflictException('Email already in use');

        const hashed = await bcrypt.hash(dto.password, 10);

        const user = this.usersRepo.create({
            name: dto.name,
            email: dto.email,
            password: hashed,
            role: dto.role ?? Role.USER,
            organizationId: dto.organizationId ?? null,
        });

        await this.usersRepo.save(user);

        return {
            message: 'User registered',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                organizationId: user.organizationId,
            },
        };
    }

    async validateCredentials(email: string, password: string) {
        const user = await this.usersRepo.findOne({ where: { email } });
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new UnauthorizedException('Invalid credentials');

        return user;
    }

    async login(user: User) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            organizationId: user.organizationId,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
