import { Component, Inject, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalCloseConfirmComponent } from '../../components/modal-close-confirm/modal-close-confirm.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { LoadingService } from '../../services/loading.service';
import { environment } from '../../../environment';
import { categoryService } from '../../services/category.service';

@Component({
  selector: 'app-view-category',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.scss',
})
export class ViewCategoryComponent {
  public hostNameBackend: string = environment.backendHost;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });
  public source!: any;

  readonly dialog = inject(MatDialog);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private thisDialogRef: MatDialogRef<ViewCategoryComponent>,
    private categorySVC: categoryService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    if (this.data._id) {
      this.categorySVC.getById(this.data._id).subscribe((itemdata: any) => {
        this.source = itemdata;
        this.form.controls.name.setValue(this.source.name);
        this.form.controls.status.setValue(this.source.status);
        this.source.image = this.hostNameBackend + '/' + this.source.image;
      });
    }
  }

  cancelDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(ModalCloseConfirmComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'si') {
        this.thisDialogRef.close();
      }
    });
  }

  onSubmit(): void {
    this.loadingService.show();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.loadingService.hide();
      return;
    }
    if (this.data._id) {
      this.categorySVC.update(this.data._id, this.form.value).subscribe(
        (response: any) => {
          Swal.fire('Categoría actualizada con éxito', '', 'success');
          this.form.reset();
          this.loadingService.hide();
          this.thisDialogRef.close();
        },
        (error: any) => {
          this.loadingService.hide();
          console.error('Error al editar la Categoría', error);
        }
      );
    } else {
           this.categorySVC.create(this.form.value).subscribe(
        (response: any) => {
          Swal.fire('Categoría creada con éxito', '', 'success');
          this.form.reset();
          this.loadingService.hide();
          this.thisDialogRef.close();
        },
        (error: any) => {
          this.loadingService.hide();
          console.error('Error al crear la Categoría', error);
        }
      );
    }
  }
}
