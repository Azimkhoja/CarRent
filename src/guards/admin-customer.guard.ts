import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AdminCustomerGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req: Request = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      if (!authHeader)
        throw new UnauthorizedException({ message: "Unauthorized action" });
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];
      // let param = req.params.id;

      console.log(token);
      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({
          message: "Unauthorized action",
        });
      }
      const customer = this.jwtService.verify(token, {
        publicKey: process.env.ACCESS_TOKEN_KEY || "MyAccessKey",
      });
      console.log(customer.grade);

      if (["admin", "customer"].includes(customer.grade)) {
        if (customer.is_actice) {
          return true;
        }
        throw new UnauthorizedException({
          message: "You have not a permission",
        });
      }
      throw new UnauthorizedException({ message: "Access denied" });
    } catch (error) {
      console.log(error.message);
      throw new HttpException("Unauthorized action", HttpStatus.FORBIDDEN);
    }
  }
}
