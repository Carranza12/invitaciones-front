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
  ];
  public registerOwnerForm = {
    title: 'Registra tu negocio',
    inputs: [
      {
        label: 'Nombre completo',
        required: true,
        type: 'text',
        FormControlName: 'nombre_completo',
        autocomplete: 'off',
        validators: [
          {
            type: 'required',
            message: 'El nombre completo es obligatorio.',
          },
        ],
      },
      {
        label: 'Correo Electronico',
        required: true,
        type: 'text',
        FormControlName: 'email',
        autocomplete: 'off',
        validators: [
          {
            type: 'required',
            message: 'El Correo Electronico es obligatorio.',
          },
          {
            type: 'email',
            message: 'Introduce un email valido.',
          },
        ],
      },
      {
        label: 'Fecha de nacimiento',
        required: true,
        type: 'date-input',
        FormControlName: 'fecha_nacimiento',
        autocomplete: 'off',
        validators: [],
      },
      {
        label: 'Número de Teléfono',
        required: true,
        FormControlName: '',
        type: 'phone-input',
        autocomplete: 'off',
        validators: [],
      },
      {
        label: 'Nombre del negocio',
        required: true,
        type: 'text',
        FormControlName: 'businessName',
        autocomplete: 'off',
        validators: [
          {
            type: 'required',
            message: 'El nombre del negocio es obligatorio.',
          },
        ],
      },
      {
        label: 'Que es lo que le ofreces a tus clientes?',
        required: true,
        options: [],
        type: 'radio-input',
        FormControlName: '',
        autocomplete: 'off',
        validators: [
          {
            type: 'required',
            message: 'Este campo es obligatorio.',
          },
        ],
      },
    ],
  };

  public form = new FormGroup({
    nombre_completo: new FormControl('', Validators.required),
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

  onChangePhone(event: Event) {
    console.log('datos recibidos:', event);
  }
  onChangeDate(event: Event) {
    console.log('datos recibidos:', event);
  }
  changeTipoNegocio(event: Event) {
    console.log('datos recibidos:', event);
  }

  onSubmit() {
    const item = {
      ...this.form.value,
    };
    console.log('ITEM:', item);
  }
}
