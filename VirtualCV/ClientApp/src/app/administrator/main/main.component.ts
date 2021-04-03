import { TranslateService } from './../../services/translate.service';
import { AuthService } from './../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  currentUserName;
  constructor(private auth: AuthService, private translateService: TranslateService) { }

  ngOnInit() {
    this.currentUserName = sessionStorage.getItem('adminUser');
  }

}
