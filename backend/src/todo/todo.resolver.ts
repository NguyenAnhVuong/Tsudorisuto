import { CurrentUser } from './../auth/decorator/user.decorator';
import { FirebaseAuthGuard } from './../auth/guard/firebase-auth.guard';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { UseGuards } from '@nestjs/common';

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

  @Mutation(() => Todo)
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.remove(id);
  }
}
