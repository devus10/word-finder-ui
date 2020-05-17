import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  private _apiUrl: string = environment.apiUrl;

  get apiUrl(): string {
    return this._apiUrl;
  }
}
