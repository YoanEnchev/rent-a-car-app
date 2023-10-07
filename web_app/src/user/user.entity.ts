import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToOne,
  } from 'typeorm';
  import { Role } from '../role/role.entity';
  import bcrypt from 'bcryptjs';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    // For "string | null" we need to use String type.
    // More info: https://github.com/typeorm/typeorm/issues/2567
    @Column({ type: String, unique: true, nullable: true })
    email: string | null;
  
    @Column({ nullable: false })
    password: string;
  
    public previousPassword: string;
  
    @BeforeInsert()
    @BeforeUpdate()
    async setPassword() {
      if (this.previousPassword !== this.password && this.password) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
      }
    }
    @Column({ type: String, nullable: true })
    firstName: string | null;
  
    @Column({ type: String, nullable: true })
    lastName: string | null;
  
    @OneToOne(() => Role, {
      eager: true,
    })
    role?: Role | null;
  
    @CreateDateColumn()
    createdAt: Date;
  }