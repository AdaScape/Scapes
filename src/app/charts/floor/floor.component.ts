import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationService } from 'app/services/Application/application.service';
import * as Highcharts from "highcharts/highstock";
import { interval } from 'rxjs/internal/observable/interval';
declare var require: any
require('highcharts/themes/dark-unica')(Highcharts);

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit {
  @Input() PolicyID = '';

  Highcharts: typeof Highcharts = Highcharts;


  FloorData: any[] = [];
  updateFlag: boolean = false;
  chartOptions: Highcharts.Options = {
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
      text: 'Floor'
    },
    yAxis: [{
      // tickInterval: 10,
      // tickPixelInterval: 300,
      allowDecimals: false,
      title: {
        text: 'Price'
      }
    }],
    xAxis: [{
      alignTicks: true,
    }],
    plotOptions: {
      series: {
        lineWidth: 6,
        color: "#65b35d"
      },
    },

    series: [{
      name: 'Price',
      type: 'spline',
      data: this.FloorData,
      tooltip: {
        valueDecimals: 0
      }
    }
    ],
    credits: {
      enabled: false
    },
  };


  LastPolicyID: any = "";
  RouterObject: Router;
  ApplicationServiceObject: ApplicationService;
  ProjectDetails: any = {};

  constructor(private translate: TranslateService, private RouterParamObject: Router, applicationService: ApplicationService) {

    this.RouterObject = RouterParamObject;
    this.ApplicationServiceObject = applicationService;

    this.translate.setDefaultLang('en');




  }

  ngOnInit() {
    // let PolicyID: any = "b79326622709326dba287d503c42ae9d6530af494634880086dae419";
    // this.getProjectDetails(this.PolicyID);


    // this.ApplicationServiceObject.GetProjectDetailsBYPolicyID(this.PolicyID).subscribe(data => {
    //   this.ProjectDetails = data;

    //   this.chartOptions.title = {
    //     text: this.ProjectDetails.collection.collection_name
    //   };


    // });
    interval(1000).subscribe(() => {
      if(this.LastPolicyID !== this.PolicyID){
        this.LastPolicyID =  this.PolicyID;
        this.FloorData = [];
        this.chartOptions.series[0] = {
          type: 'scatter',
          data: this.FloorData
        }
  
      }
      
      this.getProjectDetails(this.PolicyID);
      this.updateFlag = true;
    });

  }

  ngOnchange() {

  }


  getProjectDetails(PolicyID) {
    this.ApplicationServiceObject.GetJPGFloorByPolicyID(PolicyID).subscribe(data => {
      this.ProjectDetails = data;
   

      let RealFloor = this.ProjectDetails.floor / 1000000;
      let DataBuilder = [];
      DataBuilder.push(new Date().getTime());
      DataBuilder.push(RealFloor);

      this.FloorData.push(DataBuilder);



      // this.chartOptions.yAxis[0].tickPositions = this.LowestFloor;
      // this.chartOptions.yAxis[0].tickPositions = Math.round(RealFloor / 10);
      this.chartOptions.series[0] = {
        type: 'spline',
        data: this.FloorData
      }
      this.updateFlag = true;
    });
  }


}
