import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Language} from '../resources/language';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {catchError, map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(private _http: HttpClient,
              private _translateService: TranslateService) { }

  use(lang: string): Observable<any> {
    return this._translateService.use(lang);
  }

  getLanguages(): Observable<Language[]> {
    return this._http.get<Language[]>("assets/data/languages.json");
  }

  getLanguage(): Observable<Language> {
    return this.getLanguages().pipe(
      map((languages: Language[]) => {
        let currentLangCode: string = this._translateService.currentLang;
        let foundCurrentLang: Language = languages.find((lang: Language) => { return lang.code === currentLangCode });
        return foundCurrentLang;
      }),
      catchError(() => {
        return of(null);
      })
    )
  }

  onLangChange(): Observable<Language> {
    return this._translateService.onLangChange.pipe(
      switchMap((langChangeEvent: LangChangeEvent) => {
        return this.getLanguages().pipe(
          map((languages: Language[]) => {
            let langChangeCode: string = langChangeEvent.lang;
            let foundLang: Language = languages.find((lang: Language) => { return lang.code === langChangeCode });
            return foundLang;
          }),
          catchError(() => {
            return of(null);
          })
        )
      })
    )
  }
}
