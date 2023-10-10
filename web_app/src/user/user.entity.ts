import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeUpdate,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
  import { Role } from '../role/role.entity';
  import * as bcrypt from 'bcryptjs';
import { RoleEnum } from 'src/role/RoleEnum';
  
  @Entity({name: 'users'})
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

      console.log('bcrypt', bcrypt)
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
  
    }
    @Column({ type: String, nullable: true })
    firstName: string | null;
  
    @Column({ type: String, nullable: true })
    lastName: string | null;
  
    @ManyToOne(type => Role, role => role.users, { eager: true })
    @JoinColumn()
    role: Role;
  
    @CreateDateColumn()
    createdAt: Date;

    isAdmin(): boolean {
      return this.role.id == RoleEnum.admin
    }

    isModerator(): boolean {
      return this.role.id == RoleEnum.moderator
    }
  }