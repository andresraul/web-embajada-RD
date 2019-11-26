import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from './services/scripts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web-embajada-frontend';

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) {}

  ngOnInit() {
    // Llamo la función loadScripts() con los scripts que quiero cargar
    this.loadScripts();
  }

  private loadScripts() {
    this.dynamicScriptLoader
      .load('uswds')
      .then(data => {
        // Scripts cargados satisfactoriamente!
      })
      .catch(error => console.log(error));
  }

}
