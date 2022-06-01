import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signPayload(payload) {
    return sign(payload, 'booking', { expiresIn: '7d' });
  }

  async register(payload) {
    return await this.usersService.create(payload)
  }

  async findByLogin(UserDTO) {
    const { username, password } = UserDTO;
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  sanitizeUser(user) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async validatePayload(payload) {
    const { username } = payload;
    return await this.usersService.findOne(username);
  }
}
