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
import { SubcategoryService } from '../../services/subcategory.service';
import Swal from 'sweetalert2';
import { LoadingService } from '../../services/loading.service';
import { environment } from '../../../environment';

@Component({
  selector: 'app-view-subcategory',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './view-subcategory.component.html',
  styleUrl: './view-subcategory.component.scss',
})
export class ViewSubcategoryComponent {
  public hostNameBackend: string = environment.backendHost;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });
  public source!: any;
  fileName: string = '';
  selectedFile: File | null = null;
  readonly dialog = inject(MatDialog);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private thisDialogRef: MatDialogRef<ViewSubcategoryComponent>,
    private subcategorySVC: SubcategoryService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    if (this.data._id) {
      console.log('ID:', this.data._id);
      this.subcategorySVC.getById(this.data._id).subscribe((itemdata: any) => {
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
      const formData = new FormData();
      formData.append('name', this.form.controls.name.value || '');
      formData.append('status', this.form.controls.status.value || '');
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.subcategorySVC.update(this.data._id, formData).subscribe(
        (response: any) => {
          Swal.fire('Subcategoría actualizada con éxito', '', 'success');
          this.form.reset();
          this.loadingService.hide();
          this.thisDialogRef.close();
        },
        (error: any) => {
          this.loadingService.hide();
          console.error('Error al editar la subcategoría', error);
        }
      );
    } else {
      const formData = new FormData();
      formData.append('name', this.form.controls.name.value || '');
      formData.append('status', this.form.controls.status.value || '');
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.subcategorySVC.create(formData).subscribe(
        (response: any) => {
          Swal.fire('Subcategoría creada con éxito', '', 'success');
          this.form.reset();
          this.loadingService.hide();
          this.thisDialogRef.close();
        },
        (error: any) => {
          this.loadingService.hide();
          console.error('Error al crear la subcategoría', error);
        }
      );
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile?.name || '';
  }
}
