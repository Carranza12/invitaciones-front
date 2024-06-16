import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, filter, map } from 'rxjs/operators';
import { RegisterService } from '../register.service';

@Component({
  selector: 'register-step-one',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss',
})
export class RegisterStepOneComponent implements OnInit {
  showTextHasSpaces: boolean = false ;
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    workspace: new FormControl('', [Validators.required]),
  });

  constructor(private _registerSVC: RegisterService) {}

  ngOnInit(): void {
    this.form.controls['workspace'].valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value: string) => {
       const isHasSpaces = this.hasSpaces(value)
       console.log("isHasSpaces:", isHasSpaces)
        if (isHasSpaces) {
          this.showTextHasSpaces = true
          console.log("entro aqui")
        } else {
          this.showTextHasSpaces = false
          this._registerSVC
            .existCompanyName(value)
            .subscribe((res: any) => {
              console.log('res:', res);
              if(res.type === 'not-found'){
                
              }
            });
        }
      });
  }

  hasSpaces = (str: string) => str.split('').some((char) => char === ' ');

  onSubmit() {
    console.log(this.form.value);
  }

 
}
