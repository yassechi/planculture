import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Res() res, @Body() authDTO) {
    try {
      const response = await this.authService.authentification(authDTO);
      return res.status(200).json(response);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}
