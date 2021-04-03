import { TranslateService } from './../services/translate.service';
import { Component, OnInit, HostListener, Output, EventEmitter, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-keyboard',
  templateUrl: './input-keyboard.component.html',
  styleUrls: ['./input-keyboard.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputKeyboardComponent),
      multi: true
    }
  ]
})
export class InputKeyboardComponent implements OnInit, ControlValueAccessor {

  screenHeight: number;
  screenWidth: number;
  isVirtualKeyboard: boolean;
  isPassword: boolean;
  value: string;
  @Input() invalid: any
  onChange: () => void;
  onTouched: () => void;
  disabled: boolean;
  @Output() modelChange = new EventEmitter<string>();
  @Input() placeholder: string;
  @Input() type: string = 'text';
  @Output() myValue = new EventEmitter();
    @Input() name: string;
    @Input() label: string;
    @Input() minlength: number = null;
    @Input() maxlength: number = null;
  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.onResize();
    this.isPasswordCheck(this.type);
  }
  isPasswordCheck(type) {
    if (type !== 'password') {
      this.isPassword = true;
    }
  }
  writeValue(value: string): void {
    this.value = value ? value : '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.isVirtualKeyboard = this.screenWidth < 1024;
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.value = null;
  }

  modelChanged() {
    this.modelChange.emit(this.value);
  }
  
  reset(){
    this.value = null;
  }
}
