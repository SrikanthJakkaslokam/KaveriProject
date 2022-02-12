import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-scan-document',
  templateUrl: './scan-document.component.html',
  styleUrls: ['./scan-document.component.scss']
})
export class ScanDocumentComponent implements OnInit {

  constructor(
    public modalService: BsModalService,
    private http: HttpClient
  ) { }

  img1 = [];
  img2 = [];

  initiate() {
    this.http.get('http://localhost:3000').subscribe((res) => {
      console.log(res)
    }, (er) => console.log(er))
  }

  ngOnInit(): void {
    this.initiate();
  }

}
