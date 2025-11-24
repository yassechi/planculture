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
import { RegisterDTO } from './dtos/register.user.dto';
import { LoginDTO } from './dtos/login.dto';
import { AuthChard } from './guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { JWTPayloadType } from 'src/utils/types';
import {
  ApiQuery,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { UpdateUserDTO } from './dtos/update.user.dto';

@ApiTags('User Group')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Users fetched successfully' })
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get User by Id' })
  async getOneUser(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Put()
  @ApiOperation({ summary: 'Update User' })
  async updateUser(@Body() updateUserDto: UpdateUserDTO) {
    return await this.userService.updateUser(updateUserDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete User' })
  async removeUser(@Param('id') id: number) {
    return this.userService.delUser(id);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register User' })
  public async registerUser(@Body() registerDto: RegisterDTO) {
    return await this.userService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: LoginDTO) {
    return this.userService.login(loginDto);
  }

  @UseGuards(AuthChard)
  @Post('current')
  @ApiSecurity('bearer')
  @ApiOperation({ summary: 'Get User By Token' })
  public getCurrentUser(@CurrentUser() payload: JWTPayloadType) {
    return this.userService.getCurrentUser(payload.id);
  }
}
