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
import { Observable } from 'rxjs';

@Controller('users')
export class UserController {
  constructor(private srv: UserService){}

  @Post()
   create(@Body() user: User): Observable<User> {
    return this.srv.create(user)
  }


  @Get(':id')
   findOne(@Param() params): Observable<User> {
    return this.srv.findOne(params.id);
  }

  @Get()
 findAll() {
  return this.srv.findAll();
  }

  @Delete(':id')
   deleteOne(@Param('id')id: number): Observable<User> {
    return this.srv.deleteOne(id);
  }

  @Patch(':id')
  updatOne(@Param('id')id: number, @Body() user: User):Observable<User> {
    return this.srv.updateOne(id , user);
  }
}
