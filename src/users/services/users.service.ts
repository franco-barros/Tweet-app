import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

// Base de datos temporal en memoria
const usersDB: User[] = [];

@Injectable()
export class UsersService {
  async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser: User = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      password: hashedPassword,
    };
    usersDB.push(newUser);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return usersDB;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return usersDB.find((user) => user.email === email);
  }

  async findOne(id: number): Promise<User> {
    const user = usersDB.find((u) => u.id === id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, data);
    return user;
  }

  async remove(id: number): Promise<{ message: string }> {
    const index = usersDB.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException('Usuario no encontrado');
    usersDB.splice(index, 1);
    return { message: 'Usuario eliminado correctamente' };
  }
}
