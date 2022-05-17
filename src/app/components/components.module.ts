import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AllMaterialModule } from './material/all-material/all-material.module';
import {AvatarModule} from 'ngx-avatar';

import { NgxPaginationModule } from 'ngx-pagination';
import { AngularPaginatorModule } from 'angular-paginator';
import { PipesModule } from 'app/pipes/pipes.module';


//NGX
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { TranslateModule } from '@ngx-translate/core';




import { NgxInfiniteScrollerModule } from 'ngx-infinite-scroller';



import { TooltipModule } from 'ngx-tooltip';



import { HighchartsChartModule } from 'highcharts-angular';

import { AlertMessageComponent } from './modals/alert-message/alert-message.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AllMaterialModule,
    AvatarModule,
    NgxPaginationModule,
    AngularPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    NgxMatSelectSearchModule,
    TranslateModule,
    TooltipModule,
    NgxInfiniteScrollerModule,
    HighchartsChartModule
  ],
  declarations: [
   


    AlertMessageComponent,
  
  ],
  exports: [
  

    AllMaterialModule,
   
    AlertMessageComponent,
  
  ],
  entryComponents:[
 
 
    AlertMessageComponent,
  
  ]
})
export class ComponentsModule { }
