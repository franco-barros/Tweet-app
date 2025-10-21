import { IUser } from '../../interfaces/user.interface';

export class UserEntity implements IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<IUser>) {
    Object.assign(this, {
      ...partial,
      createdAt: partial.createdAt ?? new Date(),
      updatedAt: partial.updatedAt ?? new Date(),
    });
  }
}
