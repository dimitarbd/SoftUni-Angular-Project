import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Part} from "../../models";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PartService {
    private apiUrl = 'http://localhost:3000/api/parts?limit={0}';

    constructor(private httpClient: HttpClient) {}

        getRecentParts(limit: number = 10): Observable<Part[]> {
        return this.httpClient.get<Part[]>(this.apiUrl.replace('{0}', limit.toString()));
    }

}
