import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponentComponent } from './component/data-table-component/data-table-component.component';
import { ReactiveFormComponentComponent } from './component/reactive-form-component/reactive-form-component.component';

const routes: Routes = [
  {
    path:'customerdata',
    component:DataTableComponentComponent
  },
  {
    path:'customerform',
    component:ReactiveFormComponentComponent
  },
  {
    path: '',
    redirectTo: 'customerdata',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
