import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private httpClient: HttpClient) { }

  postAnswer(answer) {
    return this.httpClient.post(`${environment.baseUrl}Answers/PostAnswerForQuestion` , answer).subscribe(res => {
    });
  }
  getAnswersForQuestion(id) {
    return this.httpClient.get(`${environment.baseUrl}Answers/AnswersForQuestion/` + id);
  }

}
