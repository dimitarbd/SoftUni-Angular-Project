import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Offer } from "../../models";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private apiUrl = 'http://localhost:3000/api/themes';

    constructor(private httpClient: HttpClient) {}

    getOffers(): Observable<Offer[]> {
        return this.httpClient.get<Offer[]>(this.apiUrl);
    }

}
