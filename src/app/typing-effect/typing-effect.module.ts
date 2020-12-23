import {NgModule} from '@angular/core';
import {TypingEffectComponent} from './typing-effect.component/typing-effect.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [TypingEffectComponent],
  exports: [TypingEffectComponent],
  imports: [CommonModule]
})
export class TypingEffectModule { }
