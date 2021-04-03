import { AnswerService } from '../../services/answer.service';
import { QuestionService } from '../../services/question.service';
import { ClientService } from '../../services/client-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer } from '../../../Models/Answer';

@Component({
  selector: 'app-question',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  questions;
  answers: Answer[] = [];
  value: any[];
  thumbLabel = true;
  uniqueAnswerType: any;
  allTypeIds = [];

  constructor(private route: ActivatedRoute,
              private apiClient: ClientService,
              private router: Router,
              private questionService: QuestionService,
              private answerService: AnswerService) { }

  ngOnInit() {
    const param = this.route.snapshot.queryParams['questionId'];
    this.questionService.getQuestions(param).subscribe(res => {
      this.questions = res;
        this.questions.forEach( e => {
        this.allTypeIds.push( e.questionType);
      });
        this.uniqueAnswerType =  new Set(this.allTypeIds.map(item => item.nameType
      ));
    });
  }

  sliderChange(value, i) {
    this.questions[i].Answer = value;
  }

  async submit() {
    // tslint:disable-next-line:radix
    const ClientIDSession = parseInt(sessionStorage.getItem('Value').toString());

    this.answers = this.questions.map(q => {
      const dbAnswer = <Answer>{
        AnswerQuestion: q.Answer,
        QuestionId: q.id,
        ClientId: ClientIDSession
      };
      return dbAnswer;
    });

   this.answerService.postAnswer(this.answers);
    this.apiClient.answerClient = this.answers;
    this.router.navigate(['home']);
    await sessionStorage.removeItem('Value');
  }
}
