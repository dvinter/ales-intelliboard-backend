import { IAuthRepository } from '../../repository/IAuthRepository';
import passwordJWT from 'passport-jwt';
import { PassportStatic } from 'passport';
import { Strategy } from 'passport-local';
import { IEncrypter } from '../../interfaces/IEncrypter';
const JwtStrategy = passwordJWT.Strategy;
const ExtractJwt = passwordJWT.ExtractJwt;
export class JWTMiddleware {
  private loginFields = { usernameField: 'email', passwordField: 'password' };
  private jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY,
  };
  constructor(
    private userRepository: IAuthRepository,
    private encrypter: IEncrypter
  ) {}
  set(passport: PassportStatic): void {
    passport.use(
      new Strategy(this.loginFields, async (email, password, done) => {
        try {
          const user = await this.userRepository.findById(email);
          if (!user) {
            return done(null, false, { message: 'User not found.' });
          }
          const match = await this.encrypter.compare(password, user.password);
          if (match) {
            return done(null, user);
          } else {
            return done(match, false, { message: 'Invalid credentials.' });
          }
        } catch (error) {
          return done(error, false, { message: 'error when try to find user' });
        }
      })
    );
    passport.use(
      new JwtStrategy(this.jwtOpts, async (jwtPayload, done) => {
        try {
          const user = await this.userRepository.findById(jwtPayload.email);
          if (user) return done(null, user);
          else return done(null, false);
        } catch (error) {
          return done(error, false);
        }
      })
    );
    passport.serializeUser((user: Pick<never, '_id'>, done) => {
      done(null, user._id);
    });
    passport.deserializeUser(async (id: string, done) => {
      try {
        const User = await this.userRepository.findById(id);
        return done(null, User);
      } catch (error) {
        return done(error, null);
      }
    });
  }
}
