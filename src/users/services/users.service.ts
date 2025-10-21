import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { IUser } from '../../interfaces/user.interface';
import * as bcrypt from 'bcrypt';

// Base de datos temporal en memoria
const usersDB: UserEntity[] = [];

@Injectable()
export class UsersService {
  async create(data: CreateUserDto): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = new UserEntity({
      id: Date.now(),
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    usersDB.push(newUser);
    return newUser;
  }

  async findAll(): Promise<IUser[]> {
    return usersDB;
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    return usersDB.find((user) => user.email === email);
  }

  async findOne(id: number): Promise<IUser> {
    const user = usersDB.find((u) => u.id === id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async update(id: number, data: UpdateUserDto): Promise<IUser> {
    const user = await this.findOne(id);
    Object.assign(user, data, { updatedAt: new Date() });
    return user;
  }

  async remove(id: number): Promise<{ message: string }> {
    const index = usersDB.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException('Usuario no encontrado');
    usersDB.splice(index, 1);
    return { message: 'Usuario eliminado correctamente' };
  }
}
