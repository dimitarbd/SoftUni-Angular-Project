import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Comment } from "../../models";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommentsService {
    private apiUrl = 'http://localhost:3030/data/comments';

    constructor(private httpClient: HttpClient) {}

    getAllByPart(partId: string): Observable<any[]> {
        // Build URL manually to preserve '=' inside 'load' and avoid double-encoding quirks
        const where = encodeURIComponent(`partId="${partId}"`);
        const load = encodeURIComponent('author=_ownerId:users');
        const url = `${this.apiUrl}?where=${where}&load=${load}`;
        return this.httpClient.get<any[]>(url);
    }

    create(partId: string, text: string, rating: number, currentDate: string): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl, { partId, text, rating, currentDate });
    }

    delete(commentId: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.apiUrl}/${commentId}`);
    }

}
