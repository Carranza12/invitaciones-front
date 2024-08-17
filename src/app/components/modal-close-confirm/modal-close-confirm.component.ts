import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatDialogRef } from '@angular/material/dialog';
import { ViewSubcategoryComponent } from '../../subcategory/view-subcategory/view-subcategory.component';

@Component({
  selector: 'app-modal-close-confirm',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './modal-close-confirm.component.html',
  styleUrl: './modal-close-confirm.component.scss'
})
export class ModalCloseConfirmComponent {


  constructor(public dialogRef: MatDialogRef<ModalCloseConfirmComponent>){}
  closeDialog(result: string): void {
    this.dialogRef.close(result);
  }

}
