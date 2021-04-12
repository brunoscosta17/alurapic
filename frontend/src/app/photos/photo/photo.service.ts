import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class PhotoService {

    API_URL = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    listFromUser(userName: string) {
        return this.http.get<object[]>(this.API_URL + '/flavio/photos');
    }

}