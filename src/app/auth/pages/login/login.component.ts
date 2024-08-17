import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '../../../services/loading.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { SharedModule } from '../../../shared/shared.module';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public loginForm = this.formBuilder.group({
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show()
    const userString = localStorage.getItem('user');
    this.redirectToDashboard(userString);
    this.loadingService.hide()
  }

  public redirectToDashboard(userString: any) {
    if (userString) {
      const user = JSON.parse(userString);
      if (user.role) {
        this.router.navigateByUrl('/' + user.role+'/home');
      } else {
        this.router.navigate(['/login']);
      }
    }
  }

  onSubmit() {
    this.loadingService.show()
    if(this.loginForm.invalid){
      Swal.fire(
        'Oops...',
        'Por favor rellena los campos vacios.',
        'error'
      )
      this.loadingService.hide()
      return;
    }
  
    if (this.loginForm.valid) {
      const formData: any = this.loginForm.value;
      this.authService.login(formData).subscribe(
        (token:string) => {
          const userString = localStorage.getItem('user');
          this.redirectToDashboard(userString);
          this.loadingService.hide()
          return;
        },
        (error:any) => {
          this.loadingService.hide()
          if(error.status ===401){
            Swal.fire(
              'Oops...',
              'Las credenciales son incorrectas. Favor de hablar con un administrador.',
              'error'
            )
            this.loadingService.hide()
            return;
          }
          this.loadingService.hide()
          console.error('Error:', error);
        }
      );
    } else {
    }
  }
}
