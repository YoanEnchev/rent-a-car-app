import { SessionData } from 'express-session';
import { User } from 'src/user/user.entity';

// Extend the SessionData interface
interface ISessionAttributes extends SessionData {
  errorMessage?: string
  user?: User // holds only the attributes. Seems that we can't call it's methods.
  userIsAdmin?: boolean
  userIsModerator?: boolean
}

export { ISessionAttributes };