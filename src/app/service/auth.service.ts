import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private UserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.UserSubject.asObservable();
  http = inject(HttpClient);
  router = inject(Router);
  authApi = 'https://679b8dc433d31684632448c9.mockapi.io/users';
  isAuthenticated(): boolean {
    return this.UserSubject.value !== null;
  }

  isAdmin(): boolean {
    if(this.UserSubject != null && this.UserSubject != undefined && this.UserSubject.value != null){
      return this.UserSubject.value[0]?.role === 'admin';
    }
    return false;
  }

  login(username: string, password: string): boolean {
       
    const user = this.http.get<User>(this.authApi + "?username=" + username + "&password=" + password)
    .subscribe({
      next : (data) => {
        this.UserSubject.next(data);
        return true;
      },
      error : (data) => {
        alert("Credenciales incorrectas.")
        return false;
      }
    });
    return this.UserSubject != null && this.UserSubject != undefined;
  }

  redirectToRoleBasedPage(): void {
    const currentUser = this.UserSubject;
    if (currentUser != null && currentUser != undefined) {
        this.router.navigate(['game']);
    }
  }

  getUser(){
    if(this.UserSubject != null && this.UserSubject != undefined){
      return this.UserSubject.value[0];
    }
    return null;
  };

  getUserName() : string{
    if(this.UserSubject != null && this.UserSubject != undefined){
      return this.UserSubject.value[0].name;
    }
    return null;
  };
  logout(): void {
    this.UserSubject.next(null);
    this.router.navigate(['login']);
  }
}
