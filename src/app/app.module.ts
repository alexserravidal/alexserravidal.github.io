import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {TypingEffectModule} from './typing-effect/typing-effect.module';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {CoreModule} from './core/core.module';
import {TranslateLocalstorageService} from './core/services/translate-localstorage.service';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function setLanguageFromLocalStorage(translateService: TranslateService) {
  return () => {
    translateService.setDefaultLang('es');
    let lsLang: string = localStorage.getItem("LANG");
    if (lsLang) translateService.use(lsLang);
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    CoreModule,
    TypingEffectModule
  ],
  providers: [
    {
      provide: TranslateService,
      useClass: TranslateLocalstorageService
    },
    {
      provide: APP_INITIALIZER,
      useFactory: setLanguageFromLocalStorage,
      deps: [TranslateService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
