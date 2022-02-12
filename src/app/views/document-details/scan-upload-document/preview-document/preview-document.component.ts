import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-preview-document',
  templateUrl: './preview-document.component.html',
  styleUrls: ['./preview-document.component.scss']
})
export class PreviewDocumentComponent implements OnInit {
  constructor(
    public modalService: BsModalService
  ) { }
  scannedImages = localStorage.getItem('scannedImages') ? JSON.parse(localStorage.getItem('scannedImages')) : [];

  ngOnInit(): void {
  }

}
