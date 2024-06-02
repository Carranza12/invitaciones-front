import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControlName,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-register-owner',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-owner.component.html',
  styleUrl: './register-owner.component.scss',
})
export class RegisterOwnerComponent implements OnInit {
  _formSVC = inject(FormService);

  public form!: any;

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
}
