import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'shows',
})
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false, unique: true })
  name: string;

  @Column('text', { nullable: false })
  descipt: string;

  @Column('varchar', { nullable: false })
  show_date: string[];

  @Column('bigint', { nullable: false })
  space_left: number;

  @Column('varchar', { nullable: false })
  location: string;

  @Column('varchar', { nullable: false })
  category: string[];

  @Column('varchar', {})
  img_url: string[];

  @Column('boolean', { default: true, nullable: false })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
