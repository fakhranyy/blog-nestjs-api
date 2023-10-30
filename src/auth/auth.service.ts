import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { bcrypt } from 'bcrypt';
import { Observable, from, of } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService){}
   
  generateJWt(user: User): Observable<string> {
    return from(this.jwtService.signAsync({user})); // generate jwt
  }

  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hashPassword(password, 12)); //  the rxjs 'form' turns an array, promise, or iterable into an observable  
    // 12 -> is a salt round actually means the cost factor
    //  the cost factor controls how mush time is needded to calculate a single bcrypt hash 
  }

  comparePasswords(newPassword: string, hashedPassword: string): Observable<any | boolean> {
    return of<any | boolean>(bcrypt.compare(newPassword, hashedPassword))
  } 
}
