import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { superAdminHomeComponent } from './superadmin/pages/home/home.component';
import { superAdminGuard } from './superadmin/guards/superadmin.guard';
import { RegisterOwnerComponent } from './public/register-owner/register-owner.component';
import { Step1EndComponent } from './public/step1-end/step1-end.component';

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
        path: "owner/register",
        component: RegisterOwnerComponent
    },
    {
        path: "owner/register/end",
        component: Step1EndComponent
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
