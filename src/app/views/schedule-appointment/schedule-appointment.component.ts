import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KaveriService } from '../../services/kaveri.service';
import { Router } from '@angular/router';
import notify from "devextreme/ui/notify";
import { DialogsComponent } from '../dialogs/dialogs.component';
// import { SwiperModule } from 'swiper/angular'
// import { IvyCarouselModule } from 'angular-responsive-carousel';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss']
  // selector: 'datepicker-inline-calendar-example',
  // templateUrl: 'datepicker-inline-calendar-example.html',
  // styleUrls: ['datepicker-inline-calendar-example.css'],
})
export class ScheduleAppointmentComponent implements OnInit {
  selected: Date | null;
  sroForm: FormGroup;
  dateForm: FormGroup;
  alert: boolean = false;
  submitted = false;
  errorMessage: string;
  loggedinUser: string = "";
  reason: string = "";
  getapptype: Array<any> = [];
  getsro: Array<any> = [];
  usertype;
  typeofappointment: string = "";
  purposeofappoinmtment: string = "";
  registaroffice: string = "";
  responce: any = [];
  appointmentDetails: any ;
  responceSRO: any = [];
  responcePurpose: any = [];
  responceUserTpye: any = [];
  responceData: any;
  // showSearch: any = false;
  getSRO: string = "";
  renAppType: any = [];
  renPurpose: any = [];
  renUser: any = [];
  renSRO: any = [];
  appointmentType: string = "";
  appointmentPurpose: string = "";
  appointmentUserType: string = "";
  appointmentOffice: string = "";
  appointmentDate: string = "";
  mytime: string = "";
  mydate: string = "";
  defaultDate: String = "";
  key: String = "AppointmentData";
  dataSet: any = [];
  slotBookedDetail:any={};
  selectedDate:any
  slotTime:any;
  userCode:any;
  isReadOnly:any=true;
  isContinue:any=true;
  slotId:any=true;
  slotSelectedTime:any;
todayDate:Date=new Date();
  timeSlots: any = [
    { isSelected: true, value: '8:00-8:30 AM' },
    { isSelected: false, value: '8:30-9:00 AM' },
    { isSelected: false, value: '9:00-9:30 AM' },
    { isSelected: false, value: '9:30-10:00 AM' },
    { isSelected: false, value: '10:00-10:30 AM' },
    { isSelected: false, value: '10:30-11:00 AM' },
    { isSelected: false, value: '11:00-11:30 PM' },
    { isSelected: false, value: '11:30-12:00 PM' },
    { isSelected: false, value: '12:00-12:30 PM' },
    { isSelected: false, value: '2:00-2:30 PM' },
    { isSelected: false, value: '2:30-3:00 PM' },
    { isSelected: false, value: '3:00-3:30 PM' },
    { isSelected: false, value: '3:30-4:00 PM' },
    { isSelected: false, value: '4:00-4:30 PM' },
    { isSelected: false, value: '5:00-5:30 PM' },
  ];
  month: string;
  date: string;
  constructor(private fb: FormBuilder, private kaveriService: KaveriService, public router: Router, public dialog: MatDialog, private datePipe: DatePipe) {
    // this.sroForm = new FormGroup({
    //   apttype: new FormControl(null),
    //   reason: new FormGroup(null),
    //   userType: new FormGroup(null),
    //   sro: new FormGroup(null)
    // })
  }
  ngOnInit(): void {
    this.loggedinUser = localStorage.getItem('loggedinuser');
    let scheduledApp= JSON.parse(localStorage.getItem("scheduledApp"));
    if(scheduledApp && scheduledApp.mydate){
      console.log("scheduledApp.mydate-->",scheduledApp.mydate);
      
      this.selected=new Date(scheduledApp.mydate);
      this.selectedDate=this.selected.toISOString();
      console.log("selectedDate-->",this.selectedDate);
      
    }
    this.isSlotBooked()
    this.submitted = false
    // this.sroForm = new FormGroup({
    //   apttype: new FormControl("", Validators.required),
    //   reason: new FormControl("", Validators.required),
    //   usertype: new FormControl("", Validators.required),
    //   sro: new FormControl("", Validators.required),
    // });
    this.dateForm = new FormGroup({
      typeofappointment: new FormControl("", Validators.required),
      purposeofappoinmtment: new FormControl("", Validators.required),
      usertype: new FormControl("", Validators.required),
      registaroffice: new FormControl("", Validators.required),
      mydate: new FormControl("", Validators.required)
    });
    let applicationData=JSON.parse(localStorage.getItem("appointmentApp"));

    this.kaveriService.getAppointmentDetails({applicationNumber:applicationData}).subscribe(data => {
      this.appointmentDetails = data
      // this.sroForm.setValue({apttype:this.appointmentDetails.appointmenttypeid})
      console.log("new appointment-->",this.appointmentDetails)
    })
    this.kaveriService.getapptype().subscribe(data => {
      this.responce = data
      // console.log(this.responce)
    })
    this.kaveriService.getsro().subscribe(data => {
      this.responceSRO = data
      // console.log("this.responceSRO-->", this.responceSRO)
    })
    this.kaveriService.purpose().subscribe(data => {
      this.responcePurpose = data
      // console.log(this.responcePurpose)
    })
    this.kaveriService.userType().subscribe(data => {
      this.responceUserTpye = data
      // console.log(this.responceUserTpye)
    })
    this.defaultDate = new Date().toLocaleDateString();

  }
  isSlotBooked(): any{
    let application={
      applicationNumber: JSON.parse(localStorage.getItem("appointmentApp"))
    }
    this.kaveriService.getSlotDetail(application).subscribe(
      (data: any) => {
        if (data.length != 0) {
          this.slotBookedDetail=data;
          console.log("slotBookedDetail-->",this.slotBookedDetail);
          if(this.slotBookedDetail && this.slotBookedDetail.slotBookingId){
            this.selectedDate=new Date(this.slotBookedDetail.slotBookedDate);
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.selectedDate=this.selectedDate.toLocaleDateString("en-US", options);
    this.slotTime=this.slotBookedDetail.slotStartTime+"-"+this.slotBookedDetail.slotEndTime;
    
          }
          // this.articleList = data;
          // console.log("this.articleList-->",this.articleList);
          
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    return
  }
  onSubmit() {
    debugger;
    this.submitted = true;
    this.alert = true;
    if (this.sroForm.invalid) {
      return;
    }
    this.getapptype = this.sroForm.get("apttype").value;
    // this.showSearch = true;
    this.reason = this.sroForm.get("reason").value
    this.usertype = this.sroForm.get("usertype").value
    this.getSRO = this.sroForm.get("sro").value
    if(localStorage.getItem("scheduledApp")){
      let scheduledApp= JSON.parse(localStorage.getItem("scheduledApp"));
      console.log("scheduledApp-->",scheduledApp);
      
      if(scheduledApp.getapptype==this.getapptype &&  scheduledApp.reason==this.reason &&  scheduledApp.usertype==this.usertype && scheduledApp.getSRO==this.getSRO){
        console.log("inside-->");
        for (let i = 0; i < this.timeSlots.length; i++) {
          
          if(this.timeSlots[i].value==scheduledApp.mytime){
            console.log("time equal");
            
            // this.timeSlots[i].isSelected = true;
          }
          
        }
      }
     }
    this.renAppType = this.responce.filter((e) => {
      return e.appointmenttypeid == this.getapptype
    })
    this.renPurpose = this.responcePurpose.filter((e) => {
      return e.serviceid == this.reason
    })
    this.renUser = this.responceUserTpye.filter((e) => {
      return e.partytypeid == this.usertype
    })
    this.renSRO = this.responceSRO.filter((e) => {
      return e.srocode == this.getSRO
    })
  }
  onDateChange($event):any{
    let checkedDate=new Date($event).getDate();
    let checkedMonth=new Date($event).getMonth()+1;
    let checkedYear=new Date($event).getFullYear();
    this.selectedDate=new Date($event);

    this.month= checkedMonth.toString();
    if(this.month.length == 1){
      this.month = "0"+this.month;
      checkedMonth = parseInt(this.month);

    }
    this.date= checkedDate.toString();
    if(this.date.length == 1){
      this.date = "0"+this.date;
      checkedDate = parseInt(this.date);

    }


    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.selectedDate=this.selectedDate.toLocaleDateString("en-US", options);
    // this.selected=this.selectedDate.toLocaleDateString("en-US", options);
    let application={
        "sroCode": this.appointmentDetails.srocode,
        "serviceId": this.appointmentDetails.serviceid,
        "slotDate": checkedYear+"-"+this.month+"-"+this.date
    }
    debugger;
    this.mydate=application.slotDate;
    console.log("application",application);
    
    this.kaveriService.getAvailableSlot(application).subscribe(
      (data: any) => {
        if (data && data.responseCode==1000) {
          // this.slotBookedDetail=data;
          this.slotId=data.slotId;
          // console.log("slotId-->",this.slotId);
          this.slotTime="Available slot :"+data.slotStartTime+"-"+data.slotEndTime;
          this.slotSelectedTime=data.slotStartTime+"-"+data.slotEndTime;
          // this.articleList = data;
          // console.log("this.articleList-->",this.articleList);
          this.isContinue=false;
        }else{
          this.isContinue=true;
          this.slotTime="No slot available"
        }
      }, e => {
        if (e.error) {
          this.slotTime="No slot available"
          this.isContinue=true;
          this.errorMessage = e.error.error_description;
        }
      }
    )
    
  }
  cancelAppointment():any{
    let isCancel=confirm("Are you sure want to cancel this appointment");
    // let message :any="Your appointment for "+this.slotBookedDetail.slotBookedDate+" , "+this.slotBookedDetail.slotStartTime+"-"+this.slotBookedDetail.slotEndTime+" is successfully Cancelled"
    //   localStorage.setItem("message",JSON.stringify(message))
    //   this.dialog.open(DialogsComponent);
    if(isCancel){
      let obj={
        "sltbookingid": this.slotBookedDetail.slotBookingId,
        "sltid": null,
        "sltbookedfor": null,
        "sltbookedon":null,
        "sltbookedby": null,
        "usrtypeid": null,
        "sltservicestatus": 3,
        "sltreservice": null,
        "applicationnumber": null,
        "appointmenttypeid": null,
        "srocode": null,
        "sltbookeddate":null,
        "sltbooktime": null,
        "lstupddate": null
      }
      this.kaveriService.cancelAppointment(obj).subscribe(
        (data: any) => {
          if (data) {
        // console.log("cancelRes--",data);
        let message :any="Your appointment for "+this.mydate+" , "+this.slotBookedDetail.slotStartTime+"-"+this.slotBookedDetail.slotEndTime+" is successfully Cancelled"
      localStorage.setItem("message",JSON.stringify(message))
      this.dialog.open(DialogsComponent);
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
      
    }else{
      return
    }
       
    
  }
    onUserChange($event):any{
    this.userCode=$event.target.value;
    console.log(this.userCode);
    
  }
  submitTimeForm(dated: any) {
    if(this.slotBookedDetail.sltbookingid){
      //Resedule
      let obj={
        "sltbookingid": this.slotBookedDetail.slotBookingId,
        "sltid": this.slotId,
        "sltbookedfor": 2,
        "sltbookedon": this.mydate,
        "sltbookedby": 1,
        "usrtypeid": this.userCode,
        "sltservicestatus": 2,
        "sltreservice": false,
        "applicationnumber": JSON.parse(localStorage.getItem("appointmentApp")),
        "appointmenttypeid": this.appointmentDetails.appointmenttypeid,
        "srocode": this.appointmentDetails.srocode,
        "sltbookeddate":null,
        "sltbooktime": null,
        "lstupddate": null
      }
      this.kaveriService.rescheduleAppointment(obj).subscribe(
        (data: any) => {
          if (data) {
        let message :any="Your appointment for "+this.mydate+" , "+this.slotSelectedTime+" is successfully Rescheduled.<br>Please reach the office 15 minutes early for a smooth registration experience."
      localStorage.setItem("message",JSON.stringify(message))
      this.dialog.open(DialogsComponent);
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }else{
      //Schedule
      
      let obj={
        "sltbookingid": null,
        "sltid": this.slotId,
        "sltbookedfor": 2,
        "sltbookedon": this.mydate,
        "sltbookedby": 1,
        "usrtypeid": this.userCode,
        "sltservicestatus": 1,
        "sltreservice": false,
        "applicationnumber": JSON.parse(localStorage.getItem("appointmentApp")),
        "appointmenttypeid": this.appointmentDetails.appointmenttypeid,
        "srocode": this.appointmentDetails.srocode,
        "sltbookeddate":null,
        "sltbooktime": null,
        "lstupddate": null
      }
      console.log(obj);
      this.kaveriService.ScheduleAppointment(obj).subscribe(
        (data: any) => {
          console.log(data);
          if (data) {
            let message :any="Your appointment for "+this.mydate+" , "+this.slotSelectedTime+" is successfully scheduled.<br>Please reach the office 15 minutes early for a smooth registration experience."
      localStorage.setItem("message",JSON.stringify(message))
      this.dialog.open(DialogsComponent);
        
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
    
  }
  get f() {
    return this.sroForm.controls;
  }
}
