import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'date-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.scss',
})
export class DateInputComponent {
  @Output() dateSelected = new EventEmitter<any>();
  @Input() data: any = {};
  selectedDay: number = 1;
  selectedMonth: number = 1;
  selectedYear: number = new Date().getFullYear();

  daysInMonthArray: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  monthsArray: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  yearsArray: number[] = Array.from(
    { length: 100 },
    (_, i) => this.selectedYear - i
  );

  daysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }

  onDayChange(event: any) {
    const day = event.target.value;
    this.selectedDay = day;
    this.emitDate();
  }

  onMonthChange(event: any) {
    const month = event.target.value;
    this.selectedMonth = month;
    this.emitDate();
  }

  onYearChange(event: any) {
    const year = event.target.value;
    this.selectedYear = year;
    this.emitDate();
  }

  emitDate() {
    const date = new Date(
      this.selectedYear,
      this.selectedMonth - 1,
      this.selectedDay
    );
    console.log(this.data )
    this.dateSelected.emit({ formControlName: this.data.formControlName, value: date });
  }
}
