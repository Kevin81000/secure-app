import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    category?: string;

    @Column({ type: 'text', nullable: true })
    organizationId?: string | null;

    @Column({ type: 'text', nullable: true })
    createdBy?: string | null;

    @CreateDateColumn()
    createdAt!: Date;
}
