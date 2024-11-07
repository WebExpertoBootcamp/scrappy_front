import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SuscriptionsComponent } from './suscriptions/suscriptions.component';
import { MysuscriptionComponent } from './mysuscription/mysuscription.component';
import { CategoryComponent } from './category/category.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'sign-in', component: LoginComponent },
    { path: 'sign-up', component: RegisterComponent },
    { path: 'suscribirse', component: SuscriptionsComponent },
    { path: 'missuscripciones', component: MysuscriptionComponent },
    { path: 'category/:id', component: CategoryComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
