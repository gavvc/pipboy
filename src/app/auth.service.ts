import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { BehaviorSubject, catchError, from, Observable, tap, mapTo, switchMap, map } from 'rxjs';
import { User } from './user/user.model';

@Injectable({
  providedIn: 'root'
})



export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private auth: Auth) {}

  login(email: string, password: string): Observable<void> {
    return from(signInWithEmailAndPassword(this.auth, email, password))
      .pipe(
        tap(userCredential => {
          if (userCredential.user.email) {
            const user: User = {
              email: userCredential.user.email,
              username: userCredential.user.displayName || '',
              uid: userCredential.user.uid,
            };
            this.userSubject.next(user);
          }
        }),
        mapTo(undefined),
        catchError(error => {
          // Handle errors here, e.g., display error messages
          console.error('Login error:', error);
          throw error;
        })
      );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth))
      .pipe(
        tap(() => {
          this.userSubject.next(null);
        }),
        catchError(error => {
          // Handle errors here, e.g., display error messages
          console.error('Logout error:', error);
          throw error;
        })
      );
  }

register(email: string, password: string, username: string): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        switchMap(userCredential => {
          return from(updateProfile(userCredential.user, { displayName: username }))
            .pipe(
              map(() => ({
                email: userCredential.user.email ?? '',
                username: username,
                uid: userCredential.user.uid
              }))
            );
        }),
        catchError(error => {
          // Handle error
          throw error;
        })
      );
  }
}
