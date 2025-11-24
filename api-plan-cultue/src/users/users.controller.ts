import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Utilisateur } from 'src/entities/utilisateur.entity';
import { RegisterDTO } from './dtos/register.dto';
import { LoginDTO } from './dtos/login.dto';
import { AuthChard } from './guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { JWTPayloadType } from 'src/utils/types';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  async getOneUser(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Put()
  async editUser(@Body() user: Utilisateur) {
    return await this.userService.updateUser(user);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: number) {
    return this.userService.delUser(id);
  }

  @Post('register')
  public async registerUser(@Body() registerDto: RegisterDTO) {
    return await this.userService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: LoginDTO) {
    return this.userService.login(loginDto);
  }

  @UseGuards(AuthChard)
  @Post('current')
  public getCurrentUser(@CurrentUser() payload : JWTPayloadType) {
    return this.userService.getCurrentUser(payload.id);
  }
}
