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


    /** Compatibility helper for guards/components expecting a boolean method */
    isLoggedIn(): boolean {
        // Use current user presence to avoid calling a potentially shadowed signal function
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

    register(email: string, password: string): Observable<User> {
        return this.httpClient.post<User>(`${this.apiUrl}/register`, { email, password });
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

}