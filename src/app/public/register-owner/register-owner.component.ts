import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormService } from '../../services/form.service';
import { PhoneInputComponent } from '../../components/phone-input/phone-input.component';
import { DateInputComponent } from '../../components/date-input/date-input.component';
import { RadioInputComponent } from '../../components/radio-input/radio-input.component';
import { FormComponent } from '../../components/form/form.component';
import { RegisterService } from '../register.service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-owner',
  standalone: true,
  imports: [
    FormComponent,
    ReactiveFormsModule,
    PhoneInputComponent,
    DateInputComponent,
    RadioInputComponent,
  ],
  templateUrl: './register-owner.component.html',
  styleUrl: './register-owner.component.scss',
})
export class RegisterOwnerComponent {
  private _registerSVC = inject(RegisterService)
  private _routerSVC = inject(Router)
  isHiddenGeneralInformationUser: boolean = false;
  isHiddenGeneralInformationBusiness: boolean = false;
  public optionsTypeBusiness = [
    {
      text: 'Servicio',
      image:
        'https://e7.pngegg.com/pngimages/676/919/png-clipart-computer-icons-service-icon-service-desktop-wallpaper.png',
      value: 'servicio',
    },
    {
      text: 'Producto',
      image: 'https://cdn-icons-png.flaticon.com/512/1170/1170679.png',
      value: 'producto',
    },
    {
      text: 'Ambos',
      image: 'https://cdn-icons-png.flaticon.com/512/50/50849.png',
      value: 'ambos',
    },
  ];


  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    fecha_nacimiento: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    businessName: new FormControl('', Validators.required),
    typeBusiness: new FormControl('', Validators.required),
  });

  businessTypes = [
    { name: 'Ropa y Accesorios', icon: 'fa fa-tshirt' },
    { name: 'Electrónica', icon: 'fa fa-tv' },
    { name: 'Alimentos y Bebidas', icon: 'fa fa-utensils' },
    { name: 'Juguetes', icon: 'fa fa-puzzle-piece' },
    { name: 'Libros', icon: 'fa fa-book' },
    { name: 'Muebles', icon: 'fa fa-couch' },
    { name: 'Artículos Deportivos', icon: 'fa fa-football-ball' },
    { name: 'Herramientas y Equipos', icon: 'fa fa-tools' },
    { name: 'Productos de Belleza', icon: 'fa fa-magic' },
    { name: 'Instrumentos Musicales', icon: 'fa fa-guitar' },
    { name: 'Joyería', icon: 'fa fa-ring' },
    { name: 'Artículos para el Hogar', icon: 'fa fa-home' },
    { name: 'Jardinería', icon: 'fa fa-seedling' },
    { name: 'Mascotas y Accesorios', icon: 'fa fa-paw' },
    { name: 'Productos de Oficina', icon: 'fa fa-briefcase' },
    { name: 'Vehículos y Accesorios', icon: 'fa fa-car' },
  ];

  onChangePhone(event: any) {
    this.form.controls['phone'].setValue(`${event.code} ${event.number}`)
  }
 /*  onChangeDate(event: Event) {
    console.log('datos recibidos:', event);
  } */
  changeTipoNegocio(event: string) {
    this.form.controls['typeBusiness'].setValue(event)
  }

  onSubmit() {
    if(!this.form.controls['email'].value || !this.form.controls['name'].value || !this.form.controls['last_name'].value
      || !this.form.controls['businessName'].value || !this.form.controls['typeBusiness'].value || !this.form.controls['phone'].value 
    ){
      this.form.markAllAsTouched()
      return;
    }
    console.log("llego aqui")
    const item = {
      email: this.form.controls['email'].value || '',
      name: this.form.controls['name'].value || '',
      last_name: this.form.controls['last_name'].value || '',
      bussinessName: this.form.controls['businessName'].value || '',
      typeBusiness: this.form.controls['typeBusiness'].value || '',
      phone: this.form.controls['phone'].value || '',
    };
    this._registerSVC.createNewOwner(item).subscribe(
      (response: any) => {
       this._routerSVC.navigateByUrl("/owner/register/end")
      },
      (error: any) => {
        console.error('Error al registrar el usuario', error);
      }
    );
  }
}
