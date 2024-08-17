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
import { InvitationService } from '../../services/invitation.service';

@Component({
  selector: 'view-invitation',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './view-invitation.component.html',
  styleUrl: './view-invitation.component.scss',
})
export class ViewInvitationComponent {
  public hostNameBackend: string = environment.backendHost;
  form = new FormGroup({
    banner_name: new FormControl('', Validators.required),
    banner_slogan: new FormControl('', Validators.required),
  });
  public source!: any;
  fileName: string = '';
  selectedFile: File | null = null;
  readonly dialog = inject(MatDialog);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private thisDialogRef: MatDialogRef<ViewInvitationComponent>,
    private invitationSVC: InvitationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    if (this.data._id) {
      console.log('ID:', this.data._id);
      this.invitationSVC.getById(this.data._id).subscribe((itemdata: any) => {
        this.source = itemdata;
        this.form.controls.banner_name.setValue(this.source.banner_name);
        this.form.controls.banner_slogan.setValue(this.source.banner_slogan);
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
      formData.append('banner_name', this.form.controls.banner_name.value || '');
      formData.append('banner_slogan', this.form.controls.banner_slogan.value || '');
      if (this.selectedFile) {
        formData.append('banner_background', this.selectedFile, this.selectedFile.name);
      }

      this.invitationSVC.update(this.data._id, formData).subscribe(
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
      formData.append('banner_name', this.form.controls.banner_name.value || '');
      formData.append('banner_slogan', this.form.controls.banner_slogan.value || '');
      if (this.selectedFile) {
        formData.append('banner_background', this.selectedFile, this.selectedFile.name);
      }

      this.invitationSVC.create(formData).subscribe(
        (response: any) => {
          Swal.fire('Invitacion creada con éxito', '', 'success');
          this.form.reset();
          this.loadingService.hide();
          this.thisDialogRef.close();
        },
        (error: any) => {
          this.loadingService.hide();
          console.error('Error al crear la invitacion', error);
        }
      );
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile?.name || '';
  }
}
