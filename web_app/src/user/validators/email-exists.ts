import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service'; // Replace with the actual service for user management

@Injectable()
@ValidatorConstraint({ name: 'emailExists', async: true })
export class EmailExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(email: string, _args: ValidationArguments) {
    const user = await this.userService.findByEmail(email);
    
    return !user;
  }
}