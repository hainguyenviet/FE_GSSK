
import { CarouselModule } from './carousel/carousel.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressComponent } from './progress/progress.component';
import { ProgressStepComponent } from './progress/progress-step/progress-step.component';
import { ProgressStepDirective } from './progress/progress-step.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonComponent } from './person/person.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { IllnessComponent } from './illness/illness.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { RelationshipComponent } from './relationship/relationship.component';
import {MatIconModule} from '@angular/material/icon';
import { GenogramComponent } from './genogram/genogram.component';
import { HomeComponent } from './home/home.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import {MatDialogModule} from '@angular/material/dialog';
import { InputInformationComponent } from './input-information/input-information.component';
import { ThankyoupageComponent } from './thankyoupage/thankyoupage.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { CarouselActionModule } from './carousel/carousel-action/carousel-action.module';
import{CarouselSponsorsModule} from './carousel/carousel-sponsors/carousel-sponsors.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { MomentDateModule } from '@angular/material-moment-adapter';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { InterceptorService } from './server_service/Interceptor/interceptor.service';
import { DirectingComponent } from './directing/directing/directing.component';
@NgModule({
  declarations: [
    AppComponent,
    ProgressComponent,
    ProgressStepComponent,
    ProgressStepDirective,
    PersonComponent,
    IllnessComponent,
    RelationshipComponent,
    GenogramComponent,
    HomeComponent,
    DisclaimerComponent,
    InputInformationComponent,
    ThankyoupageComponent,
    LoginComponent,
    RegisterComponent,
    DirectingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatStepperModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSelectModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    FontAwesomeModule,
    CarouselModule,
    CarouselActionModule,
    CarouselSponsorsModule,
    MatToolbarModule,
    SocialLoginModule,
    MomentDateModule
    
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[DisclaimerComponent]
})
export class AppModule {}
