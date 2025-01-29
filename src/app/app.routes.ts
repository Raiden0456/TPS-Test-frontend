import { Routes } from '@angular/router'
import { ScheduleAdminComponent } from './pages/admin/schedule-admin/schedule-admin.component'
import { LoginRegisterComponent } from './pages/auth/login-register/login-register.component'
import { ServiceCheckComponent } from './pages/service-check/service-check.component'

export const routes: Routes = [
    { path: 'login-register', component: LoginRegisterComponent },
    { path: 'admin/schedule', component: ScheduleAdminComponent },
    { path: 'service-check', component: ServiceCheckComponent },
    { path: '', redirectTo: '/login-register', pathMatch: 'full' },
    { path: '**', redirectTo: '/login-register' },
]
