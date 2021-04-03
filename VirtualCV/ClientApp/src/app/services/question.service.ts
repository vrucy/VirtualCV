import { AppliedPosition } from '../../Models/position';
import { TypeQuestion } from './../../Models/TypeQuestion';
import { Question } from './../../Models/Question';
import {ComponentQuestion} from './../../Models/ComponentQuestion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient: HttpClient) { }

  getAllQuestions(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(`${environment.baseUrl}Questions`);
  }

  getQuestions(idPosition): Observable<Question[]> {
    return this.httpClient.get<Question[]>(`${environment.baseUrl}Questions/GetQuestionsForPosition/` + idPosition);
  }

  // postQuestionPostion(questionPositon) {
  //   return this.httpClient.post(`${environment.baseUrl}Questions/PostQuestionPositions` , questionPositon);
  // }

  postQuestion(question) {
    return this.httpClient.post(`${environment.baseUrl}Questions` , question );
  }

  getQuestionType(): Observable<TypeQuestion[]> {
    return this.httpClient.get<TypeQuestion[]>(`${environment.baseUrl}Questions/typeQuestions`);
  }

  getQuestionComponent(): Observable<ComponentQuestion[]> {
    return this.httpClient.get<ComponentQuestion[]>(`${environment.baseUrl}Questions/GetTypeComponent`);
  }

  getPositions(): Observable<AppliedPosition[]> {
    return this.httpClient.get<AppliedPosition[]>(`${environment.baseUrl}Positions`);
  }

  // getQuestngionTypeId(id): Observable<Question[]> {
  //   return this.httpClient.get<Question[]>(`${environment.baseUrl}Questions/GetQuestionForTypeId/` + id);
  // }

  editQuestion(id, question) {
    return this.httpClient.put(`${environment.baseUrl}Questions/${id}` , question);
  }

  getQuestionsForPosition(id) {
    return this.httpClient.get(`${environment.baseUrl}Questions/getQuestionsForPosition/${id}`);
  }

  getQuestionForType(id) {
    return this.httpClient.get(`${environment.baseUrl}Questions/getQuestionsForType/${id}`);
  }


  // this logic put here or to new service?
  postPosition(position) {
   return this.httpClient.post(`${environment.baseUrl}Positions`, position);
  }

  editPosition(id, position) {
    return this.httpClient.put(`${environment.baseUrl}Positions/${id}` , position);
  }

}
