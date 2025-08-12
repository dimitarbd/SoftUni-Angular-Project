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
        const params = new HttpParams()
            .set('where', `partId="${partId}"`)
            .set('load', 'author=_ownerId:users');
        return this.httpClient.get<any[]>(this.apiUrl, { params });
    }

    create(partId: string, text: string, rating: number, currentDate: string): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl, { partId, text, rating, currentDate });
    }

    delete(commentId: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.apiUrl}/${commentId}`);
    }

}
