import { Routes, RouterModule, CanActivate } from '@angular/router';



// componentes
import { LoginComponent } from './components/login/login.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { AuthGuardGuard as AuthGuard } from './auth/auth-guard.guard';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';



// Children
import { CHILDREN_ROUTES } from './components/control-panel/children/control-panel-children.routes';




export const BackendRoutes: Routes = [
         { path: 'login', component: LoginComponent },
         { path: 'panel-de-control', component: ControlPanelComponent, children: CHILDREN_ROUTES, canActivate: [AuthGuard] },
         {path: 'confirmacion/:token', component: ConfirmacionComponent}
       ];

export const BACKEND_ROUTES = RouterModule.forRoot ( BackendRoutes );
