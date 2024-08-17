import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {

  @Input() totalPages!:[];
  @Input() currentPage!:number;

  @Output() change = new EventEmitter();
  
  ngOnInit(): void {
  }

  changePage(page:number){
    if (page !== 0 && page <= this.totalPages.length) {
      const pageFinal = page.toString();
      this.change.emit(pageFinal)
    } else {
      console.log("Página no válida");
    }
  }

}
