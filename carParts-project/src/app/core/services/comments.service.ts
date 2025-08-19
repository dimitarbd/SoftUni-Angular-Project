import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class CommentsService {
    private apiUrl = 'http://localhost:3030/data/comments';

    constructor(private httpClient: HttpClient, private authService: AuthService) {}

    private getHeaders(): HttpHeaders {
        const token = this.authService.getAccessToken();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            ...(token && { 'X-Authorization': token })
        });
    }

    getAllByPart(partId: string): Observable<any[]> {
        const where = encodeURIComponent(`partId="${partId}"`);
        const load = encodeURIComponent('author=_ownerId:users');
        const url = `${this.apiUrl}?where=${where}&load=${load}`;
        return this.httpClient.get<any[]>(url);
    }

    create(partId: string, text: string, rating: number, currentDate: string): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl, { partId, text, rating, currentDate }, { headers: this.getHeaders() });
    }

    delete(commentId: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.apiUrl}/${commentId}`, { headers: this.getHeaders() });
    }

}
