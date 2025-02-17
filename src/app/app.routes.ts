import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { guardAuthGuard } from './guard-auth.guard';

export const routes: Routes = [
    {path:'', component : LoginComponent},
    {path:'login', component : LoginComponent},
    {path:'scores', loadComponent : () => import("./components/points/points.component").then(m => m.PointsComponent), canActivate: [guardAuthGuard]},
    {path:'game', loadComponent : () => import("./components/game/game.component").then(m => m.GameComponent), canActivate: [guardAuthGuard]},
    
];
