import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Language} from '../../core/resources/language';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() languages: Language[] = [];
  @Output() languageChange: EventEmitter<Language> = new EventEmitter<Language>();
  sLanguage: Subscription;

  form: FormGroup = new FormGroup({
    language: new FormControl()
  });

  @Input() set language(language: Language) {
    console.log("setLanguage", language);
    this.form.get("language").setValue(language ? language.code : null, { emitEvent: false });
  }

  ngOnInit(): void {
    this.sLanguage = this.form.get("language").valueChanges.subscribe((language: string) => {
      console.log(language);
      this.languageChange.emit(this.languages.find((lang: Language) => { return lang.code === language }));
    })
  }
}
