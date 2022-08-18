import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-passive-stat',
  templateUrl: './passive-stat.component.html',
  styleUrls: ['./passive-stat.component.scss'],
})
export class PassiveStatComponent implements OnInit {
  @Input() title: string;
  @Input() score: string | number;

  constructor() { }

  ngOnInit() {}

}
