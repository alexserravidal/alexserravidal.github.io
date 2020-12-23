import { Component } from '@angular/core';
import {delay} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  firstPhraseTypingFinished: boolean = false;
  secondPhraseTypingFinished: boolean = false;
  startTypingSecondPhrase: boolean = false;
  isVmwButtonEnabled: boolean = false;

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
