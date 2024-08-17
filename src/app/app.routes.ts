import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { superAdminHomeComponent } from './superadmin/pages/home/home.component';
import { superAdminGuard } from './superadmin/guards/superadmin.guard';
import { RegisterOwnerComponent } from './public/register-owner/register-owner.component';
import { Step1EndComponent } from './public/step1-end/step1-end.component';
import { RegisterStepOneComponent } from './owner/register/step-one/step-one.component';
import { RegisterStepTwoComponent } from './owner/register/step-two/step-two.component';
import { ProductsComponent } from './product/products.component';
import { ProductViewComponent } from './product/product-view/product-view.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { categoryComponent } from './category/category.component';
import { InvitationComponent } from './invitation/invitation.component';

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
        path: "superAdmin/products",
        component: ProductsComponent,
        canActivate: [superAdminGuard]
    },
    {
        path: "superAdmin/product/view",
        component: ProductViewComponent,
        canActivate: [superAdminGuard]
    },
    {
        path: "superAdmin/subcategory",
        component: SubcategoryComponent,
        canActivate: [superAdminGuard]
    },
    {
        path: "superAdmin/category",
        component: categoryComponent,
        canActivate: [superAdminGuard]
    },
    {
        path: "invitations",
        component: InvitationComponent,
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
