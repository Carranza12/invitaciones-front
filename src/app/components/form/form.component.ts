import { Component, Input, OnInit, inject } from '@angular/core';
import { PhoneInputComponent } from '../phone-input/phone-input.component';
import { DateInputComponent } from '../date-input/date-input.component';
import { RadioInputComponent } from '../radio-input/radio-input.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [PhoneInputComponent, DateInputComponent, RadioInputComponent, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{
  @Input() form:any; 
  public formGroup!: FormGroup;

  _formSVC = inject(FormService);
  
  ngOnInit(): void {
    console.log("form:", this.form)
    this.formGroup = this._formSVC.buildFormControls(this.form)
    console.log(" this.formGroup :",  this.formGroup.value )
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
