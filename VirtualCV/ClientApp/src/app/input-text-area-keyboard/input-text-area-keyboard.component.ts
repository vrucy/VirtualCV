import { TranslateService } from './../services/translate.service';
import { Component, OnInit, Output, Input, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-input-text-area-keyboard',
  templateUrl: './input-text-area-keyboard.component.html',
  styleUrls: ['./input-text-area-keyboard.component.css']
})
export class InputTextAreaKeyboardComponent implements OnInit {

  screenHeight: number;
  screenWidth: number;
  isVirtualKeyboard: boolean;
  // @Input() value: string;
  value: string;
  @Output() modelChange = new EventEmitter<string>();
  @Input() placeholder: string;

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.isVirtualKeyboard = this.screenWidth < 1100;
  }

  modelChanged() {
    this.modelChange.emit(this.value);
  }

}
