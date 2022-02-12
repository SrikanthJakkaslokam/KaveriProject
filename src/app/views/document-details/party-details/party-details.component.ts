import { Component, OnInit } from "@angular/core";
import Webcam from "webcam-easy";
import { DocumentService } from '../document.service';
import { Storage } from '../../../shared/utils/storage';
import notify from "devextreme/ui/notify";

@Component({
  selector: "app-party-details",
  templateUrl: "./party-details.component.html",
  styleUrls: ["./party-details.component.scss"],
})
export class PartyDetailsComponent implements OnInit  {
  partyInfos: any = [];
  filteredPartyInfos: any = [];
  filterargs: any = {};
  webcam;
  img;
  partyType: any = 'null';
  partyName: any = 'null';
  selectedParty: any = {};
  pendingRegNumberData: any = {};
  mode: any = 'capture';
  tMode = 'capture';
  message: any;
  type: any;
  fingerName: any = null;
  isactive: boolean = true;
  fingers: any = ['Left Thumb', 'Right Thumb', 'Left Index', 'Right Index', 'Left Middle', 'Right Middle', 
    'Left Ring', 'Right Ring', 'Left Small', 'Right Small'];
  fingerMappings: any = {
    'Left Thumb': 1,
    'Right Thumb': 2,
    'Left Index': 3,
    'Right Index': 4,
    'Left Middle': 5,
    'Right Middle': 6,
    'Left Ring': 7,
    'Right Ring': 8,
    'Left Small': 9,
    'Right Small': 10
  };
  fingerMappings2: any = {
    1: 'Left Thumb',
    2: 'Right Thumb',
    3: 'Left Index',
    4: 'Right Index',
    5: 'Left Middle',
    6: 'Right Middle',
    7: 'Left Ring',
    8: 'Right Ring',
    9: 'Left Small',
    10: 'Right Small'
  };
  constructor(
    private documentService: DocumentService
  ) {}

  isRDSServiceRunning: boolean = false;
  capturedImage: string = "";
  ngOnInit(): void {
    // this.pendingRegNumberData = Storage.getLocalItem('pendingRegNoData');
    this.fetchPendingRegNumberDataAsync();
    this.getPartyInfoDetails();
  }
  fetchPendingRegNumberDataAsync() {
    this.documentService.fetchPendingRegNumberDataAsync({
      applicationnumber: Storage.getLocalItem('applicationNo'),
      sroCode: localStorage.getItem("deptSroCode")
    }).subscribe(res => {
      if (res && res['body'].responseCode === 1000) {
        this.pendingRegNumberData = res['body'];
        Storage.setLocalItem('pendingRegNoData', res['body']);
      }
    });
  }
  GetMFS100Client() {
    this.documentService.TestMethod("").subscribe(
      (data: any) => {
        this.isRDSServiceRunning = true;
        this.CaptureFinger("", "");
      }
    )
  }

  CaptureFinger(quality: any, timeout: any) {
    if (!this.isRDSServiceRunning) {
      return;
    }
    var MFS100Request = {
      "Quality": quality,
      "TimeOut": timeout
    };
    var jsondata = JSON.stringify(MFS100Request);
    this.documentService.PostMFS100Data("", "").subscribe(
      (data: any) => {
        this.capturedImage = "data:image/bmp;base64," + data.BitmapData;
      }
    )
  }
  ngAfterViewInit() {
  }
  getPartyInfoDetails() {
    const req = {applicationnumber: Storage.getLocalItem('applicationNo')};
    this.documentService.getPartyInfoDetails(req).subscribe((res: any) => {
      if (res.status === 200 && res.body && res.body.length) {
        this.partyInfos = res.body;
        this.documentService.getWitnessInfoDetails(req).subscribe((res: any) => {
          if (res.status === 200 && res.body && res.body.length) {
            this.partyInfos = [...this.partyInfos, ...res.body];
          }
        });
      }
    });
  }
  showCapture() {
    const webcamElement = document.getElementById("webcam");
    const canvasElement = document.getElementById("canvas");
    // const snapSoundElement = document.getElementById("snapSound");
    if (webcamElement && canvasElement) {
      this.webcam = new Webcam(webcamElement, "user", canvasElement, // snapSoundElement
      );
      this.webcam.start();
    }
  }
  onPartyTypeChange() {
    this.partyName = 'null';
    this.selectedParty = {};
    this.fingerName = null;
    this.img = undefined;
    if (this.partyType && this.partyType !== 'Witness') {
      if (this.partyType === 'Presenter') {
        this.filteredPartyInfos = this.partyInfos.filter(party => party.ispresenter === true);
      } else {
        this.filteredPartyInfos = this.partyInfos.filter(party => party.descriptioninenglish === this.partyType);
      }
    } else if (this.partyType) {
      this.filteredPartyInfos = this.partyInfos.filter(party => party.partytypename === 'Consenting Witness');
    }
  }
 
  onPartyNameChange() {
    
    if (this.partyName && this.partyName !== 'null') {
        this.isactive = false;
      this.selectedParty = this.filteredPartyInfos.find(party => party.partyid == this.partyName);
      Storage.setLocalItem('SelectedParty', JSON.stringify(this.selectedParty));
      console.log(this.selectedParty)
      if (this.partyType !== 'Witness') {
        this.retrieveImageDataAsync(this.selectedParty.partyid);
      } else {
        if (this.webcam) {
          this.mode = 'capture';
          this.webcam.stop();
        }
        this.tMode = 'capture';
        this.capturedImage = null;
        this.fingerName = null;
      }
    } else {
      this.img = undefined;
      this.capturedImage = undefined;
      this.fingerName = null;
      this.selectedParty = {};
    }
  }

  captureThumb() {
    this.tMode = 'reCapture';
    this.GetMFS100Client();
  }

  recaptureThumb() {
    this.tMode = 'reCapture';
    this.capturedImage = '';
    this.fingerName = null;
    this.GetMFS100Client();
  }
  captureImg() {
    this.img = this.webcam.snap();
    document.getElementById('webcam').style.display = 'none';
    document.getElementById('captured-img').style.display = 'block';
    this.mode = 'reCapture';
  }
  recaptureImg() {
    document.getElementById('webcam').style.display = 'block';
    document.getElementById('captured-img').style.display = 'none';
    this.showCapture();
    this.mode = 'capture';
  }
  saveImg() {
    this.documentService.saveImageDataAsync({
      partyId: this.selectedParty.partyid ? this.selectedParty.partyid.toString() : null, 
      ImageType: 1,
      ThumbId: 0,
      Filename: 'sample.png',
      Image: this.img.split(',')[1]
    }).subscribe(res => {
      if (res && res['body']) {
        this.message = 'Saved photo successfully';
        this.type = 'success';
        this.webcam.stop();
        this.showToast();
      }
    });
  }
  saveThumb() {
    if (this.fingerName != null) {
      this.documentService.saveImageDataAsync({
        partyId: this.selectedParty.partyid ? this.selectedParty.partyid.toString() : null, 
        ImageType: 2,
        ThumbId: this.fingerMappings[this.fingerName],
        Filename: 'thumb.png',
        Image: this.capturedImage.split(',')[1]
      }).subscribe(res => {
        if (res && res['body']) {
          this.message = 'Saved thumb successfully';
          this.type = 'success';
          this.showToast();
        }
      });
    } else {
      this.message = 'Please select finger';
      this.type = 'error';
      this.showToast();
    }
  }
  retrieveImageDataAsync(partyId) {
    if (partyId) {
      this.documentService.retrieveImageDataAsync({partyId: partyId.toString()}).subscribe(res => {
        if (res && res['body']) {
          if (res['body']['photo']) {
            this.img = 'data:image/png;base64,' + res['body']['photo'];
            document.getElementById('webcam').style.display = 'none';
            document.getElementById('captured-img').style.display = 'block';
            this.mode = 'reCapture';
          } else {
            this.recaptureImg();
          }
          if (res['body']['thumb']) {
            this.capturedImage = "data:image/bmp;base64," + res['body']['thumb'];
            for (let key in this.fingerMappings) {
              if (this.fingerMappings[key] == res['body']['fingerId']) {
                this.fingerName = key;
              }
            }
            this.tMode = 'reCapture';
          } else {
            this.tMode = 'capture';
            this.fingerName = null;
            this.capturedImage = undefined;
          }
        }
      });
    }
  }
  toggleWebCamThumb() {
    if (['Presenter', 'Claimant', 'Executant'].includes(this.partyType) && this.selectedParty && this.selectedParty.partyid) {
      return true;
    } else {
      return;
    }
  }
  showToast() {
    notify({
      message: this.message,
      isVisible: true,
      displayTime: 6000,
      height: 50,
      type: this.type
    });
  }
  ngOnDestroy() {
    if (this.webcam) {
      this.webcam.stop();
    }
  }
}
