import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    constructor(private httpClient: HttpClient) {}

    getThemes() {
        return this.httpClient.get<Theme[]>('assets/themes.json');
    }
}
