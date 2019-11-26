// Módulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BackendModule } from './backend/backend.module';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

// Configuración de Rutas
import { RoutesModule } from './app.routes.module';
import { PostsModule } from './posts/posts.module';
import { PagesModule } from './pages/pages.module';

// Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';

// Servicios
import { DynamicScriptLoaderService } from './services/scripts.service';
import { ConfigService } from './services/config.service';
import { MenuService } from './services/menu.service';
import { TokenInterseptorService } from './backend/services/token-interseptor.service';

// Config Provider
export function configFactory(provider: ConfigService) {
  return () => provider.getData();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PostsModule,
    PagesModule,
    BackendModule,
    RoutesModule,
    ScrollToModule.forRoot(),
  ],

  providers: [
    DynamicScriptLoaderService,
    MenuService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterseptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
