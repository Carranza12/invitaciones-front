import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { GeneralService } from '../services/general.service';
import { PaginatorComponent } from '../components/paginator/paginator.component';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SidebarComponent, SharedModule, ReactiveFormsModule, PaginatorComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  public usuariosList: any = [];
  public totalPages!: [];
  public currentPage!: number;

  constructor(
    public _general: GeneralService,
    private formBuilder: FormBuilder,
    public router: Router,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.searchInApi('1', []);
  }

  public filtrosForm = this.formBuilder.group({
    name: [''],
    lastname: [''],
    email: [''],
    role_default: [''],
  });

  onSubmit(): void {
    console.log('Formulario enviado');
  }

  async deleteUser(id: string) {
    const result = await Swal.fire({
      title: '¿Estás seguro de cancelar la finalizacion?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        this.loadingService.show();
      /*   this.apiService.deleteUser(id).subscribe(
          (response: any) => {
            Swal.fire('Usuario eliminado con éxito', '', 'success');
            this.loadingService.hide();
            this.apiService.getUsers('1', []).subscribe(
              (data: any) => {
                if (Array.isArray(data)) {
                  this.usuariosList = data;
                }
              },
              (error: any) => {
                console.error(error);
                this.auth.logout();
                this.loadingService.hide();
              }
            );
          },
          (error: any) => {
            console.error('Error al eliminar el usuario', error);
            Swal.fire(`Error al eliminar el usuario: ${error}`, '', 'error');
          }
        ); */
      } catch (error) {
        console.error(error);
      }
    }
  }
  search() {
    let filters = [
      {
        name: 'name',
        value: this.filtrosForm.controls.name.value,
      },
      {
        name: 'lastname',
        value: this.filtrosForm.controls.lastname.value,
      },
      {
        name: 'email',
        value: this.filtrosForm.controls.email.value,
      },
      {
        name: 'role_default',
        value: this.filtrosForm.controls.role_default.value,
      },
    ];
    this.searchInApi(this.currentPage.toString(), filters);
  }

  changePage(event: string) {
    this.searchInApi(event, []);
  }

  async searchInApi(page: string, filters: any[]) {
    /*   this.loadingService.show();
  this.apiService.getUsers(page, filters).subscribe(
      (data: any) => {
        if (Array.isArray(data.items)) {
          this.usuariosList = data.items;
          this.totalPages = data.totalPages;
          this.currentPage = Number(data.currentPage);
          this.loadingService.hide();
        }
      },
      (error: any) => {
        console.error(error);
        this.auth.logout();
        this.loadingService.hide();
      }
    ); */
  }
}
