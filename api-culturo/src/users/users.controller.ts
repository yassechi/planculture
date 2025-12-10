import { CurrentUser } from './decorators/current-user.decorator';
import { UpdateUserDTO } from './dtos/update.user.dto';
import { RegisterDTO } from './dtos/register.user.dto';
import type { JWTPayloadType } from 'src/utils/types';
import { User_ } from 'src/entities/user_.entity';
import { AuthChard } from './guards/auth.guard';
import { UsersService } from './users.service';
import { LoginDTO } from './dtos/login.dto';
import {
  Body,
  Controller,
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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger';

@ApiTags('User Group')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  /**
   *
   * @returns
   */
  @Get()
  @ApiResponse({ status: 200, description: 'Users fetched successfully' })
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  /**
   *
   * @returns
   */
  @Get('active')
  @ApiResponse({
    status: 200,
    description: 'Users Active fetched successfully',
  })
  @ApiOperation({ summary: 'Get all Active users' })
  async getActiveUsers() {
    return await this.userService.getActiveUsers();
  }

  /**
   *
   * @returns
   */
  @Get('inactive')
  @ApiResponse({
    status: 200,
    description: 'Users Inactive fetched successfully',
  })
  @ApiOperation({ summary: 'Get all Inactive users' })
  async getInactivatedUsers() {
    return await this.userService.getInactivatedUsers();
  }

  /**
   *
   * @param id
   * @returns
   */
  @Get('/:id')
  @ApiOperation({ summary: 'Get User by Id' })
  async getOneUser(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  /**
   *
   * @param updateUserDto
   * @returns
   */
  @Put()
  @ApiOperation({ summary: 'Update User' })
  async updateUser(@Body() updateUserDto: UpdateUserDTO) {
    console.log('tu es dans Update User');

    return await this.userService.updateUser(updateUserDto);
  }

  /**
   *
   * @param id
   * @param status
   * @returns
   */
  @Patch('status/:id/:status')
  @ApiOperation({ summary: 'Disactivate User' })
  async setUserStatus(
    @Param('id', ParseIntPipe) id: number,
    @Param('status') status: string,
  ) {
    return this.userService.setUserActiveStatus(id, status);
  }

  /**
   *
   * @param registerDto
   * @returns
   */
  @Post('register')
  @ApiOperation({ summary: 'Register User' })
  public async registerUser(@Body() registerDto: RegisterDTO) {
    return await this.userService.register(registerDto);
  }

  /**
   *
   * @param loginDto
   * @returns
   */
  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: LoginDTO) {
    return this.userService.login(loginDto);
  }

  /**
   *
   * @param paylod
   * @returns
   */
  @ApiSecurity('bearer')
  @Post('current')
  @UseGuards(AuthChard)
  @ApiOperation({ summary: 'Get Current User (from token)' })
  public async getCurrentUser(
    @CurrentUser() paylod: JWTPayloadType,
  ): Promise<User_> {
    return this.userService.getCurrentUser(paylod.id);
  }

  // @ApiSecurity('bearer')
  // @Post('current')
  // @UseGuards(AuthChard)
  // @ApiOperation({ summary: 'Get Current User (from token)' })
  // public async getCurrentUser(@Req() request: any): Promise<User_> {
  //   const id = request[CURRENT_USER].id;
  //   return this.userService.getCurrentUser(id);
  // }
}
