import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// thrid part
import { WebcamModule } from 'ngx-webcam';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
//

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from './routing.module';
import { MaterialModule } from '../material-module';

import { PersonalCredentialsClientComponent } from './client/personal-credentials/personal-credentials.component';
import { AnswerComponent } from './client/answer/answer.component';
import { LoginComponent } from './administrator/login/login.component';
import { MainComponent } from './administrator/main/main.component';
import { PositionComponent } from './administrator/position/position.component';
import { QuestionComponent } from './administrator/question/question.component';
import { ClientListComponent } from './administrator/client-list/client-list.component';
import { TakePictureComponent } from './client/take-picture/take-picture.component';
import { CameraComponent } from './client/take-picture/camera/camera.component';
import { DetailsClientsComponent } from './administrator/details-clients/details-clients.component';
import { TranslatePipe } from './pipe/translate.pipe';
import { TranslateService } from './services/translate.service';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { InputKeyboardComponent } from './input-keyboard/input-keyboard.component';
import { InputTextAreaKeyboardComponent } from './input-text-area-keyboard/input-text-area-keyboard.component';
import { TestComponent } from './test/test.component';
import { SharedModule } from './shared/shared.module';

export function setupTranslateFactory(
  translateService: TranslateService): Function {
  return () => translateService.use('en');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PersonalCredentialsClientComponent,
    AnswerComponent,
    LoginComponent,
    MainComponent,
    PositionComponent,
    QuestionComponent,
    ClientListComponent,
    TakePictureComponent,
    CameraComponent,
    DetailsClientsComponent,
    TranslatePipe,
    KeyboardComponent,
    InputKeyboardComponent,
    InputTextAreaKeyboardComponent,
    TestComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    WebcamModule,
    SharedModule,
    LayoutModule
  ],
  providers: []
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
