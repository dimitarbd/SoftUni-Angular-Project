import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Theme } from "../../models";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private apiUrl = 'http://localhost:3000/api/themes';

    constructor(private httpClient: HttpClient) {}

    getThemes(): Observable<Theme[]> {
        return this.httpClient.get<Theme[]>(this.apiUrl);
    }

}
