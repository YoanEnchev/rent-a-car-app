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
    @MinDate(new Date(Date.now() + 24 * 60 * 60 * 1000)) // Min date is tomorrow
    startDate: Date;

    @IsNotEmpty()
    @IsDateString()
    endDate: Date;
}