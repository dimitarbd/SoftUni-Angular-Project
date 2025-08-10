import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Part } from "../../models";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PartService {
    private apiUrl = 'http://localhost:3030/data/parts';

    constructor(private httpClient: HttpClient) { }

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
                    .sort((a, b) => new Date(b._createdOn).getTime() - new Date(a._createdOn).getTime())
                    .slice(0, limit);
            })
        );
    }

}
