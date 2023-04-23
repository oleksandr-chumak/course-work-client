import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RegistrationDto} from "./dto/registration.dto";
import {LoginDto} from "./dto/login.dto";
import {CurrentUser} from "./user.decorator";
import {UserService} from "./user.service";
import {AuthGuard} from "./auth.guard";
import {TokenService} from "./token.service";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService:AuthService,
    private readonly userService:UserService,
    private readonly tokenService:TokenService
  ) {
  }
  @Post("/login")
  async login(@Body() loginData:LoginDto){
    return await this.authService.login(loginData)
  }
  @Post("/registration")
  async registration(@Body() registrationData:RegistrationDto){
    return  await this.authService.registration(registrationData)
  }
  @Get('/me')
  @UseGuards(AuthGuard)
  async getMe(@CurrentUser() user){
    return this.userService.getById(user.id);
  }
  @Get("/refreshToken/:token")
  async refreshToken(@Param("token") token:string){
    return this.tokenService.refreshToken(token)
  }

}
