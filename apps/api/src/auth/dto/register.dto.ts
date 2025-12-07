import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
import { Role } from '../roles.enum';

export class RegisterDto {
    @IsString()
    name!: string;

    @IsEmail()
    email!: string;

    @MinLength(6)
    password!: string;

    @IsOptional()
    role?: Role;

    @IsOptional()
    organizationId?: string;
}
