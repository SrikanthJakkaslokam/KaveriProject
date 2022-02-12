import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kaveri-blockchain-key',
  templateUrl: './kaveri-blockchain-key.component.html',
  styleUrls: ['./kaveri-blockchain-key.component.scss']
})
export class KaveriBlockchainKeyComponent implements OnInit {
  loggedinUser: string = "";
  cardNo: string = "";
  bcID: string = "";
  submitted = false;
  f: any[];
  kaveriblockchainKeyForm = new FormGroup({
    cardNo: new FormControl("", Validators.required),
    blockchainID: new FormControl("", Validators.required)
  });
  constructor() { }

  ngOnInit() {
    this.loggedinUser = localStorage.getItem('loggedinuser');
  }

}
