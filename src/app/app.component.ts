import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationStart } from '@angular/router';
import { ApplicationService } from './services/Application/application.service';
import PerfectScrollbar from 'perfect-scrollbar';
import * as Highcharts from "highcharts/highstock";

import { interval } from 'rxjs';
// require ('highcharts/themes/dark-unica')(Highcharts);

declare const TradingView: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  Highcharts: typeof Highcharts = Highcharts;

  PolicyID: any = "";
  FloorData: any[] = [];
  updateFlag: boolean = false;
  chartOptions: Highcharts.Options = {
    chart:{
      type: 'scatter',
    },
    rangeSelector: {
      enabled: false
    },
    navigator: {
      enabled: false
    },
    scrollbar: {
      enabled: false
    },
    title: {
      text: ''
    },
    yAxis: [{
      tickInterval: 5,
      title: {
        text: 'Floor'
      }
    }],
    series: [{
      type: 'spline',
      data: this.FloorData,
    }
    ]
  };



  RouterObject: Router;
  ApplicationServiceObject: ApplicationService;
  ProjectDetails: any = {};
  constructor(private translate: TranslateService, private RouterParamObject: Router, applicationService: ApplicationService) {

    this.RouterObject = RouterParamObject;
    this.ApplicationServiceObject = applicationService;

    this.translate.setDefaultLang('en');

    console.log();


  }

  ngOnInit() {
    // let PolicyID: any = "b79326622709326dba287d503c42ae9d6530af494634880086dae419";
    // this.getProjectDetails(PolicyID);

    // this.ApplicationServiceObject.GetProjectDetailsBYPolicyID(PolicyID).subscribe(data => {
    //   this.ProjectDetails = data;

    //   this.chartOptions.title = {
    //     text: this.ProjectDetails.collection.collection_name
    //   };

    //   this.updateFlag = true;
    // });
    // interval(5000).subscribe(() => {
    //   this.getProjectDetails(PolicyID);

    // });


  }

  // ngAfterViewInit() {
  //   new TradingView.widget({
  //     'container_id': 'technical-analysis',
  //     'autosize': true,
  //     'symbol': "NASDAQ:AAPL",
  //     'interval': '120',
  //     'timezone': 'exchange',
  //     'theme': 'Dark',
  //     'style': '1',
  //     'toolbar_bg': '#f1f3f6',
  //     'withdateranges': true,
  //     'hide_side_toolbar': false,
  //     'allow_symbol_change': true,
  //     'save_image': false,
  //     'hideideas': true,
  //     'studies': [
  //       'MASimple@tv-basicstudies'],
  //     'show_popup_button': true,
  //     'popup_width': '1000',
  //     'popup_height': '650'
  //   });
  // }



  getProjectDetails(PolicyID) {
    this.ApplicationServiceObject.GetJPGFloorByPolicyID(PolicyID).subscribe(data => {
      this.ProjectDetails = data;
      console.log(this.ProjectDetails.floor);

      let RealFloor = this.ProjectDetails.floor / 1000000;
      let DataBuilder = [];
      DataBuilder.push(new Date().getTime());
      DataBuilder.push(RealFloor);
      console.log(this.ProjectDetails);
      this.FloorData.push(DataBuilder);

      this.chartOptions.yAxis[0].tickInterval = Math.round(RealFloor / 10);
      this.chartOptions.series[0] = {
        type: 'spline',
        data: this.FloorData
      }
      this.updateFlag = true;
    });
  }


  currentSection = 'section1';

  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }


  scrollTo(section) {
    document.querySelector('#' + section)
      .scrollIntoView();
  }

  PolicyIDValue: string = '';
  ProjectTitle: string = '';
  SearchByPolicyID() {
    this.PolicyID = this.PolicyIDValue;
    this.ApplicationServiceObject.GetProjectDetailsBYPolicyID(this.PolicyID).subscribe(data => {
      this.ProjectDetails = data;

      this.ProjectTitle =  this.ProjectDetails.collection.collection_name;

    });
  }



}
