import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false, unique: true })
  email: string;

  @Column('varchar', { select: false, nullable: false })
  password: string;

  @Column('varchar', { unique: true, nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  phone: string;

  @Column('bigint', { default: 1000000 })
  point: number;

  @Column('boolean', { default: false, nullable: false, select: false })
  admin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
