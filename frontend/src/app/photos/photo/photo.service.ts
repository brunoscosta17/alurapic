import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Photo } from "./photo.interface";

@Injectable({ providedIn: 'root' })
export class PhotoService {

    API_URL = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    listFromUser(userName: string) {
        return this.http.get<Photo[]>(this.API_URL + `/${userName}/photos`);
    }

    listFromUserPaginated(userName: string, page: number) {
        const params = new HttpParams().append('page', page.toString());
        return this.http.get<Photo[]>(this.API_URL + `/${userName}/photos`, { params });
    }

    upload(description: string, allowComments: boolean, file: File) {
        const formData = new FormData();

        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', file);
        
        return this.http.post(this.API_URL + '/photos/upload', formData);
    }

}