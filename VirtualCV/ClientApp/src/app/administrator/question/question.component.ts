import { Question } from './../../../Models/Question';
import { TranslateService } from './../../services/translate.service';
import { QuestionService } from '../../services/question.service';
import { Component, OnInit, ViewChild, HostListener, ViewChildren } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { Observable, of } from 'rxjs';
import { fromMatPaginator, paginateRows } from '../datasourse-utils';
import { map } from 'rxjs/operators';
import { InputKeyboardComponent } from '../../input-keyboard/input-keyboard.component';
import { QueryList } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren(InputKeyboardComponent) child: QueryList<InputKeyboardComponent>;
  displayedRows$: Observable<Question[]>;
  totalRows$: Observable<number>;

  currentUserName;
  questionTypes;
  positions;
  questionComponents;
  question = { PositionId: '', QuestionTypeId: '', ComponentId: '', Question: '' };
  multipleTypeQuestion = [];
  multiplePosition = [];
  allQuestion;
  editQuestion;
  questionForSearch;
  selectedPositionQuestion;
  selectedTypeQuestion;

  constructor(private questionService: QuestionService, private translateService: TranslateService) { }
  @ViewChild('searchQ') searchQ;


  ngOnInit() {
    this.currentUserName = sessionStorage.getItem('adminUser');
    this.getAllQuestion();

    this.questionService.getPositions().subscribe(res => {
      this.positions = res;
    });

    this.questionService.getQuestionType().subscribe(res => {
      this.questionTypes = res;
    });

    this.questionService.getQuestionComponent().subscribe(res => {
      this.questionComponents = res;
    });
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.child.first.reset();
    this.questionForSearch = null;
    this.getAllQuestion();
    
  }

  selectquestion(question) {
    this.editQuestion = { ...question };
  }

  close() {
    this.editQuestion = null;
  }

  edit(id, question) {
    this.questionService.editQuestion(id, question).subscribe(() => {
      this.getAllQuestion();
    });
  }
  test(i) {
    console.log(i);
  }
  getQuestionForPosition(id) {
    let rows$ = of(this.allQuestion);
    this.questionService.getQuestionsForPosition(id).subscribe(res => {
      this.allQuestion = res;
      rows$ = of(this.allQuestion);
      const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
      this.totalRows$ = rows$.pipe(map(rows => rows.length));
      this.displayedRows$ = rows$.pipe(paginateRows(pageEvents$));
      this.selectedTypeQuestion = null;
    });
  }
  getQuestionsForType(id) {
    let rows$ = of(this.allQuestion);
    this.questionService.getQuestionForType(id).subscribe(res => {
      this.allQuestion = res;
      rows$ = of(this.allQuestion);
      const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
      this.totalRows$ = rows$.pipe(map(rows => rows.length));
      this.displayedRows$ = rows$.pipe(paginateRows(pageEvents$));
      this.selectedPositionQuestion = null;
    });
  }

  getAllQuestion() {
     let rows$ = of(this.allQuestion);
    this.questionService.getAllQuestions().subscribe(res => {
      this.allQuestion = res;
      rows$ = of(this.allQuestion);
      const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
      this.totalRows$ = rows$.pipe(map(rows => rows.length));
      this.displayedRows$ = rows$.pipe(paginateRows(pageEvents$));
    });
  }

  postQuestion(question) {

    // const q = [];
    const postForm = {
      Question: question,
      PositionIds: this.multiplePosition
    };
    this.questionService.postQuestion(postForm).subscribe(res => {
      this.getAllQuestion();
      this.reset();
    });
  }

  showButton(): boolean {
    if (this.selectedPositionQuestion != null || this.selectedTypeQuestion != null) {
      return true;
    } else {
      return false;
    }
  }
  searchQuestion(event) {
    if (event.key === 'Escape') {
      this.questionForSearch = null;
      console.log(this.child);
      console.log(this.questionForSearch)
    }
  }
  reset() {
    this.question.Question = null;
    this.child.first.reset();
    this.question.QuestionTypeId = null;
    this.question.ComponentId = null;
    this.multiplePosition = null;
  }
  resetFilter() {
    this.selectedPositionQuestion = null;
    this.selectedTypeQuestion = null;
    this.getAllQuestion();
  }
  
  setQuestion(data) {
    this.question.Question = data;
  }
  setQuestionForSearch(data) {
    this.questionForSearch = data;
  }
}
