import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription, from, of, Observable} from 'rxjs';
import {concatMap, delay, map} from 'rxjs/operators';

@Component({
  selector: 'app-typing-effect',
  templateUrl: './typing-effect.component.html',
  styleUrls: ['./typing-effect.component.scss'],
})
export class TypingEffectComponent implements OnInit {
  _textFinishedPrinting: boolean = false;

  private _text: string;
  @Input() set text(text: string) {
    this._text = text;

    if (this._textFinishedPrinting) this.alreadyShowedText = text;
    else this.resetTypingEffect();
  }
  get text(): string {
    return this._text;
  }

  /// CURSOR VISUALIZATION
  @Input() showCursor: boolean = true;
  @Input() showCursorAfterFinish: boolean = true;

  @Output() finished: EventEmitter<void> = new EventEmitter<void>();
  alreadyShowedText: string = "";

  typeWritingObservable: Observable<string>;

  /// SUBSCRIPTIONS
  sTypeWritingObservable: Subscription;

  constructor() {}
  ngOnInit(): void {
    this.resetTypingEffect();
  }

  resetTypingEffect(): void {
    if (this.sTypeWritingObservable) this.sTypeWritingObservable.unsubscribe();
    this.alreadyShowedText = "";
    this.typeWritingObservable = from(this.text).pipe(
      concatMap(character => of(character).pipe(
        map((char: string) => {
          return char;
        }),
        delay(50))),
    );

    this.sTypeWritingObservable = this.typeWritingObservable.subscribe((char: string) => {
      this.alreadyShowedText += char;
    }, () => {}, () => {
      this._textFinishedPrinting = true;
      this.finished.emit();
    })
  }
}
