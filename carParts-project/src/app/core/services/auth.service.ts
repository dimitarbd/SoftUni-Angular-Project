import { computed, Injectable, signal } from '@angular/core';
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
        },
        {
            _id: '2',
            email: 'admin@admin.com',
            password: '123456',
        }
    ];

    public isLoggedInSignal = this._isLoggedIn.asReadonly();
    public currentUser = this._currentUser.asReadonly();

    constructor() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            this._currentUser.set(user);
            this._isLoggedIn.set(true);
        } 
    }


    /** Compatibility helper for guards/components expecting a boolean method */
    isLoggedIn(): boolean {
        return this._isLoggedIn();
    }

    login(email: string, password: string): boolean {
        const user = this._users.find(user => user.email === email && user.password === password);
        if (user) {
            this._currentUser.set(user);
            this._isLoggedIn.set(true);

            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        }
        return false;
    }

    register(email: string, password: string, rePassword: string): boolean {
        if (email && password && rePassword && password === rePassword) {
            const newUser: User = {
                _id: 'user_${Date.now()}',
                email: email,
                password: password,
            };

            this._users.push(newUser);
            this._currentUser.set(newUser);
            this._isLoggedIn.set(true);

            localStorage.setItem('currentUser', JSON.stringify(newUser));

            return true;
        }
        return false;
    }

    logout(): void {
        this._currentUser.set(null);
        this._isLoggedIn.set(false);
        localStorage.removeItem('currentUser');
    }

    getCurrentUserId(): string | null {
        return this._currentUser()?._id || null;
    }

}