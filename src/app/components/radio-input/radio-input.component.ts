import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'radio-input',
  standalone: true,
  imports: [],
  templateUrl: './radio-input.component.html',
  styleUrl: './radio-input.component.scss',
})
export class RadioInputComponent {
  @Input() options!: any;
  @Input() label!: string;
  @Output() changeOption = new EventEmitter<any>();
  public selectedOption = '';
  selectOption(value: any) {
    console.log("click...")
    this.selectedOption = value;
    this.changeOption.emit(value)
  }
}
