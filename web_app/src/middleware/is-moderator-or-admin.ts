import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, } from 'express';
import { ISessionAttributes } from 'src/session/ISessionAttributes';

@Injectable()
export class isAdminMiddleware implements NestMiddleware {
    

  use(req: Request, res: Response, next: () => void) {
    const sessionData = req.session as ISessionAttributes;

    if (!(sessionData.userIsAdmin || sessionData.userIsModerator)) {
        throw new HttpException(
            {
              status: HttpStatus.UNAUTHORIZED,
              errors: {
                message: 'You need to be moderator or admin to perform this action.',
              },
            },
            HttpStatus.UNAUTHORIZED,
          );
    }
    next();
  }
}

