import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cc-document-details-blockchain-key',
  templateUrl: './cc-document-details-blockchain-key.component.html',
  styleUrls: ['./cc-document-details-blockchain-key.component.scss']
})
export class CcDocumentDetailsBlockchainKeyComponent implements OnInit {

  loggedinUser: string = "";
  errorMessage: string = "";

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.loggedinUser = localStorage.getItem('loggedinuser');
  }
  gotToCCSearch(){
    this.router.navigate(['/cc-search']);
  }

}
