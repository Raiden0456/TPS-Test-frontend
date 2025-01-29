import { CommonModule } from '@angular/common'
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
    selector: 'app-schedule-admin',
    templateUrl: './schedule-admin.component.html',
    styleUrls: ['./schedule-admin.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule],
})
export class ScheduleAdminComponent implements OnInit {
    schedules: any[] = []
    days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    scheduleForm = {
        day: '',
        start_time: '',
        end_time: '',
    }
    isEditing = false
    editingScheduleId: string | null = null

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {}

    ngOnInit() {
        this.fetchSchedules()
    }

    fetchSchedules() {
        this.http.get<any[]>('/api/schedule/').subscribe((data) => {
            this.schedules = data
        })
    }

    onSubmit() {
        const token = localStorage.getItem('auth_token')
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

        if (this.isEditing) {
            this.http
                .put(`/api/schedule/update/${this.editingScheduleId}`, this.scheduleForm, { headers })
                .subscribe(() => {
                    this.fetchSchedules()
                    this.resetForm()
                })
        } else {
            this.http.post('/api/schedule/create', this.scheduleForm, { headers }).subscribe(() => {
                this.fetchSchedules()
                this.resetForm()
            })
        }
    }

    editSchedule(schedule: any) {
        this.isEditing = true
        this.editingScheduleId = schedule.uuid
        this.scheduleForm = {
            day: schedule.day,
            start_time: schedule.start_time,
            end_time: schedule.end_time,
        }
    }

    deleteSchedule(uuid: string) {
        const token = localStorage.getItem('auth_token')
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

        this.http.delete(`/api/schedule/delete/${uuid}`, { headers }).subscribe(() => {
            this.fetchSchedules()
        })
    }

    resetForm() {
        this.isEditing = false
        this.editingScheduleId = null
        this.scheduleForm = {
            day: '',
            start_time: '',
            end_time: '',
        }
    }

    goBackToLogin() {
        this.router.navigate(['/login-register'])
    }
}
