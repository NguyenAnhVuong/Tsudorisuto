import { Injectable } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Injectable()
export class TodoService {
  create(createTodoInput: CreateTodoInput) {
    return 'This action adds a new todo';
  }

  findAll() {
    return `This action returns all todo`;
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

  update(id: number, updateTodoInput: UpdateTodoInput) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
