import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Storage } from '../../../../shared/utils/storage';

@Component({
  selector: 'app-doc-regd-complete',
  templateUrl: './doc-regd-complete.component.html',
  styleUrls: ['./doc-regd-complete.component.scss']
})
export class DocRegdCompleteComponent implements OnInit {
  finalRegNo: any;
  constructor(
    public modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.finalRegNo = Storage.getLocalItem('finalRegNo');
  }
  navToDeoPortal() {
    this.router.navigate(['/deo-portal']);
  }

}
