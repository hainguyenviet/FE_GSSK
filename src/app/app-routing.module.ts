import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectingComponent } from './directing/directing/directing.component';
import { GenogramComponent } from './genogram/genogram.component';
import { HomeComponent } from './home/home.component';
import { InputInformationComponent } from './input-information/input-information.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './server_service/AuthService/auth.guard';
import { AuthService } from './server_service/AuthService/auth.service';
import { ThankyoupageComponent } from './thankyoupage/thankyoupage.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'genogram',
    component: GenogramComponent,
  },
  {
    path: 'input-information',
    component: InputInformationComponent, canActivate:[AuthGuard]
  },
  { path: 'thankyou', component: ThankyoupageComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path:'admin', component: AdminComponent
  },
  {
    path:'admin/dashboard', component: DashboardComponent
  },
  {
    path: 'info',
    component: DirectingComponent
  },
  { path: '**', redirectTo: '', canActivate: [AuthGuard] },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
