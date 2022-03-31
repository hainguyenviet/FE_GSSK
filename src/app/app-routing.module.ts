import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenogramComponent } from './genogram/genogram.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {
    path:'',component: HomeComponent
  },
  {
    path:'genogram',component: GenogramComponent
  },
  /* {
    path: '', component:  
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
