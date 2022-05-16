import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe/safe-html.pipe';
import { TitleCasePipe } from './title-case/title-case.pipe';


@NgModule({
  declarations: [
    SafeHtmlPipe, 
    TitleCasePipe],
  imports: [
    CommonModule
  ],
  exports:[
    SafeHtmlPipe
  ]
})
export class PipesModule { }
