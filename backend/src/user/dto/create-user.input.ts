import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  uid: string;
  @Field(() => String)
  name: string;
}
