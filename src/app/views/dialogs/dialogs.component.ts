import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {
scheduledDate:any;
scheduledTime:any;
message:any=""
  constructor() { }

  ngOnInit(): void {
this.message=JSON.parse(localStorage.getItem("message"));
// let schduledData=JSON.parse(localStorage.getItem("scheduledDate"));
// if(schduledData){
//   this.scheduledDate=schduledData.date;
//   this.scheduledTime=schduledData.time;
// }
  }

}
