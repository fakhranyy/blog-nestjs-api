import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { User } from './entities/user.entity';
import { UserModule } from './user.module';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private lazyModuleLoader: LazyModuleLoader){}

  @Post()
  async create(@Body() user: User): Promise<User> {
    const mod = await this.lazyModuleLoader.load(() => UserModule);
    const serv = mod.get(UserService);
    return await serv.create(user);
  }


  @Get(':id')
  async findOne(@Param() params): Promise<User> {
    const mod = await this.lazyModuleLoader.load(()=> UserModule)
    const serv = mod.get(UserService);
    return await serv.findOne(params.id)
  }

  @Get()
  async findAll() {
    const mod = await this.lazyModuleLoader.load(() => UserModule);
    const serv = mod.get(UserService);
    return await serv.findAll();
  }

  @Delete(':id')
  async deleteOne(@Param('id')id: number): Promise<User> {
    const mod = await this.lazyModuleLoader.load(()=> UserModule);
    const serv = mod.get(UserService);
    return await serv.deleteOne(id)
  }

  @Patch(':id')
 async updatOne(@Param('id')id: number, @Body() user: User):Promise<User> {
   const mod = await this.lazyModuleLoader.load(()=> UserModule);
   const serv = mod.get(UserService);
  return await serv.updateOne(id, user)
  }
}
