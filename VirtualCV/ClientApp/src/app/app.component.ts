import { TranslateService } from './services/translate.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  date = new Date();
  constructor(private  translate: TranslateService) {
    translate.use('en').then(() => {

    });
  }
  }

