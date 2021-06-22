import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser } from './new-user.interface';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class SignupService {

    constructor(private http: HttpClient) {}

    checkUserNameTaken(userName: string) {
        return this.http.get(API_URL + '/user/exists/' + userName);
    }

    signup(newUser: NewUser) {
        return this.http.post(API_URL + '/user/signup', newUser);
    }

}