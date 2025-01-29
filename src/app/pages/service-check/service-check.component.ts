import { CommonModule } from '@angular/common'
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'app-service-check',
    templateUrl: './service-check.component.html',
    styleUrls: ['./service-check.component.css'],
    standalone: true,
    imports: [CommonModule, HttpClientModule],
})
export class ServiceCheckComponent {
    availabilityMessage: string | null = null
    availableHours: any[] = []

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {}

    checkAvailability() {
        this.availabilityMessage = null
        const token = localStorage.getItem('auth_token')
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

        this.http.get<{ isEnabled: boolean }>('/api/schedule/check', { headers }).subscribe({
            next: (res) => {
                this.availabilityMessage = res.isEnabled ? 'Service is available now.' : 'Service is not available now.'
            },
            error: (err) => {
                this.availabilityMessage = 'Failed to check availability.'
            },
        })
    }

    checkAvailableHours() {
        this.availableHours = []
        const token = localStorage.getItem('auth_token')
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

        this.http.get<any[]>('/api/schedule/', { headers }).subscribe({
            next: (res) => {
                this.availableHours = res
            },
            error: (err) => {
                this.availableHours = []
            },
        })
    }

    goBackToLogin() {
        this.router.navigate(['/login-register'])
    }
}
