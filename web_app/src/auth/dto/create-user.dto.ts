import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Validate,
} from 'class-validator';
import { EmailExistsValidator } from '../../user/validators/email-does-not-exist';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com' })
  @IsNotEmpty()
  @Validate(EmailExistsValidator, {
    message: 'Email already exists.',
  })
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string | null;
}