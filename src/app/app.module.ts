import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TypingEffectModule} from './typing-effect/typing-effect.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TypingEffectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
