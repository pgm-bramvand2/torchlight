import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() public title: string;
  @Input() public color?: string = 'primary';
  @Input() public type?: string;
  @Input() public disabled?: boolean = false;
  @Input() public expand?: string;
  @Input() public fill?: string = 'solid';

  constructor() { }

  ngOnInit() {}

}
