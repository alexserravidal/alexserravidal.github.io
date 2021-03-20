import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

const modules: any[] = [
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatFormFieldModule,
  MatSelectModule
];

@NgModule({
  imports: modules,
  exports: modules
}) export class MaterialModule {

}
