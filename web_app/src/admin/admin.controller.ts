import { Controller, Get, Param, Post, Redirect, Render } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { BookingService } from 'src/bookings/booking.service';

@Controller()
export class AdminController {
  constructor(
    private readonly userService: UserService,
    private readonly bookingService: BookingService
      ) {}

  @Get('/admin/users')
  @Render('admin/users-index')
  async listUsers() {
    const users: User[] = await this.userService.find()

    return { users }
  }

  @Post('/admin/delete-user/:userID')
  @Redirect('/admin/users')
  async deleteUser(@Param('userID') userID: number) {

    await this.userService.delete(userID)

    return {}
  }


  @Post('/admin/delete-booking/:bookingID')
  @Redirect('/admin/users')
  async deleteBooking(@Param('bookingID') bookingID: number) {

    await this.bookingService.delete(bookingID)

    return {}
  }
}
