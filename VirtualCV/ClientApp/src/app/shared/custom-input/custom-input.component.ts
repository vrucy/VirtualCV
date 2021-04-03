import { Component, OnInit, Input, ContentChild, HostListener, ViewChild, Output, ElementRef, OnDestroy } from '@angular/core';
import { InputRefDirective } from '../directive/input-ref.directive';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  MatKeyboardComponent,
  MatKeyboardRef,
  MatKeyboardService
} from 'vlados-awesome-keyboard';
import { Subscription } from 'rxjs';
// import { stat } from 'fs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent implements OnInit, OnDestroy {

  @Input() label: string;
  @Input() validations:  { [index: string]: string};
  @Input() info: string;
  @ViewChild('inputElementRef') inputElementRef: ElementRef;

  @ContentChild(InputRefDirective) input: InputRefDirective;

  screenHeight: number;
  screenWidth: number;
  isVirtualKeyboard: boolean;


  private _keyboardRef: MatKeyboardRef<MatKeyboardComponent>;
  private _enterSubscription: Subscription;
  private _inputElementRef: ElementRef;

  @Input() locale = 'sr';


  get isError() {
    return this.input.hasError;
  }

   get errorMessages() {
    const errors = this.input.errors;
    const messages = [];
    const keys = Object.keys(this.validations);

    keys.forEach(key => {
        if (errors[key]) {
          messages.push(this.validations[key]);
        }
      });
    return messages;
  }

  constructor(public breakpointObserver: BreakpointObserver, private keyboardService: MatKeyboardService) { }

  ngOnInit() {
    this.breakpointObserver.observe(['(min-width: 1000px)'])
                            .subscribe((state: BreakpointState) => {
                              if (state.matches) {
                                this.isVirtualKeyboard = false;
                              } else {
                                this.isVirtualKeyboard = true;
                              }
                            });
  }

  ngOnDestroy() {
    this.closeCurrentKeyboard();
  }

  closeCurrentKeyboard() {
    if (this._keyboardRef) {
      this.keyboardService.dismiss();
    }

    if (this._enterSubscription) {
      this._enterSubscription.unsubscribe();
    }
  }

  get isKeyboardVisible(): boolean {
    return this.keyboardService.isOpened;
  }

  toggle() {
    if (this.isKeyboardVisible) {
      this.closeCurrentKeyboard();
    } else {
      this.openKeyboard();
    }
  }

  show() {
    if (this.keyboardService.isOpened) {
      this.closeCurrentKeyboard();
      this.openKeyboard();
    }
  }

  private openKeyboard() {
    this._keyboardRef = this.keyboardService.open(this.locale);
    this._keyboardRef.instance.setInputInstance(this._inputElementRef);
  }
}
