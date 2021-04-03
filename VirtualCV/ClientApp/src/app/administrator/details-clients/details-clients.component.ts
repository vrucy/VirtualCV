import { TranslateService } from './../../services/translate.service';
import { AnswerService } from './../../services/answer.service';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client-service.service';

@Component({
  selector: 'app-details-clients',
  templateUrl: './details-clients.component.html',
  styleUrls: ['./details-clients.component.css']
})

export class DetailsClientsComponent implements OnInit {
  currentUserName;
  client: any;
  questions;
  countQuestionType = [];
  answersForQuestions;
  numberOfCard: number;
  allTypeIds = [];
  setOfType = [];
  uniqueQuestionType: any;

  constructor(private clientService: ClientService, private answerService: AnswerService, private translateService: TranslateService) { }

  ngOnInit() {
    this.currentUserName = sessionStorage.getItem('adminUser');
    this.client = this.clientService.selectedClient;
    if (this.client) {
      this.answerService.getAnswersForQuestion(this.client.id).subscribe(res => {
        this.answersForQuestions = res;

        this.answersForQuestions.forEach(e => {
          this.allTypeIds.push(e.question.questionType);
        });

        this.uniqueQuestionType = new Set(this.allTypeIds.map(item => item.nameType
        ));

      });
    }
  }

  getPictureUrl(img) {
    if (img) {
      return 'data:image/jpeg;base64,' + img;
    }
  }
}
