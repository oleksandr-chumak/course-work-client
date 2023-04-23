import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Token} from "./interface/token";


@Injectable()

export class TokenService{
  constructor(private jwtService:JwtService) {
  }
  async generateRefreshToken(payload:object):Promise<string>{
    return await this.jwtService.signAsync(payload,{expiresIn:"7d"})
  }
  async generateAccessToken(payload:object):Promise<string>{
    return await this.jwtService.signAsync(payload)
  }
  async checkIsTokenValid(token:string):Promise<Token>{
    return await this.jwtService.verifyAsync(token)
  }
  async refreshToken(refreshToken:string){
    try {
      const userData = await this.checkIsTokenValid(refreshToken);
      return {
        accessToken:await this.generateAccessToken({id:userData.id})
      }
    }catch{
      throw new UnauthorizedException();
    }

  }

}