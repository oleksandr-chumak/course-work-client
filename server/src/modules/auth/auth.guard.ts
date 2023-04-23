import {CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "../../constants/jwtConstants.";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private readonly jwtService:JwtService) {
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException("token not found");
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });
      request.user = payload
    } catch {
      throw new ForbiddenException("token expired");
    }
    return true;
  }
  private extractTokenFromHeader(request:Request):string | undefined{
    if (!request.headers["authorization"]){
      return undefined;
    }
  const [type, token] = request.headers["authorization"].split(' ') ?? [];
  return type === "Bearer" ? token : undefined;
}

}
