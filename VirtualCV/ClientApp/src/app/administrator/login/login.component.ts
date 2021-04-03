import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  detailForm: FormGroup;

  user;
  pass;
  constructor(private authService: AuthService, private route: Router, private fb: FormBuilder) {this.createForm(); }

  private createForm() {
    this.detailForm = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required]),
    });
  }

  login() {
    this.authService.login(this.user, this.pass).subscribe(res => {
      this.route.navigate(['/mainAdmin']);
    });
  }
  setUserName(event) {
    this.user = event;
  }
  logout() {
    this.route.navigate(['/home']);
  }
}
