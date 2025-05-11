import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PasswordService } from 'src/utils/password.utils';


@Injectable()
export class UserService {


  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, 
    private readonly passwordService: PasswordService
  ) {}


  async create(user: CreateUserDto) {
    const hashedPassword = await this.passwordService.hashPassword(user.password);
    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword, //Contraseña hasheada
    });
    return await this.userRepository.save(newUser);
    
  }

  getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id});
    if(!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if(user == null) throw new Error(`User with email ${email} not found`);
    return user;
  }

  /*
  Recuerden que este metodo esta implementado como un patch, 
  por lo que NO es necesario enviar todos los campos del usuario, 
  solo los que se desean actualizar
  */
  async update(id: string, updateUser: UpdateUserDto): Promise<User> {

    const user = await this.userRepository.findOneBy({ id });

    if(!user){
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if(updateUser.password){
      updateUser.password = await this.passwordService.hashPassword(updateUser.password);
    }
    await this.userRepository.update(id, updateUser);
    const updatedUser = await this.userRepository.findOneBy({ id });

    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found after update`);
    }

    return updatedUser;
  }

  delete(id: string): Promise<User> {
    const deleteUser = this.findById(id);
    this.userRepository.delete(id);
    if(deleteUser == null) throw new Error(`User with id ${id} not found`); 
    return deleteUser;
  }
}
