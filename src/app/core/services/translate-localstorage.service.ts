import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
  TranslateService
} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateLocalstorageService extends TranslateService {
  use(lang: string): Observable<any> {
    localStorage.setItem("LANG", lang);
    return super.use(lang);
  }
}
