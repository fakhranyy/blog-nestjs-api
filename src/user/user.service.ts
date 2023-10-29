import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>){}

  async create(user: User): Promise<User> {
    return this.repo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findOne(id: number):Promise<User> {
    return this.repo.findOneBy({id})
  }

  async deleteOne(id: number): Promise<any> {
    return this.repo.delete(id);
  }

  async updateOne(id: number, user: User): Promise<any> {
    return this.repo.update(id, user);
  }
}
