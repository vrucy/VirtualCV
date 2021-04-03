import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { ClientService } from '../../services/client-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-take-picture',
  templateUrl: './take-picture.component.html',
  styleUrls: ['./take-picture.component.css']
})
export class TakePictureComponent implements OnInit {
  idClient;

  constructor(private clientService: ClientService, private router: Router) { }

  public webcamImage: WebcamImage = null;

  ngOnInit() {
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }
  goToQuestion(id) {
    this.router.navigate(['answer'], { queryParams: { questionId: id } });
  }

  async submit() {
    // this.goToQuestion(this.api.sharedClient.PositionId);
    this.clientService.currentClient.Img = this.webcamImage.imageAsBase64;
    await this.clientService.postClient(this.clientService.currentClient).toPromise().then((data) => {
    });
    await this.clientService.getClientId().toPromise().then(res => {
      this.idClient = res;
    });

    const id = this.idClient;
    sessionStorage.removeItem('Value');
    sessionStorage.setItem('Value', this.idClient);
     this.goToQuestion(this.clientService.currentClient.PositionId);

  }
  getUserid() {
    this.clientService.getClientId().subscribe(res => {
      this.idClient = res;
    });
  }
  retry() {
    this.webcamImage = null;
  }
}
