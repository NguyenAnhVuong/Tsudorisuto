import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTodoInput: CreateTodoInput, uid: string) {
    return await this.prisma.todo.create({
      data: {
        ...createTodoInput,
        uid,
      },
    });
  }

  async findAll(keyWord: string, uid: string) {
    if (!keyWord) {
      return await this.prisma.todo.findMany({
        where: {
          uid,
        },
        orderBy: {
          dueDate: 'asc',
        },
      });
    }
    return await this.prisma.todo.findMany({
      where: {
        uid,
        OR: [
          {
            title: {
              contains: keyWord,
            },
          },
          {
            description: {
              contains: keyWord,
            },
          },
        ],
      },
      orderBy: {
        dueDate: 'asc',
      },
    });
  }

  findOne(id: number) {
    return {
      id,
      title: 'test',
      description: 'test-description',
      dueDate: new Date(),
      priority: 0,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        uid: 'test',
        name: 'test',
      },
    };
  }

  async update(id: number, updateTodoInput: UpdateTodoInput) {
    return await this.prisma.todo.update({
      where: {
        id,
      },
      data: {
        ...updateTodoInput,
      },
    });
  }

  async remove(ids: number[]) {
    const data = await this.prisma.todo.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return { count: data.count };
  }
}
