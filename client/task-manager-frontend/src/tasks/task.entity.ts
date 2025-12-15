// src/tasks/task.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ nullable: true })
    description!: string;

    @Column({ default: false })
    completed!: boolean;

    @ManyToOne('User', 'tasks') 
    owner!: any;

    @Column()
    ownerId!: number;
}

