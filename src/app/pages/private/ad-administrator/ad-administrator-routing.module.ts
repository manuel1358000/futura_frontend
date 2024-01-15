import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import authGuard from '../../../guards/auth/auth.guard';


const routes: Routes = [
  {
    path: 'administration',
    component: AdministrationComponent,
    canActivate: [authGuard], 
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdAdministratorRoutingModule { }
