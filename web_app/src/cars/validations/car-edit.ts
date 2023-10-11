import { Validate } from 'class-validator';
import { CarActionRequest } from './car-action';
import { CarExistsValidator } from './car-exists';

// Used for both create and edit request.
export class CarEditRequest extends CarActionRequest {
    @Validate(CarExistsValidator, {
        message: 'Car does not exist.',
    })
    id: number;
}