import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginDto} from "./dto/login.dto";
import {RegistrationDto} from "./dto/registration.dto";
import {UserService} from "./user.service";
import * as bcrypt from "bcrypt"
import {JwtService} from "@nestjs/jwt";
import {TokenService} from "./token.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService:UserService,
    private readonly jwtService:JwtService,
    private readonly tokenService:TokenService
  ) {
  }
  async login(data:LoginDto){
    const user = await this.userService.getByEmail(data.email);
    if (!user){
      throw new UnauthorizedException("Невірний емейл або пароль");
    }
    if(!await this.compare(data.password,user.password)){
      throw new UnauthorizedException("Невірний емейл або пароль");
    }
    const [accessToken,refreshToken] = await Promise.all([
       this.tokenService.generateAccessToken({id:user._id}),
       this.tokenService.generateRefreshToken({id:user._id})
    ])
    return {
      accessToken,
      refreshToken
    }
  }
  async registration(data:RegistrationDto){
    const user = await this.userService.getByEmail(data.email);
    if (user){
      throw new UnauthorizedException("Користувач с таким емейлом вже зарегестрований");
    }
    const hashedPassword = await this.hash(data.password);
    return this.userService.create({...data,password:hashedPassword});
  }

  async hash(password){
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(password,salt)
  }
  async compare(originalPassword:string,hashedPassword:string){
    return bcrypt.compare(originalPassword,hashedPassword)
  }
}
