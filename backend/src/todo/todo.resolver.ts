import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from './../auth/decorator/user.decorator';
import { FirebaseAuthGuard } from './../auth/guard/firebase-auth.guard';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Delete } from './entities/delete.entity';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

@UseGuards(FirebaseAuthGuard)
@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => Todo)
  createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
    @CurrentUser() user: any,
  ) {
    return this.todoService.create(createTodoInput, user.uid);
  }

  @Query(() => [Todo], { name: 'searchTodo' })
  findAll(@Args('keyWord') keyWord: string, @CurrentUser() user: any) {
    return this.todoService.findAll(keyWord, user.uid);
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.update(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => Delete)
  removeTodos(@Args('ids', { type: () => [Int] }) ids: number[]) {
    return this.todoService.remove(ids);
  }
}
