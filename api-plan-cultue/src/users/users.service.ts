import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Utilisateur } from 'src/entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { RegisterDTO } from './dtos/register.dto';
import bcrypt from 'node_modules/bcryptjs';
import { LoginDTO } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenType, JWTPayloadType } from 'src/utils/types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly userRepository: Repository<Utilisateur>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  // Récupérer tous les utilisateurs
  async getAllUsers(): Promise<Utilisateur[]> {
    return await this.userRepository.find();
  }

  // Récupérer un utilisateur par id
  async getUserById(id: number): Promise<Utilisateur | null> {
    return this.userRepository.findOneBy({ id_utilisateur: id });
  }

  // Supprimer un utilisateur
  async delUser(id: number): Promise<{ msg: string }> {
    await this.userRepository.delete({ id_utilisateur: id });
    return { msg: 'Utilisateur supprimé avec succès' };
  }

  // Mettre à jour un utilisateur
  async updateUser(
    user: Utilisateur,
  ): Promise<{ status: number; msg: string }> {
    console.log(user);
    try {
      await this.userRepository.update(user.id_utilisateur, user);
      await this.userRepository.save(user);
      return { status: 200, msg: 'Update OK' };
    } catch (error) {
      return { status: 500, msg: 'Update n’a pas marché' };
    }
  }
  /**
   * Methode of create user
   * @param registerDto data for creating user
   * @returns JWT (acces token)
   */
  public async register(registerDto: RegisterDTO) {
    const { email, hpassword, id_role } = registerDto;
    const userFromDb = await this.userRepository.findOne({
      where: { email },
    });
    if (userFromDb) throw new BadRequestException('User already exists');
    const hashedPassword = await bcrypt.hash(hpassword, 10);
    const roleFromDb = await this.roleRepository.findOne({
      where: { id_role },
    });
    if (!roleFromDb) throw new BadRequestException('Role not found');
    const newUser = this.userRepository.create({
      ...registerDto,
      hpassword: hashedPassword,
      role: roleFromDb,
    });
    const savedUser = await this.userRepository.save(newUser);

    const payload: JWTPayloadType = {
      id: savedUser.id_utilisateur,
      email: savedUser.email,
      id_role: savedUser.role.id_role,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return { id: savedUser.id_utilisateur ,accessToken };
  }

  /**
   * Login In user
   * @param loginDTo data for log in to user account
   * @returns JWT (acces token)
   */
  public async login(loginDTo: LoginDTO) {
    const { email, hpassword } = loginDTo;
    const userFromDb = await this.userRepository.findOne({ where: { email } });
    if (!userFromDb) throw new BadRequestException('unregistered user');
    const isPassMatch = await bcrypt.compare(hpassword, userFromDb.hpassword);
    if (!isPassMatch) throw new BadRequestException('invalid password');

    const payload: JWTPayloadType = {
      id: userFromDb.id_utilisateur,
      email: userFromDb.email,
      id_role: userFromDb.id_role,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { id: userFromDb.id_utilisateur , accessToken };
  }

  /**
   * Get Current user connected (Logged)
   * @param id  Id of the user logged
   * @returns the user from the database
   */
  public async getCurrentUser(id : number) {
    const userFromDb = await this.userRepository.findOne({
      where: { id_utilisateur: id },
    });
    if (!userFromDb) throw new NotFoundException('User Not Found !');
    return userFromDb;
  }
}

