import { eq } from 'drizzle-orm';

import { db } from '../../../database/database.config';
import { users } from '../../../database/schema/schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export class UsersService {
  async findAllUsers() {
    const findAllUsers = await db.query.users.findMany();
    return findAllUsers;
  }

  async findOneUser(id: number) {
    const findOneUser = await db.query.users.findMany({
      where: eq(users.id, id),
    });

    return findOneUser;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;

    await db.insert(users).values({
      username: username,
      email: email,
      password: password,
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = updateUserDto;

    await db.update(users).set(user).where(eq(users.id, id));
  }

  async deleteUser(id: number) {
    await db.delete(users).where(eq(users.id, id));
  }
}
