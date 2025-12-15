import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Role } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async register(email: string, password: string, name: string) {
        const existing = await this.usersRepository.findOne({ where: { email } });
        if (existing) throw new BadRequestException('User already exists');

        const userCount = await this.usersRepository.count();
        const role = userCount === 0 ? Role.ADMIN : Role.USER; // First user = ADMIN

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.usersRepository.create({
            email,
            password: hashedPassword,
            name,
            role,
        });

        await this.usersRepository.save(user);

        const payload = { sub: user.id, role: user.role };
        return { access_token: this.jwtService.sign(payload) };
    }


}