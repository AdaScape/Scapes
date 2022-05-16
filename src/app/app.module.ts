import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { HighchartsChartModule } from "highcharts-angular";
import { AgmCoreModule } from '@agm/core';
import { AllMaterialModule } from './components/material/all-material/all-material.module';



// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AvatarModule } from 'ngx-avatar';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { PipesModule } from './pipes/pipes.module';


import { ApplicationService } from './services/Application/application.service';

import { QuillModule } from 'ngx-quill';
import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';
import { NgxInfiniteScrollerModule } from 'ngx-infinite-scroller';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PlatformModule } from '@angular/cdk/platform';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxNumberValidationModule } from 'ngx-number-validation';
import { FloorComponent } from './charts/floor/floor.component';
import { ListedComponent } from './charts/listed/listed.component';
import { SalesComponent } from './charts/sales/sales.component';
import { FloorListedComponent } from './charts/floor-listed/floor-listed.component';


export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'Notifications';
  c.qs = { user: 'client' };
  c.logging = true;
  return c;
}

// export let options: Partial<IConfig> | (() => Partial<IConfig>);

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AllMaterialModule,
    RouterModule,
    PipesModule,
    AppRoutingModule,
    ComponentsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    ScrollingModule,
    PlatformModule,
    AngularFontAwesomeModule,
    FlexLayoutModule,
    HighchartsChartModule,
    NgxInfiniteScrollerModule,
    NgxNumberValidationModule.forRoot({ decimalSeparator: '.', thousandSeparator: ',', decimalCount: 2 }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction

          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],

          ['clean'],                                         // remove formatting button

          ['link', 'image', 'video']
        ]
      }
    }),
    SignalRModule.forRoot(createConfig),
    NgxMaskModule.forRoot(options),
    CurrencyMaskModule
  ],
  declarations: [
    AppComponent,
    FloorComponent,
    ListedComponent,
    SalesComponent,
    FloorListedComponent,

  ],
  bootstrap: [AppComponent],
  exports: [
    ComponentsModule,
    AllMaterialModule
  ],
  providers: [PipesModule, ApplicationService
  ],

})
export class AppModule {

}


// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}