import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationService } from 'app/services/Application/application.service';
import * as Highcharts from "highcharts/highstock";
import { interval } from 'rxjs/internal/observable/interval';
import * as _ from 'underscore';
@Component({
  selector: 'app-listed',
  templateUrl: './listed.component.html',
  styleUrls: ['./listed.component.scss']
})
export class ListedComponent implements OnInit {

  @Input() PolicyID = '';

  Highcharts2: typeof Highcharts = Highcharts;
  LastPolicyID: any = "";
  FloorData: any[] = [];
  updateFlag: boolean = false;
  chartOptions2: Highcharts.Options = {
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
      text: 'Listed'
    },
    yAxis: [{
      // tickInterval: 10,
      // tickPixelInterval: 300,
      allowDecimals: false,
      title: {
        text: 'Quantity'
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
    credits: {
      enabled: false
    },
    series: [{
      name: 'Quantity',
      type: 'spline',
      data: this.FloorData,
      tooltip: {
        valueDecimals: 0
      }
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




  }

  ngOnInit() {
    // let PolicyID: any = "b79326622709326dba287d503c42ae9d6530af494634880086dae419";
    // this.getProjectDetails(this.PolicyID);


    // this.ApplicationServiceObject.GetProjectDetailsBYPolicyID(this.PolicyID).subscribe(data => {
    //   this.ProjectDetails = data;

    //   this.chartOptions2.title = {
    //     text: this.ProjectDetails.collection.collection_name
    //   };


    // });
    interval(1000).subscribe(() => {
      if (this.LastPolicyID !== this.PolicyID) {
        this.LastPolicyID = this.PolicyID;
        this.FloorData = [];
        this.chartOptions2.series[0] = {
          type: 'scatter',
          data: this.FloorData
        }

      }
      if (this.PolicyID !== "") {
        this.getProjectDetails(this.PolicyID);
      }
      this.updateFlag = true;
    });

  }

  ngOnchange() {

  }


  getProjectDetails(PolicyID) {
    this.ApplicationServiceObject.GetListedByPolicyID(PolicyID).subscribe(data => {
      this.ProjectDetails = data;

      let ListedCnt = _.size(this.ProjectDetails.tokens);
      let DataBuilder = [];
      DataBuilder.push(new Date().getTime());
      DataBuilder.push(ListedCnt);

      this.FloorData.push(DataBuilder);

      // this.chartOptions2.yAxis[0].tickInterval = Math.round(30);

      this.chartOptions2.series[0] = {
        type: 'spline',
        data: this.FloorData
      }

      this.updateFlag = true;
    });
  }


}
