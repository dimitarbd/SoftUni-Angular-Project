import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _isLoggedIn = signal<boolean>(false);
    private _currentUser = signal<User | null>(null);
    private apiUrl = 'http://localhost:3030/users';

    public isLoggedInSignal = this._isLoggedIn.asReadonly();
    public currentUser = this._currentUser.asReadonly();

    constructor(private httpClient: HttpClient) {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            this._currentUser.set(user);
            this._isLoggedIn.set(true);
        } 
    }


    isLoggedIn(): boolean {
        return this._currentUser() != null;
    }

    login(email: string, password: string): Observable<User> {
        return this.httpClient.post<User>(`${this.apiUrl}/login`, { email, password });
    }

    loginSuccess(user: User): void {
        this._currentUser.set(user);
        this._isLoggedIn.set(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('accessToken', user.accessToken || '');
    }

    register(firstName: string, lastName: string, email: string, password: string): Observable<User> {
        return this.httpClient.post<User>(`${this.apiUrl}/register`, { firstName, lastName, email, password });
    }

    registerSuccess(user: User): void {
        this._currentUser.set(user);
        this._isLoggedIn.set(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('accessToken', user.accessToken || '');
    }

    logout(): void {
        this._currentUser.set(null);
        this._isLoggedIn.set(false);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');
    }

    getAccessToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    getCurrentUserId(): string | null {
        return this._currentUser()?._id || null;
    }

    updateAccount(userId: string, updateData: any): Observable<User> {
        const token = this.getAccessToken();
        const headers: any = {};
        
        if (token) {
            headers['X-Authorization'] = token;
        }
        
        console.log('UPDATE: Using users/update endpoint');
        return this.httpClient.post<User>(`${this.apiUrl}/update`, updateData, { headers });
    }

    updateAccountSuccess(updatedUser: User): void {
        const currentUser = this._currentUser();
        if (currentUser && updatedUser) {
            const mergedUser: User = {
                ...currentUser,
                ...updatedUser,
                accessToken: updatedUser.accessToken || currentUser.accessToken
            };
            this._currentUser.set(mergedUser);
            localStorage.setItem('currentUser', JSON.stringify(mergedUser));
        } else if (updatedUser) {
            this._currentUser.set(updatedUser);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }
    }

}