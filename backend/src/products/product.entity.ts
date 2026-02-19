import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cod_ean: string;

  @Column('text')
  description: string;

  @Column('text', { nullable: true })
  category: string;

  @Column('int')
  stock: number;

  @Column({ type: 'date', nullable: true })
  expiration_date: Date;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
