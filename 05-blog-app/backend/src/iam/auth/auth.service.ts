import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import jwtConfig from '../config/jwt.config';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { HashingService } from '../hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private userService: UsersService,
  ) {}

  /**
   * Sign Up a new user
   * @param signUpDto
   */
  async signUp(signUpDto: SignUpDto) {
    const { username, email, password } = signUpDto;

    // Check if the user does not exist in database
    const users = await this.userService.findUserByEmail(email);
    if (users.length > 0) throw new BadRequestException('User already exists');

    // Hash the password before saving the user to the database
    const userHashedPassword = await this.hashingService.hash(password);

    // Return the already stored user
    return this.userService.createUser(username, email, userHashedPassword);
  }

  /**
   * Sign in a new user
   * @param signInDto
   */
  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const [user] = await this.userService.findUserByEmail(email);

    if (!user) throw new UnauthorizedException('Sorry, user does not exist');

    const passwordIsValid = await this.hashingService.compare(
      password,
      user.password,
    );

    if (!passwordIsValid) throw new UnauthorizedException('Invalid password');

    const access_token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        username: user.username,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenLifeTime,
      },
    );

    return { access_token };
  }
}
