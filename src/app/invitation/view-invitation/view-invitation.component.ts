import { Component, Inject, inject, ViewChild } from '@angular/core';
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
import { debounceTime } from 'rxjs';

@Component({
  selector: 'view-invitation',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './view-invitation.component.html',
  styleUrl: './view-invitation.component.scss',
})
export class ViewInvitationComponent {
  public hostNameBackend: string = environment.backendHost;
  public where_event_date_labeL = "";
  public where_date_label = "25 de noviembre"
  public where_start_time_label = "21:00"
  public where_end_time_label = "05:00"
  public where_address_list_options: string[] = [];
  public where_address_options: string[] = ["uno", "dos","tres"];
  form = new FormGroup({
    banner_name: new FormControl('', Validators.required),
    banner_slogan: new FormControl('', Validators.required),
    countdown_title:  new FormControl('', Validators.required),
    countdown_date:  new FormControl('', Validators.required),
    countdown_start_time:  new FormControl('', Validators.required),
    countdown_end_time:  new FormControl('', Validators.required),
    where_title: new FormControl('', Validators.required),
    where_address_label:  new FormControl('', Validators.required),
    where_indications: new FormControl('', Validators.required)
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
    this.initInputData()

    this.form.controls.countdown_date.valueChanges.subscribe((value:string | null) => {
      if(!value){
        return;
      }
      const date = new Date(value);
      let day = date.getDate();
      let month = date.toLocaleString('es-ES', { month: 'long'});
      month = month.charAt(0).toUpperCase() + month.slice(1);
      console.log("day:", day)
      console.log("month:", month)
      this.where_date_label = `${day} de ${month}`
      this.where_event_date_labeL = `${this.where_date_label} de ${this.where_start_time_label} a ${this.where_end_time_label} `
    })

    this.form.controls.countdown_start_time.valueChanges.subscribe((value: string | null) => {
      if(!value){
        return;
      }
      this.where_start_time_label = value;
      this.where_event_date_labeL = `${this.where_date_label} de ${this.where_start_time_label} a ${this.where_end_time_label} `
    })

    this.form.controls.countdown_end_time.valueChanges.subscribe((value: string | null) => {
      if(!value){
        return;
      }
      this.where_end_time_label = value;
      this.where_event_date_labeL = `${this.where_date_label} de ${this.where_start_time_label} a ${this.where_end_time_label} `
    })
    this.form.controls.where_address_label.valueChanges.pipe(
      debounceTime(2000)
    ).subscribe((value:string | null) => {
      if(!value){
        this.where_address_list_options = []
        return;
      }
      this.where_address_list_options = this.where_address_options.filter((address) => address.includes(value))
      console.log("this.where_address_list_options:", this.where_address_list_options)
    })

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

  initInputData(){
    this.form.controls.banner_slogan.setValue("MI FIESTA");
    this.form.controls.countdown_title.setValue("¡Te espero para festejar este gran momento de mi vida!")
    this.form.controls.where_title.setValue("FIESTA");
    this.where_event_date_labeL = `${this.where_date_label} de ${this.where_start_time_label} a ${this.where_end_time_label} `;
    this.form.controls.where_indications.setValue("Clickeá en el botón de abajo y encontrá las indicaciones para llegar,¡nos vemos!😉")
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

    console.log("FORM:", this.form.value)
    return;
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
       // formData.append('banner_background', this.selectedFile, this.selectedFile.name);
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
       // formData.append('banner_background', this.selectedFile, this.selectedFile.name);
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
