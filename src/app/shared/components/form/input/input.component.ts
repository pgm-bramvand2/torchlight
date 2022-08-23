import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() public label: string;
  @Input() public type: string;
  @Input() public name: string;
  @Input() public placeholder?: string;
  @Input() public required?: boolean = false;
  @Input() public inputMode?: string;
  @Input() public value: string;


  constructor() { }

  ngOnInit() {}

}
