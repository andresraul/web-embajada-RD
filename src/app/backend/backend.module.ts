import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



// Rutas
import { BACKEND_ROUTES } from './backend.routes';


// Componentes
import { LoginComponent } from './components/login/login.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';

// Servicios
import { LoginService } from './services/login.service';
import { UsersComponent } from './components/control-panel/children/users/users.component';
import { PostsComponent } from './components/control-panel/children/posts/posts.component';
import { AsideControlPanelComponent } from './components/aside-control-panel/aside-control-panel.component';
import { SettingsComponent } from './components/control-panel/children/settings/settings.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { PublishComponent } from './components/publish/publish.component';


// Quill
import { QuillModule } from 'ngx-quill';
import { PublicacionComponent } from './components/publicacion/publicacion.component';

// pipes
import { ImagesPostsPipe } from './pipes/images-posts.pipe';
import { UserComponent } from './components/control-panel/children/user/user.component';
import { ListComponent } from './components/control-panel/children/list/list.component';






@NgModule({
  declarations: [
    LoginComponent,
    ControlPanelComponent,
    UsersComponent,
    PostsComponent,
    AsideControlPanelComponent,
    SettingsComponent,
    ConfirmacionComponent,
    PublishComponent,
    PublicacionComponent,
    ImagesPostsPipe,
    UserComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    BACKEND_ROUTES,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  providers: [
    LoginService
  ]
})
export class BackendModule { }
