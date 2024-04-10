import { BadGatewayException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register-auth.dto';
import * as bcryptjs from "bcryptjs";
import { LoginDto } from './dto/login-auth.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService) { }

  async registerUser({ password, username, email, lastname, name }: RegisterDto) {
    const user = await this.userService.getUserByEmail(email);
    if (user) throw new BadGatewayException("Ya existe un usuario registrado con el email:" + email);

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await this.userService.createUser({
      name,
      lastname,
      email,
      username,
      password: hashedPassword
    });

    return newUser;
  }

  async login({ email, password }: LoginDto): Promise<any> {
    const user = await this.userService.getUserByEmail(email)
    if (!user) throw new UnauthorizedException("Email invalido");

    const isPasswordValid = await bcryptjs.compare(password, user.getPassword());
    if (!isPasswordValid) throw new UnauthorizedException("Password invalido")

    const payload = { sub: user.getIdUser(), email: user.getEmail() };
    const accesToken = await this.jwtService.signAsync(payload);

    return {
      token: accesToken,
    };
  }



}
