import { Max, Min, Validate } from 'class-validator';
import { ModelExistsValidator } from './model-exists';

const minYear: number = 1990

// Used for both create and edit request.
export class CarActionRequest {

    @Max(new Date().getFullYear() , {
      message: 'Year max value cannot be higher than the current year.',
    })
    @Min(minYear , {
      message: `Year value cannot be lower than ${minYear}.`,
    })
    year: number;


    @Validate(ModelExistsValidator, {
      message: 'Model does not exist.',
    })
    modelID: number;
}