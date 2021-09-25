import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MultiselectComponent } from './component/multiselect/multiselect.component';
import { ReactiveFormComponentComponent } from './component/reactive-form-component/reactive-form-component.component';
import { DataTableComponentComponent } from './component/data-table-component/data-table-component.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MultiselectComponent,
    ReactiveFormComponentComponent,
    DataTableComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
