import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlName,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormService } from '../../services/form.service';
import { PhoneInputComponent } from '../../components/phone-input/phone-input.component';
import { DateInputComponent } from '../../components/date-input/date-input.component';
import { RadioInputComponent } from '../../components/radio-input/radio-input.component';

@Component({
  selector: 'app-register-owner',
  standalone: true,
  imports: [ReactiveFormsModule,PhoneInputComponent, DateInputComponent, RadioInputComponent],
  templateUrl: './register-owner.component.html',
  styleUrl: './register-owner.component.scss',
})
export class RegisterOwnerComponent implements OnInit {
  _formSVC = inject(FormService);

  public form!: any;


  options = [
    { text: 'Servicio', image: 'https://e7.pngegg.com/pngimages/676/919/png-clipart-computer-icons-service-icon-service-desktop-wallpaper.png', value: 'servicio' },
    { text: 'Producto', image: 'https://cdn-icons-png.flaticon.com/512/1170/1170679.png', value: 'producto' }
  ];

  public businessName: FormControl = new FormControl('', Validators.required)
  public inputs = [
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
      type: 'email',
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
  ];

  ngOnInit(): void {
    this.form = this._formSVC.buildFormControls(this.inputs);
    console.log('FORM GENERADO:', this.form);
  }

  onSubmit() {}

  onChangePhone(event:Event){
    console.log("datos recibidos:", event)
  }
  onChangeDate(event:Event){
    console.log("datos recibidos:", event)
  }
  changeTipoNegocio(event:Event){
    console.log("datos recibidos:", event)
  }
 
}
