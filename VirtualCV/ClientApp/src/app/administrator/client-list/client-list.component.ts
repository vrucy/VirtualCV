import { Client } from './../../../Models/Client';
import { TranslateService } from './../../services/translate.service';
import { ClientService } from '../../services/client-service.service';
import { QuestionService } from '../../services/question.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { sortRows, paginateRows, fromMatPaginator } from '../datasourse-utils';
import { ViewChildren } from '@angular/core';
import { InputKeyboardComponent } from '../../input-keyboard/input-keyboard.component';
import { QueryList } from '@angular/core';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedRows$: Observable<Client[]>;
  totalRows$: Observable<number>;
  @ViewChildren(InputKeyboardComponent) child: QueryList<InputKeyboardComponent>;
  currentUserName;
  allPositions;
  clientsForPosition;
  candidatsForSearch;
  allClients = [];
  positionId;
  selectedPositionId;

  constructor(private clientService: ClientService,
    private questionService: QuestionService,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.currentUserName = sessionStorage.getItem('adminUser');

    this.questionService.getPositions().subscribe(res => {
      this.allPositions = res;
    });
    this.getAllClients();
  }

  getPictureUrl(img) {
    return 'data:image/jpeg;base64,' + img;
  }

  positionChange(id) {
    let rows$ = of(this.allClients);
    this.clientService.getClientForPosition(id).subscribe(res => {
      this.allClients = res;
      this.selectedPositionId = id;
      rows$ = of(this.allClients);
      const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
      this.totalRows$ = rows$.pipe(map(rows => rows.length));
      this.displayedRows$ = rows$.pipe(paginateRows(pageEvents$));

    });
  }
  selectIdCandidate(candidat) {
    this.clientService.selectedClient = candidat;
  }
  showButton(): boolean {
    if (this.selectedPositionId != null || this.candidatsForSearch != null) {
      return true;
    } else {
      return false;
    }
  }
  getAllClients() {
    let rows$ = of(this.allClients);
    this.clientService.getAllClients().subscribe(res => {
      this.allClients = res;
      rows$ = of(this.allClients);
      const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
      this.totalRows$ = rows$.pipe(map(rows => rows.length));
      this.displayedRows$ = rows$.pipe(paginateRows(pageEvents$));
    });
  }
  reset() {
    this.selectedPositionId = null;
    this.allPositions = null;
    this.child.first.reset();
    this.candidatsForSearch = null;
    this.getAllClients();
  }

  setQuestionForSearch(data) {
    this.candidatsForSearch = data;
  }
}
