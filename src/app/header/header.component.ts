import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public nav:HeaderService) { }

  ngOnInit(): void {
    
  }

}
