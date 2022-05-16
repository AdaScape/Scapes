import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { HttpResponseClass } from '../../classes/HttpResponseClass';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClient: HttpClient) { }



  public GetProjectDetailsBYPolicyID(PolicyID: any) {
    let ProjectDetails: any = {};

    ProjectDetails = this.httpClient.get<any>("https://api.cnftpredator.tools/tools/collections/"+PolicyID+"?page=1&perPage=0");

    return ProjectDetails;

  }

  public GetJPGFloorByPolicyID(PolicyID:any){


    let ProjectDetails: any = {};

    ProjectDetails = this.httpClient.get<any>(" https://server.jpgstoreapis.com/collection/"+PolicyID+"/floor");

    return ProjectDetails;
  }

  public GetListedByPolicyID(PolicyID:any){


    let ProjectDetails: any = {};

    ProjectDetails = this.httpClient.get<any>("https://server.jpgstoreapis.com/search/tokens?policyIds=[%22"+PolicyID+"%22]&saleType=buy-now&sortBy=price-low-to-high&traits=%7B%7D&nameQuery=&verified=default&pagination=%7B%7D&size=10000");

    return ProjectDetails;
  } 
  
  public GetTransactionByPolicyID(PolicyID:any){


    let ProjectDetails: any = {};

    ProjectDetails = this.httpClient.get<any>("https://server.jpgstoreapis.com/collection/"+PolicyID+"/transactions?page=1&count=100");

    return ProjectDetails;
  }
}
