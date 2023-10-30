import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>){}

   create(user: User): Observable<User> {
    return from(this.repo.save(user));
  }

   findAll(): Observable<User[]> {
    return from(this.repo.find());
  }

   findOne(id: number):Observable<User> {
    return from(this.repo.findOneBy({id}))
  }

   deleteOne(id: number): Observable<any> {
    return from(this.repo.delete(id));
  }

   updateOne(id: number, user: User): Observable<any> {
    return from(this.repo.update(id, user));
  }
}
