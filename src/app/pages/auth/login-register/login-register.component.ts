import { CommonModule } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'

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

    constructor(private http: HttpClient) {}

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
                        // Store token in localStorage
                        localStorage.setItem('auth_token', res.token)
                        this.successMessage = 'Login successful!'
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
                        // Store token in localStorage
                        localStorage.setItem('auth_token', res.token)
                        this.successMessage = 'Registration successful!'
                    },
                    error: (err) => {
                        this.errorMessage = err.error?.message || 'Registration failed.'
                    },
                })
        }
    }
}
