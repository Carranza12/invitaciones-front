import { Component, Input, OnInit, Output, inject } from '@angular/core';
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
  @Output() evento:any;
  public formGroup!: FormGroup;

  _formSVC = inject(FormService);
  
  ngOnInit(): void {
    this.formGroup = this._formSVC.buildFormControls(this.form)
  }

  
  

  
}
