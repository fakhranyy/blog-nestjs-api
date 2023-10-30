import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { bcrypt } from 'bcrypt';
import { Observable, from, of } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService){}
   
  generateJWt(user: User): Observable<string> {
    return from(this.jwtService.signAsync({user}));
  }

  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hashPassword(password, 12));
  }

  comparePasswords(newPassword: string, hashedPassword: string): Observable<any> {
    return of<any | boolean >(bcrypt.compare(newPassword, hashedPassword))
  }
}
