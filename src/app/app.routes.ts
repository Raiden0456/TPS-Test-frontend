import { Routes } from '@angular/router'
import { LoginRegisterComponent } from './pages/auth/login-register/login-register.component'

export const routes: Routes = [
    { path: 'login-register', component: LoginRegisterComponent },
    { path: '', redirectTo: '/login-register', pathMatch: 'full' },
    { path: '**', redirectTo: '/login-register' },
]
