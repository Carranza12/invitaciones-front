import {
  Component,
  EventEmitter,
  Input,
  Output,
  input,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'phone-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.scss',
})
export class PhoneInputComponent {
  @Output() phone = new EventEmitter<any>();
  @Input() title!: string;
  phoneForm!: FormGroup;
  countries = [
    { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸' },
    { name: 'Argentina', code: 'AR', dialCode: '+54', flag: '🇦🇷' },
    { name: 'Bolivia', code: 'BO', dialCode: '+591', flag: '🇧🇴' },
    { name: 'Chile', code: 'CL', dialCode: '+56', flag: '🇨🇱' },
    { name: 'Colombia', code: 'CO', dialCode: '+57', flag: '🇨🇴' },
    { name: 'Costa Rica', code: 'CR', dialCode: '+506', flag: '🇨🇷' },
    { name: 'Cuba', code: 'CU', dialCode: '+53', flag: '🇨🇺' },
    { name: 'Dominican Republic', code: 'DO', dialCode: '+1', flag: '🇩🇴' },
    { name: 'Ecuador', code: 'EC', dialCode: '+593', flag: '🇪🇨' },
    { name: 'El Salvador', code: 'SV', dialCode: '+503', flag: '🇸🇻' },
    { name: 'Equatorial Guinea', code: 'GQ', dialCode: '+240', flag: '🇬🇶' },
    { name: 'Guatemala', code: 'GT', dialCode: '+502', flag: '🇬🇹' },
    { name: 'Honduras', code: 'HN', dialCode: '+504', flag: '🇭🇳' },
    { name: 'Mexico', code: 'MX', dialCode: '+52', flag: '🇲🇽' },
    { name: 'Nicaragua', code: 'NI', dialCode: '+505', flag: '🇳🇮' },
    { name: 'Panama', code: 'PA', dialCode: '+507', flag: '🇵🇦' },
    { name: 'Paraguay', code: 'PY', dialCode: '+595', flag: '🇵🇾' },
    { name: 'Peru', code: 'PE', dialCode: '+51', flag: '🇵🇪' },
    { name: 'Spain', code: 'ES', dialCode: '+34', flag: '🇪🇸' },
    { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸' },
    { name: 'Uruguay', code: 'UY', dialCode: '+598', flag: '🇺🇾' },
    { name: 'Venezuela', code: 'VE', dialCode: '+58', flag: '🇻🇪' },
  ];
  selectedDialCode = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.phoneForm = this.fb.group({
      country: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
    });

    if (this.countries.length > 0) {
      this.selectedDialCode = this.countries[0].dialCode;
      this.phoneForm.patchValue({ country: this.selectedDialCode });
    }

    this.phoneForm.controls['phone'].valueChanges.subscribe((value: string) => {
      if (value) {
        if (
          this.phoneForm.controls['country'].valid &&
          this.phoneForm.controls['phone'].valid
        ) {
          this.phone.emit({
            code: this.phoneForm.controls['country'].value || '',
            number: value,
          });
        }
      }
    });
  }

  onCountryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedDialCode = selectElement.value;
    this.phoneForm.controls['country'].setValue(this.selectedDialCode);
    if (
      this.phoneForm.controls['country'].valid &&
      this.phoneForm.controls['phone'].valid
    ) {
      this.phone.emit({
        code: this.phoneForm.controls['country'].value || '',
        number: this.phoneForm.controls['phone'].value || '',
      });
    }
  }


}
