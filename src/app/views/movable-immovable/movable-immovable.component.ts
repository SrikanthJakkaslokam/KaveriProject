import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movable-immovable',
  templateUrl: './movable-immovable.component.html',
  styleUrls: ['./movable-immovable.component.scss']
})
export class MovableImmovableComponent implements OnInit {
  loggedinUser: string = "";
  constructor() { }

  ngOnInit() {
    this.loggedinUser = localStorage.getItem('loggedinuser');
  }

}
