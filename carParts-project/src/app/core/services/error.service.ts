import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private _error = signal<string | null>(null);

    public error = this._error.asReadonly();

    /**
     * Extracts a human-friendly error message from various backend error shapes.
     */
    extractMessage(error: unknown): string {
        // String errors
        if (typeof error === 'string') {
            return error;
        }

        // HttpErrorResponse or similar structure
        const anyError: any = error as any;

        // Network errors (status 0)
        if (anyError && typeof anyError.status === 'number' && anyError.status === 0) {
            return 'Network error. Please check your internet connection and try again.';
        }

        const body = anyError?.error;

        // Text response bodies
        if (typeof body === 'string' && body.trim().length > 0) {
            return body.trim();
        }

        // Common fields: message / error
        if (body?.message && typeof body.message === 'string') {
            return body.message;
        }
        if (body?.error && typeof body.error === 'string') {
            return body.error;
        }

        // Validation errors can come as arrays or keyed objects
        const errors = body?.errors;
        if (Array.isArray(errors)) {
            const parts = errors
                .map((e: any) => (typeof e === 'string' ? e : e?.message))
                .filter((x: any) => typeof x === 'string' && x.trim().length > 0);
            if (parts.length > 0) {
                return parts.join('; ');
            }
        } else if (errors && typeof errors === 'object') {
            const parts: string[] = [];
            for (const key of Object.keys(errors)) {
                const val = (errors as any)[key];
                if (Array.isArray(val)) {
                    for (const v of val) {
                        if (typeof v === 'string' && v.trim().length > 0) parts.push(v);
                        else if (v?.message && typeof v.message === 'string') parts.push(v.message);
                    }
                } else if (typeof val === 'string') {
                    parts.push(val);
                } else if (val?.message && typeof val.message === 'string') {
                    parts.push(val.message);
                }
            }
            if (parts.length > 0) {
                return parts.join('; ');
            }
        }

        // Fallbacks
        if (anyError?.message && typeof anyError.message === 'string') {
            return anyError.message;
        }
        if (typeof anyError?.status === 'number') {
            const statusText = anyError?.statusText || 'Error';
            return `Request failed (${anyError.status} ${statusText}).`;
        }

        return 'An unexpected error occurred.';
    }

    setError(message: string): void {
        this._error.set(message);
        setTimeout(() => this._error.set(null), 3000);
    }

    clearError(): void {
        this._error.set(null);
    }
}