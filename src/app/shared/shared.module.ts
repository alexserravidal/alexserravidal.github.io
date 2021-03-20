import {NgModule} from '@angular/core';
import {MaterialModule} from '../material/material.module';

const modules: any[] = [
  MaterialModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class SharedModule { }
