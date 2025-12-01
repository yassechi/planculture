import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
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

    @Get('active')
  @ApiResponse({ status: 200, description: 'Users Active fetched successfully' })
  @ApiOperation({ summary: 'Get all Active users' })
  async getActiveUsers() {
    return await this.userService.getActiveUsers();
  }

      @Get('inactive')
  @ApiResponse({ status: 200, description: 'Users Inactive fetched successfully' })
  @ApiOperation({ summary: 'Get all Inactive users' })
  async getInactivatedUsers() {
    return await this.userService.getInactivatedUsers();
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

  @Patch(':id/status')
  @ApiOperation({ summary: 'Disactivate User' })
  async setUserStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('active') active: boolean,
  ) {
    return this.userService.setUserActiveStatus(id, active);
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

  // @UseGuards(AuthChard)
  @Post('current')////////
  @ApiSecurity('bearer')
  @ApiOperation({ summary: 'Get User By Token' })
  public getCurrentUser(@CurrentUser() payload: JWTPayloadType) {
    return this.userService.getCurrentUser(payload.id);
  }
}
