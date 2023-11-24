import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class LoginEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: String, nullable: false })
    name: string;
  
    @Column({ type: String, nullable: true })
    avatar: string;
  
    @Column({ type: String, nullable: true })
    surplus_token: string;
  
    @CreateDateColumn()
    create_data: string;
  }
  