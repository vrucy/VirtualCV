import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonalCredentialsClientComponent } from './client/personal-credentials/personal-credentials.component';
import { AnswerComponent } from './client/answer/answer.component';
import { LoginComponent } from './administrator/login/login.component';
import { MainComponent } from './administrator/main/main.component';
import { PositionComponent } from './administrator/position/position.component';
import { QuestionComponent } from './administrator/question/question.component';
import { ClientListComponent } from './administrator/client-list/client-list.component';
import { TakePictureComponent } from './client/take-picture/take-picture.component';
import { DetailsClientsComponent } from './administrator/details-clients/details-clients.component';
import { LoginGuard } from './login.guard';
import { PersonalCredentialsGuard } from './personal-credentials.guard';
import { TestComponent } from './test/test.component';

const routes: Routes = [

  {path: 'personalCredentials', component: PersonalCredentialsClientComponent},
  {path: 'home', component: HomeComponent },
  // set router for answer.
  {path: 'answer' , component: AnswerComponent},
  {path: 'login' , component: LoginComponent },
  {path: 'mainAdmin' , component: MainComponent , canActivate: [LoginGuard]},
  {path: 'position', component: PositionComponent , canActivate: [LoginGuard]},
  {path: 'question' , component : QuestionComponent , canActivate: [LoginGuard]},
  {path : 'clientsList' , component : ClientListComponent , canActivate: [LoginGuard]},
  {path: 'picture', component: TakePictureComponent,  canActivate: [PersonalCredentialsGuard] },
  {path: 'details' , component : DetailsClientsComponent , canActivate: [LoginGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'test', component: TestComponent }
  // { path: '**', redirectTo: '/login', pathMatch: 'full' , canActivate: [LoginGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes ) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
