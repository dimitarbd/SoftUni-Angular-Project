import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Part } from "../../models";
import { Observable, map } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class PartService {
    private apiUrl = 'http://localhost:3030/data/parts';

    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    private getHeaders(): HttpHeaders {
        const token = this.authService.getAccessToken();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            ...(token && { 'X-Authorization': token })
        });
    }

    getParts(): Observable<Part[]> {
        return this.httpClient.get<any>(this.apiUrl).pipe(
            map(response => {
                // Handle both array and object responses
                if (Array.isArray(response)) {
                    return response;
                }
                // If it's an object, convert to array
                return Object.values(response);
            })
        );
    }

    getOne(partId: string): Observable<Part> {
        return this.httpClient.get<Part>(`${this.apiUrl}/${partId}`);
    }

    createPart(payload: Partial<Part>): Observable<Part> {
        return this.httpClient.post<Part>(this.apiUrl, payload, { headers: this.getHeaders() });
    }

    updatePart(partId: string, payload: Partial<Part>): Observable<Part> {
        return this.httpClient.put<Part>(`${this.apiUrl}/${partId}`, payload, { headers: this.getHeaders() });
    }

    deletePart(partId: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.apiUrl}/${partId}`, { headers: this.getHeaders() });
    }

    getRecentParts(limit: number = 10): Observable<Part[]> {
        return this.httpClient.get<any>(this.apiUrl).pipe(
            map(response => {
                // Handle both array and object responses
                let parts: Part[];
                if (Array.isArray(response)) {
                    parts = response;
                } else {
                    // If it's an object, convert to array
                    parts = Object.values(response);
                }
                
                return parts
                    .sort((a, b) => {
                        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : a._createdOn ?? 0;
                        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : b._createdOn ?? 0;
                        return bTime - aTime;
                    })
                    .slice(0, limit);
            })
        );
    }

    getByOwner(userId: string): Observable<Part[]> {
        const whereClause = `_ownerId="${userId}"`;
        const encodedWhere = encodeURIComponent(whereClause);
        return this.httpClient.get<any>(`${this.apiUrl}?where=${encodedWhere}`).pipe(
            map(response => Array.isArray(response) ? response : Object.values(response))
        );
    }

}
