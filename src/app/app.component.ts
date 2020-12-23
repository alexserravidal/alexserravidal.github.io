import {Component, OnDestroy, OnInit} from '@angular/core';
import {delay} from 'rxjs/operators';
import {of, Subscription} from 'rxjs';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {LanguagesService} from './core/services/languages.service';
import {Language} from './core/resources/language';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private _translate: TranslateService,
              private _languages: LanguagesService) {
  }

  // LANGS
  languages: Language[] = [];
  selectedLang: string = this._translate.defaultLang;

  firstPhraseTexti18n: string;
  secondPhraseTexti18n: string;
  firstPhraseTypingFinished: boolean = false;
  secondPhraseTypingFinished: boolean = false;
  startTypingSecondPhrase: boolean = false;
  isVmwButtonEnabled: boolean = false;

  /// SUBSCRIPTIONS
  sFirstPhraseText: Subscription;
  sSecondPhraseText: Subscription;
  sLangChange: Subscription;

  ngOnInit(): void {
    this._languages.getLanguages().subscribe((langs: Language[]) => {
      this.languages = langs;
    });

    this.sLangChange = this._translate.onLangChange.subscribe((lang: LangChangeEvent) => {
      this.selectedLang = lang.lang;
    });

    this.sFirstPhraseText = this._translate.stream('APP.INTRO_MSG_P1').subscribe((text: string) => {
      this.firstPhraseTexti18n = text;
    });

    this.sSecondPhraseText = this._translate.stream('APP.INTRO_MSG_P2').subscribe((text: string) => {
      this.secondPhraseTexti18n = text;
    })
  }

  ngOnDestroy(): void {
    if (this.sFirstPhraseText) this.sFirstPhraseText.unsubscribe();
    if (this.sSecondPhraseText) this.sSecondPhraseText.unsubscribe();
    if (this.sLangChange) this.sLangChange.unsubscribe();
  }

  onIntroTextFirstPhraseFinished(): void {
    this.firstPhraseTypingFinished = true;
    of(null).pipe(
      delay(500)
    ).subscribe(() => {
      this.startTypingSecondPhrase = true;
    });
  }

  onIntroTextSecondPhraseFinished(): void {
    this.secondPhraseTypingFinished = true;
    of(null).pipe(
      delay(500)
    ).subscribe(() => {
      this.isVmwButtonEnabled = true;
    })
  }

  setCurrentLanguage(lang: string) {
    this._translate.use(lang);
  }
}
