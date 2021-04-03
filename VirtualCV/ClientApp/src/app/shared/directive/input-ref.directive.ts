import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[inputRef]'
})
export class InputRefDirective {

  constructor(private formControl: NgControl) {
  }

  isVirtualKeybouard = false ;
  get hasError() {
    return this.formControl.dirty && this.formControl.invalid;
  }

  get errors() {
    if (this.hasError && this.formControl.errors) {
      return this.formControl.errors;
    }
    return '';
  }

  get screenWidth() {
    if (window.innerWidth < 1024) {
      return this.isVirtualKeybouard = true;
    }
  }

}
