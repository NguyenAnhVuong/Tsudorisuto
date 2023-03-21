import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Delete {
  @Field(() => Int)
  count: number;
}
