import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-upload-all-documents',
  templateUrl: './upload-all-documents.component.html',
  styleUrls: ['./upload-all-documents.component.scss']
})
export class UploadAllDocumentsComponent implements OnInit {

  constructor(
    public modalService: BsModalService
  ) { }

  ngOnInit(): void {
  }

}
