import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Logger } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');

  constructor(private authService: AuthService) { }

  @Post('/signup')
  public signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    this.logger.warn('User is about to sign up');
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  public signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    this.logger.warn('User is about to log in');
    return this.authService.signIn(authCredentialsDto);
  }
}
