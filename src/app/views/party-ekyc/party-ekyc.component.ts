import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document-details/document.service';
import { Storage } from '../../shared/utils/storage';

@Component({
  selector: 'app-party-ekyc',
  templateUrl: './party-ekyc.component.html',
  styleUrls: ['./party-ekyc.component.scss']
})
export class PartyEkycComponent implements OnInit {
  DepartmentUser: string;
  DepartmentUserDesignation: string;
  errorMessage: string;

  partyInfos: any = [];
  filteredPartyInfos: any = [];
  filterargs: any = {};
  webcam;
  img;
  partyType: any = 'null';
  partyName: any = 'null';
  selectedParty: any = {};
  pendingRegNumberData: any = {};
  SelectedPartyData: any = {};
  mode: any = 'capture';
  tMode = 'capture';
  message: any;
  type: any;
  fingerName: any = null;
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
  isRDSServiceRunning: boolean = false;
  capturedImage: string = "";
  successpopupVisible:boolean = false;
  constructor( private documentService: DocumentService) { }

  ngOnInit(): void {
    this.DepartmentUser = localStorage.getItem("deptUser");
    this.DepartmentUserDesignation = localStorage.getItem("deptUserDesignation");
    this.SelectedPartyData = Storage.getLocalItem('SelectedParty');

  }
  captureThumb() {
  }
  showSuccessPopUp() {
  this.successpopupVisible = true;
  }
}
