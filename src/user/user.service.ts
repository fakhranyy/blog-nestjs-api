import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>,
  private authSrv : AuthService
  ){}

   create(user: User): Observable<User> {
    return from(this.repo.save(user)); 
    // return this.authSrv.hashPassword(user.password).pipe(
    //   switchMap((hashedPassword: string) => {
    //     const newUser = new User();
    //     newUser.name = user.name;
    //     newUser.username = user.username;
    //     newUser.email = user.email;
    //     newUser.password = user.password;

    //     return from(this.repo.save(newUser)).pipe(
    //       map((user: User) => {
    //         const { password, ...result} = user;
    //         return result;
    //       }),
    //       catchError(err => throwError(err));
    //     )
    //   })
    // ) 
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
