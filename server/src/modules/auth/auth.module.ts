import { Module } from '@nestjs/common';
import {AuthService} from "./auth.service";
import { AuthController } from './auth.controller';
import {UserModule} from "./user.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../../constants/jwtConstants.";
import {AuthGuard} from "./auth.guard";
import {TokenService} from "./token.service";

@Module({
  providers:[AuthService,AuthGuard,TokenService],
  controllers: [AuthController],
  imports:[
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
      }),
    }),

  ]
})
export class AuthModule {}
