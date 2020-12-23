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
  @Input() text: string;

  /// CURSOR VISUALIZATION
  @Input() showCursor: boolean = true;
  @Input() showCursorAfterFinish: boolean = true;

  @Output() finished: EventEmitter<void> = new EventEmitter<void>();
  alreadyShowedText: string = "";

  typeWritingObservable: Observable<string>;

  constructor() {}
  ngOnInit(): void {
    this.typeWritingObservable = from(this.text).pipe(
      concatMap(character => of(character).pipe(
        map((char: string) => {
          return char;
        }),
        delay(50))),
    );

    this.typeWritingObservable.subscribe((char: string) => {
      this.alreadyShowedText += char;
    }, () => {}, () => {
      this._textFinishedPrinting = true;
      this.finished.emit();
    })
  }
}
