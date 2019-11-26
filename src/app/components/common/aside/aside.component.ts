import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from './../../../services/menu.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  asideMenuData: any;

  constructor(public asideNav: MenuService) {
    this.asideMenuData = [];
  }

  @Input() MenuId: number;

  ngOnInit() {
    this.getSideNav();
  }

  getSideNav() {
    // Obtengo items del Menu Aside
    this.asideNav.getMenuItems().subscribe(response => {
      this.asideMenuData = response;
    });
  }
}
