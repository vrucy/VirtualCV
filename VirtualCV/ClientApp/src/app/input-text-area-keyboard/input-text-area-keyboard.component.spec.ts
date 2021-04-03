import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextAreaKeyboardComponent } from './input-text-area-keyboard.component';

describe('InputTextAreaKeyboardComponent', () => {
  let component: InputTextAreaKeyboardComponent;
  let fixture: ComponentFixture<InputTextAreaKeyboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTextAreaKeyboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextAreaKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
