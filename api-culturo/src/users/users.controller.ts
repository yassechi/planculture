import {
  BadRequestException,
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
  Headers,
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
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UpdateUserDTO } from './dtos/update.user.dto';
import { TLSSocket } from 'tls';

@ApiTags('User Group')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Users fetched successfully' })
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers() {
    // console.log("tu es dans Get All Users");
    return await this.userService.getAllUsers();
  }

  @Get('active')
  @ApiResponse({
    status: 200,
    description: 'Users Active fetched successfully',
  })
  @ApiOperation({ summary: 'Get all Active users' })
  async getActiveUsers() {
    return await this.userService.getActiveUsers();
  }

  @Get('inactive')
  @ApiResponse({
    status: 200,
    description: 'Users Inactive fetched successfully',
  })
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
    console.log('tu es dans Update User');

    return await this.userService.updateUser(updateUserDto);
  }

  @Patch('status/:id/:status')
  @ApiOperation({ summary: 'Disactivate User' })
  async setUserStatus(
    @Param('id', ParseIntPipe) id: number,
    @Param('status') status: string,
  ) {
    return this.userService.setUserActiveStatus(id, status);
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
  // @ApiSecurity('bearer')
 @Post('current')
  @ApiOperation({ summary: 'Get Current User (from token)' })
  @ApiBearerAuth() // ⚡ pour Swagger
  public async getCurrentUser(@Headers('authorization') authHeader: string) {
    if (!authHeader)
      throw new BadRequestException('Authorization header missing');

    const token = authHeader.split(' ')[1]; // récupère juste le JWT
    return await this.userService.getUserByToken(token);
  }
}
