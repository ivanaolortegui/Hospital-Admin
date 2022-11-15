import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dunuts',
  templateUrl: './dunuts.component.html',
  styleUrls: ['./dunuts.component.scss']
})
export class DunutsComponent {

  constructor() { }

  @Input() title: string = 'Sin titulo';

  @Input('labels') doughnutChartLabels = ['Label1', 'Label2', 'Label2'];
  @Input('data') doughnutChartData = [
    [350, 450, 100],
  ];

  public colors = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
  ];


}
