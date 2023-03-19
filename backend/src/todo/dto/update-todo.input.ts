import { CreateTodoInput } from './create-todo.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  dueDate: Date;

  @Field(() => Boolean)
  completed: boolean;

  @Field(() => Int)
  priority: number;
}
