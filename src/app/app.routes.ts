import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layout/private-layout/private-layout.component';
import { SignInComponent } from './pages/public/authentication/sign-in/sign-in.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { HomeComponent } from './pages/public/dashboard/home/home.component';
import { ContactComponent } from './pages/public/dashboard/contact/contact.component';

export const routes: Routes = [
    {
        path: 'ad-administrator',
        component: PrivateLayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./pages/private/ad-administrator/ad-administrator.module').then(m => m.AdAdministratorModule) },
        ]
    },
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'sign-in', component: SignInComponent },  
            { path: 'contact', component: ContactComponent },
        ]
    },
    {
        path:'unauthorized',
        component: UnauthorizedComponent
    },
    {
        path: '**',
        redirectTo: '/page-not-found'
    },
    {
        path:'page-not-found',
        component: PageNotFoundComponent
    }
];
