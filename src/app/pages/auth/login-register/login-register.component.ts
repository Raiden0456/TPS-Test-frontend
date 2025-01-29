import { CommonModule } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
    selector: 'app-login-register',
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule],
    templateUrl: './login-register.component.html',
})
export class LoginRegisterComponent {
    mode: 'login' | 'register' = 'login'
    email = ''
    password = ''
    name = ''

    errorMessage = ''
    successMessage = ''

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {}

    onSubmit() {
        this.errorMessage = ''
        this.successMessage = ''

        if (this.mode === 'login') {
            this.http
                .post<any>('/api/user/authenticate', {
                    email: this.email,
                    password: this.password,
                })
                .subscribe({
                    next: (res) => {
                        localStorage.setItem('auth_token', res.token)
                        this.successMessage = 'Login successful!'

                        this.http
                            .get<any>('/api/user', {
                                headers: {
                                    Authorization: `Bearer ${res.token}`,
                                },
                            })
                            .subscribe({
                                next: (userRes) => {
                                    localStorage.setItem('user_role', userRes.role)
                                    console.log('userRes', userRes)

                                    if (userRes.role === 'ADMIN') {
                                        this.router.navigate(['/admin/schedule'])
                                    } else {
                                        this.router.navigate(['/service-check'])
                                    }
                                },
                                error: (err) => {
                                    this.errorMessage = err.error?.message || 'Failed to fetch user details.'
                                },
                            })
                    },
                    error: (err) => {
                        this.errorMessage = err.error?.message || 'Login failed.'
                    },
                })
        } else {
            this.http
                .post<any>('/api/user/register', {
                    email: this.email,
                    password: this.password,
                    name: this.name,
                })
                .subscribe({
                    next: (res) => {
                        localStorage.setItem('auth_token', res.token)
                        this.successMessage = 'Registration successful!'

                        this.http
                            .get<any>('/api/user', {
                                headers: {
                                    Authorization: `Bearer ${res.token}`,
                                },
                            })
                            .subscribe({
                                next: (userRes) => {
                                    localStorage.setItem('user_role', userRes.role)
                                    console.log('userRes', userRes)

                                    if (userRes.role === 'ADMIN') {
                                        this.router.navigate(['/admin/schedule'])
                                    } else {
                                        this.router.navigate(['/service-check'])
                                    }
                                },
                                error: (err) => {
                                    this.errorMessage = err.error?.message || 'Failed to fetch user details.'
                                },
                            })
                    },
                    error: (err) => {
                        this.errorMessage = err.error?.message || 'Registration failed.'
                    },
                })
        }
    }
}
