import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { superAdminHomeComponent } from './superadmin/pages/home/home.component';
import { superAdminGuard } from './superadmin/guards/superadmin.guard';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "superAdmin/home",
        component: superAdminHomeComponent,
        canActivate: [superAdminGuard]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
