import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';


@ValidatorConstraint({ name: 'userWithIDExists', async: true })
@Injectable()
export class UserExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(userID: number, _args: ValidationArguments) {

    const user = await this.userService.userExists(userID);
    
    return !!user;
  }
}