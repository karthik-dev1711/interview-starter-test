import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@app/_state/users/users-store';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class UserServiceService {

    constructor(private http: HttpClient) { }

    getUsersList(): Observable<User[]> {
      return this.http.get<User[]>('https://dummyjson.com/users').pipe(map((state: any) => state.users));
    }
}