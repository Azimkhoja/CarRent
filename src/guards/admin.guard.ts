import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      if (!authHeader)
        throw new UnauthorizedException({ message: "Unauthorized" });
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({
          message: "The admin is not authorized1",
        });
      }

      const admin = this.jwtService.verify(token, {
        publicKey: process.env.ACCESS_TOKEN_KEY || "MyAccessKey",
      });

      if (admin.is_creator) {
        return true;
      }
      if (
        admin.is_active &&
        admin.id == req.params.id &&
        admin.grade == "admin"
      ) {
        return true;
      }
      if (!admin.is_active) {
        throw new UnauthorizedException({
          message: "You are not allowed",
        });
      }
      // console.log(admin)
      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        "The admin is not authorized",
        HttpStatus.FORBIDDEN
      );
    }
  }
}
