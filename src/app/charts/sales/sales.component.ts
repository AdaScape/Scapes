import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationService } from 'app/services/Application/application.service';
import * as Highcharts from "highcharts/highstock";
import { interval } from 'rxjs/internal/observable/interval';
import * as _ from 'underscore';
import moment from 'moment';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {


  @Input() PolicyID = '';
 
  Highcharts3: typeof Highcharts = Highcharts;

  FloorData: any[] = [];
  updateFlag: boolean = false;

  LastPolicyID: any = "";
  chartOptions3: Highcharts.Options = {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: '100 Recently Sold (Heatmap)'
    },
    // subtitle: {
    //   text: 'Source: Heinz  2003'
    // },
    rangeSelector: {
      enabled: false
    },
    navigator: {
      enabled: false
    },
    scrollbar: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date'
      },
      labels: {
        format: '{value:%Y-%m-%d}',

        enabled: true,
        //rotation: 45, 
        align: 'left',
        // formatter: function () {
        //   //return Highcharts.dateFormat('%H:%M %p<br>%m-%d %a', this.value);
        //   return Highcharts.dateFormat('%H:%M<br>%b-%d-%y', this.value);
        // }
      },

    },
    yAxis: {

      title: {
        text: 'Price'
      }
    },
    credits: {
      enabled: false
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 100,
      y: 70,
      floating: true,
      backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
      borderWidth: 1
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 5,
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)'
            }
          }
        },
        // states: {
        //   hover: {
        //     marker: {
        //       enabled: false
        //     }
        //   }
        // },

        // tooltip: {
        //   headerFormat: '<br>',
        //   pointFormat: 'Date: {point.x} <br/> Price: {point.y}',

        // }
      }
    },
    tooltip: {
      formatter() {
        return `<B>Date</b>: ${moment(this.x).format('MM/DD/YYYY HH:mm:ss')} <br/>
        <B>Price</b>: ${this.y}`
      },
    },
    series: [{
      type: 'scatter',
      name: 'Price',
      color: 'rgb(101 179 93 / 75%)',
      data: this.FloorData
    }]
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

    interval(2000).subscribe(() => {
      if(this.LastPolicyID !== this.PolicyID){
        this.LastPolicyID =  this.PolicyID;
        this.FloorData = [];
        this.chartOptions3.series[0] = {
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
    this.ApplicationServiceObject.GetTransactionByPolicyID(PolicyID).subscribe(data => {
      this.ProjectDetails = data;


  

      let ListedCnt = _.size(this.ProjectDetails);
      let DataBuilder = [];

      this.ProjectDetails.transactions.forEach(item => {
        let InitialData = [];
        InitialData.push(new Date(item.created_at).getTime());
        InitialData.push(item.amount_lovelace / 1000000);


        DataBuilder.push(InitialData);
      });



      this.FloorData = DataBuilder;



      // this.chartOptions3.yAxis[0].tickInterval = Math.round(30);

      this.chartOptions3.series[0] = {
        type: 'scatter',
        data: this.FloorData
      }

      this.updateFlag = true;
    });
  }


}
