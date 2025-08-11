import { Injectable, signal } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _isLoggedIn = signal<boolean>(false);
    private _currentUser = signal<User | null>(null);
    private _users: User[] = [
        {
            _id: '1',
            email: 'test@test.com',
            password: '123456',
            name: 'Test',
            role: 'user'
        },
        {
            _id: '2',
            email: 'admin@admin.com',
            password: '123456',
            name: 'Admin',
            role: 'admin'
        }
    ];


    login(email: string, password: string): void {
        this._isLoggedIn.set(true);
    }

    register(email: string, password: string): void {
        this._isLoggedIn.set(true);
    }

    logout(): void {
        this._isLoggedIn.set(false);
    }

}