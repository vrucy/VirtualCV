import { InputKeyboardComponent } from './../../input-keyboard/input-keyboard.component';
import { QuestionService } from './../../services/question.service';
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { Client} from '../../../Models/Client';
import { AppliedPosition} from '../../../Models/position';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { ClientService } from '../../services/client-service.service';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-personal-credentials',
  templateUrl: './personal-credentials.component.html',
  styleUrls: ['./personal-credentials.component.css']
})
export class PersonalCredentialsClientComponent implements OnInit {

  angForm: FormGroup;
  webcamImage: WebcamImage = null;
  positions: AppliedPosition[];
  client: Client = <Client>{ Email: '', LastName: '', Mobile: '', Name: '', Img: null };
  language ;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private questionSerivce: QuestionService,
    private translateService: TranslateService) {  }

  ngOnInit() {
    this.clientCredentials();
    this.questionSerivce.getPositions().subscribe(res => {
      this.positions = res;
    });
  }
  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }
  clientCredentials() {
    this.angForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['',Validators.required],
      mobile:['', [Validators.required , Validators.pattern('[0-9]*')]],
      email:['',  [Validators.required, Validators.email]],
      positionId: ['', Validators.required ]
    });
  }
  // , Validators.pattern('[0-9]*')
  async onSubmit() {
    this.clientService.currentClient = this.client;
    this.router.navigate(['picture']);
    }

  setClientName(data) {
    this.client.Name = data;
  }

  setClientLastName(data) {
    this.client.LastName = data;
  }
  setClientMobile(data) {
    this.client.Mobile = data;
  }
  setClientEmail(data) {
    this.client.Email = data;
  }
}
