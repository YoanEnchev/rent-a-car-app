import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, } from 'express';
import { ISessionAttributes } from 'src/session/ISessionAttributes';

@Injectable()
export class HandlebarsMiddleware implements NestMiddleware {
    

  use(req: Request, res: Response, next: () => void) {

    const sessionData = req.session as ISessionAttributes;

    res.locals.isLoggedIn = !!sessionData.user
    res.locals.isAdmin = sessionData.userIsAdmin
    res.locals.userIsModerator = sessionData.userIsModerator
    
    next();
  }
}

