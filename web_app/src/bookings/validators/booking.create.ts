import { IsDateString, IsNotEmpty, MinDate, Validate } from 'class-validator';
import { CarExistsValidator } from 'src/cars/validations/car-exists';
import { UserExistsValidator } from 'src/user/validators/id-exists';



export class BookingCreateRequest {

    @Validate(CarExistsValidator, {
        message: 'Car does not exist.',
    })
    carID: number

    
    @Validate(UserExistsValidator, {
        message: 'User does not exist.',
    })
    userID: number

    @IsNotEmpty()
    @IsDateString()
    @MinDate(new Date(Date.now())) // start can be today or later.
    startDate: Date;

    @IsNotEmpty()
    @IsDateString()
    @MinDate(new Date(Date.now() + 24 * 60 * 60 * 1000)) // end date can be tommorow or later.
    @Validate((object: BookingCreateRequest, value: any) => {
        if (value <= object.startDate) {
            return false;
        }
        return true;
    }, {
        message: 'Start date must be before end date.',
    })
    endDate: Date;
}