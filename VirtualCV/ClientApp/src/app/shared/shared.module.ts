import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { InputRefDirective } from './directive/input-ref.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomInputComponent, InputRefDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [CustomInputComponent, InputRefDirective],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
