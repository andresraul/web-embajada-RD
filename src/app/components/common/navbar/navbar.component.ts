import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { Menu } from './../../../models/menu';
import { MenuService } from './../../../services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuData: any;

  constructor(public config: ConfigService, public NavBar: MenuService) {
    this.menuData = [];
  }

  isMobile = false;
  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 992;
    console.log(w);
    if (w < breakpoint) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.getMenu();
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };
  }

  getMenu() {
    // Obtengo items del Menu de Navegación
    this.NavBar.getMenuItems().subscribe(response => {
      console.log(response);
      this.menuData = response;
    });
  }
}
