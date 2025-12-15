

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../../tasks/task.entity';

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column()
    name!: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role!: Role;

    @OneToMany(() => Task, (task) => task.owner)
    tasks!: Task[];


}