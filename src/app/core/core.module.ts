import {NgModule} from '@angular/core';
import {TranslateLocalstorageService} from './services/translate-localstorage.service';

@NgModule({
  providers: [
    TranslateLocalstorageService
  ]
})
export class CoreModule { }
