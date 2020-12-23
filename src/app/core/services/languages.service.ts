import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Language} from '../resources/language';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(private _http: HttpClient) { }

  getLanguages(): Observable<Language[]> {
    return this._http.get<Language[]>("assets/data/languages.json");
  }
}
