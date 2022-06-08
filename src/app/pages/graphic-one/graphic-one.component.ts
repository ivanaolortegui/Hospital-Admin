import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphic-one',
  templateUrl: './graphic-one.component.html',
  styles: [
  ]
})
export class GraphicOneComponent implements OnInit {

  constructor() { }

  public labels1: string[] = ['Pan', 'Refresco', 'Tacos'];
  public data1 = [[10, 15, 40]];

  ngOnInit(): void {
  }



}
