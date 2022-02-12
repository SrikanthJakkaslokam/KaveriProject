import { Component, OnInit } from '@angular/core';
import { MarketvaluationService } from '../../services/marketvaluation.service';

@Component({
  selector: 'app-agricultural-non-agricultural',
  templateUrl: './agricultural-non-agricultural.component.html',
  styleUrls: ['./agricultural-non-agricultural.component.scss']
})
export class AgriculturalNonAgriculturalComponent implements OnInit {
  loggedinUser: string = "";
  PropertyTypeid :any;
  TotalProperty :any ;
  errorMessage: any;
  refpropertytyperequest:any = {
    "refrenceparentpropertyid":0
  }
  constructor( private marketvaluationService : MarketvaluationService) { }

  ngOnInit(): void {
    this.loggedinUser = localStorage.getItem('loggedinuser');
    this.GetPropertytypes();
  }
  GetPropertytypes(){
   
    this.marketvaluationService.GetPropertyTypes(this.refpropertytyperequest).subscribe(
      (data: any) => {
        if(data.length != 0) {
           this.TotalProperty = data;
           localStorage.setItem('PropertyDetails',this.TotalProperty);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  onclickAgricultural(){
    this.TotalProperty.forEach(element => {
      if(element.propertytypename == "Agriculture"){
        this.PropertyTypeid = element.propertytypeid
        localStorage.setItem("PropertyTypeid", this.PropertyTypeid);
        localStorage.setItem("PropertyType", element.propertytypename);
      }

    });
   
 
  }
  onclickNonAgricultural(){
    this.TotalProperty.forEach(element => {
      if(element.propertytypename == "Non Agriculture"){
        this.PropertyTypeid = element.propertytypeid
        localStorage.setItem("PropertyTypeid", this.PropertyTypeid);
        localStorage.setItem("PropertyType", element.propertytypename);
      }
    });

  }
}
