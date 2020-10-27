import { Component, OnInit } from '@angular/core';
import { CONFIG } from 'src/app/config/config';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  labels = CONFIG.labels.mainMenu;
}
