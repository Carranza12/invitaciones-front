import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, filter, map } from 'rxjs/operators';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register-step-one',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss',
})
export class RegisterStepOneComponent implements OnInit {
  showTextHasSpaces: boolean = false ;
  showWorkspaceInvalid: boolean = false;
  public form: FormGroup = new FormGroup({
    name : new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    workspace: new FormControl('', [Validators.required]),
  });

  constructor(private _registerSVC: RegisterService, private _routerSVC: Router) {}

  ngOnInit(): void {
    this.form.controls['workspace'].valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value: string) => {
       const isHasSpaces = this.hasSpaces(value)
        if (isHasSpaces) {
          this.showTextHasSpaces = true
          return;
        } else {
          this.showTextHasSpaces = false
          this._registerSVC
            .existCompanyName(value)
            .subscribe((res: any) => {
              console.log('res:', res);
              if(res.type === 'not-found'){
                this.showWorkspaceInvalid = false;
              }else{
                this.showWorkspaceInvalid = true;
              }
            });
        }
      });
  }

  hasSpaces = (str: string) => str.split('').some((char) => char === ' ');

  onSubmit() {
    if(this.form.invalid){
      this.form.markAllAsTouched()
      return;
    }
    console.log(this.form.value);
    const { email, name, workspace } = this.form.value;
    this._routerSVC.navigateByUrl(`/owner/register/stepTwo?name=${name}&email=${email}&workspace=${workspace}`)
  }

 
}
