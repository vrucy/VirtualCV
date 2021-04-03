import { QuestionService } from '../../services/question.service';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AppliedPosition } from '../../../Models/position';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '../../services/translate.service';


@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})

export class PositionComponent implements OnInit {
  currentUserName;
  positions;
  positionForSearch;
  positoinName: AppliedPosition;
  selectedPosition: AppliedPosition;
  editPosition: AppliedPosition;
  form;
  positionN;
  positionDescription;
  @ViewChild('name') posN;

  constructor(private questionService: QuestionService, private translateService: TranslateService) { }

  ngOnInit() {
    this.currentUserName = sessionStorage.getItem('adminUser');
    this.positoinName = new AppliedPosition();
    this.getAllPosition();
    this.form = new FormGroup({
      positionN: new FormControl('', Validators.required),
      positionDescription: new FormControl('')
    });
  }
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.getAllPosition();
    this.positionForSearch = null;
  }
  getAllPosition() {
    this.questionService.getPositions().subscribe(res => {
      this.positions = res;
    });
  }

  edit(id, p) {
    this.questionService.editPosition(id, p).subscribe(res => {
      this.getAllPosition();
    });
  }
  selectPosition(position) {
    this.selectedPosition = { ...position };
  }
  close() {
    this.selectedPosition = null;
  }
  submit() {
    this.questionService.postPosition(this.positoinName).subscribe(res => {
      this.getAllPosition();
      this.reset();
    });
  }
  setPositionForSearch(event) {
    this.positionForSearch = event;
  }
  setPositionName(event) {
    this.positoinName.Name = event;
  }
  setPositionDescritpion(event) {
    this.positoinName.Description = event;
  }

  reset() {
    this.positoinName.Name = '';
    this.positoinName.Description = '';
  }
}
