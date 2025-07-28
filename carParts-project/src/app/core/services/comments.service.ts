import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Offer } from "../../models";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommentsService {
    private apiUrl = 'http://localhost:3000/api/comments';

    constructor(private httpClient: HttpClient) {}

    getComments(): Observable<Comment[]> {
        return this.httpClient.get<Comment[]>(this.apiUrl);
    }

}
