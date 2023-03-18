import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Todo } from 'src/todo/entities/todo.entity';

@ObjectType()
export class User {
  @Field(() => String)
  uid: string;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Todo], { nullable: true })
  toDo?: Todo[];
}
