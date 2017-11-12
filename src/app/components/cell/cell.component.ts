import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'cell',
  templateUrl: './cell.html',
  styleUrls: ['./cell.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CellComponent implements OnInit {

  @Input() state: string;
  @Input() winner: boolean;

  constructor() {}

  ngOnInit() {

  }

}
