import { MatKeyboardModule } from 'vlados-awesome-keyboard';
import { NgModule } from '@angular/core';
import { NgVirtualKeyboardModule } from '@protacon/ng-virtual-keyboard';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatSelectModule,
  MatInputModule,
  MatSliderModule,
  MatListModule,
  MatRadioModule,
  MatCardModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatIconModule
} from '@angular/material';

@NgModule({
    exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    MatListModule,
    MatSliderModule,
    MatRadioModule,
    MatCardModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    NgVirtualKeyboardModule,
    MatKeyboardModule
  ]
})
export class MaterialModule { }
