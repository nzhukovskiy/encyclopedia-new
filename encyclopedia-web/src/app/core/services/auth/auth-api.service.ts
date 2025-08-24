import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private readonly httpClient: HttpClient) {

  }

  login() {
      return this.httpClient.post("auth/login", {});
  }
}
