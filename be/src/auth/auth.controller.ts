import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO) {
    const user = await this.service.findByLogin(loginDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.service.signPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() userDTO) {
    return await this.service.register(userDTO);
  }
}
