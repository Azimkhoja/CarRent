import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  // ===================================== getTokens ====================================

  async getTokens(userId: number, is_creator: boolean, salt: string, grade: string) {
    const jwtPayload: JwtPayload = {
      id: userId,
      is_creator,
      email: salt,
      grade,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),

      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // ===================================== updateRefreshToken ====================================

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
    anyRepository: any
  ) {
    const hashedRefreshtoken = await bcrypt.hash(refreshToken, 7);

    return await anyRepository.update(
      { refresh_token: hashedRefreshtoken },
      { where: { id: +userId }, returning: true }
    );
  }
}
