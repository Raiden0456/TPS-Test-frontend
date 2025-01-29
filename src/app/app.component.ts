import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LoginRegisterComponent } from './pages/auth/login-register/login-register.component'

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LoginRegisterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'TPS-Test-frontend'
}
