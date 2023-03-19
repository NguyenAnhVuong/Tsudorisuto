import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  dueDate: Date;

  @Field(() => Int)
  priority: number;
}
