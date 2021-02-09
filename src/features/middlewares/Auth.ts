import { authMiddleware } from '@/auth/package/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextConnect } from 'next-connect';
import passport from 'passport';

export class Auth {
  WithAuth(
    handler: NextConnect<NextApiRequest, NextApiResponse>,
    login?: boolean
  ): any {
    const method = login ? 'local' : 'jwt';
    authMiddleware.set(passport);
    handler.use(passport.initialize());
    handler.use(passport.session());
    return passport.authenticate(method, { session: true });
  }
}
