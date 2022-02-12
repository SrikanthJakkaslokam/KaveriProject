import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../shared/services/http.service';

import { AppService } from '../shared/services/app.service';
import { ApexService } from '../shared/services/apex.service';
import { AmountToWordPipe } from '../views/document-details/pipes/amount-to-word/amount-to-word.pipe';
import { SafehtmlPipe } from '../views/document-details/safehtml.pipe';

@NgModule({
  declarations: [
    AmountToWordPipe,
    SafehtmlPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    HttpService,
    AppService,
    ApexService,
  ],
  exports: [
    AmountToWordPipe,
    SafehtmlPipe,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
