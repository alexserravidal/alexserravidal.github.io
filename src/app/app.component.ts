import {Component, OnDestroy, OnInit} from '@angular/core';
import {delay} from 'rxjs/operators';
import {of, Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private _translate: TranslateService) {
    _translate.setDefaultLang('ca');
  }

  firstPhraseTexti18n: string;
  secondPhraseTexti18n: string;
  firstPhraseTypingFinished: boolean = false;
  secondPhraseTypingFinished: boolean = false;
  startTypingSecondPhrase: boolean = false;
  isVmwButtonEnabled: boolean = false;

  /// SUBSCRIPTIONS
  sFirstPhraseText: Subscription;
  sSecondPhraseText: Subscription;

  ngOnInit(): void {
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
}
