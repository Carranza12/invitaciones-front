import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private formBuilder: FormBuilder) {}

  getValidators(validators: string[]): ValidatorFn[] {
    const validatorFns = [];
    for (const validator of validators) {
      switch (validator) {
        case 'required':
          validatorFns.push(Validators.required);
          break;
        case 'email':
          validatorFns.push(Validators.email);
          break;
      }
    }
    return validatorFns;
  }
  public buildFormControls(form: any): FormGroup {
    const inputs = form.inputs;
    const group: { [key: string]: any } = {};
    inputs.forEach((input:any) => {
      if (input.type === 'email' || input.type === 'text') {
        group[input.FormControlName] = [
          '',
          this.getValidators(input.validators),
        ];
      }
    });
    return this.formBuilder.group(group);
  }
}
