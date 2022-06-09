
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenogramComponent } from './genogram/genogram.component';
import { HomeComponent } from './home/home.component';
import { InputInformationComponent } from './input-information/input-information.component';
import { ThankyoupageComponent } from './thankyoupage/thankyoupage.component';

const routes: Routes = [
  {
    path:'',component: InputInformationComponent
  },
  {
    path:'genogram',component: GenogramComponent
  },
  {
    path:'input-information',component: InputInformationComponent
  },
  {path:'thankyou',component: ThankyoupageComponent}
  /* {
    path: '', component:  
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
