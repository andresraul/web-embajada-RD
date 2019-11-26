import { Routes, CanActivate } from '@angular/router';

// Components
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';

// Guard
import { RoleGuard } from '../../../auth/role-guard.guard';

// Children
import { PublishComponent } from '../../publish/publish.component';
import { PublicacionComponent } from '../../publicacion/publicacion.component';
import { UserComponent } from './user/user.component';





export const CHILDREN_ROUTES: Routes = [
    {path: 'publicaciones', component: PostsComponent},
    {path: 'publicaciones/publicar/:from', component: PublishComponent},
    {path: 'publicaciones/publicacion/:id', component: PublicacionComponent},
    {path: 'usuarios',
    component: UsersComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRole: 'ADMIN_ROLE'
      }
    },
    {path: 'usuarios/usuario/:from', component: UserComponent},
    {path: 'config', component: SettingsComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'publicaciones'}
];
