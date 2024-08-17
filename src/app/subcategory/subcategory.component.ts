import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ViewSubcategoryComponent } from './view-subcategory/view-subcategory.component';
import { SubcategoryService } from '../services/subcategory.service';
import { LoadingService } from '../services/loading.service';
import { environment } from '../../environment';
import { CardSubcategoryComponent } from './card-subcategory/card-subcategory.component';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [SidebarComponent, SharedModule, ReactiveFormsModule],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.scss',
})
export class SubcategoryComponent {
  public hostNameBackend: string = environment.backendHost;
  public subcategoryList: any[] = [];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'name', 'status', 'actions'];
  public pageSizeOptions: number[] = [5, 10, 20];
  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filtrosForm = new FormGroup({
    name: new FormControl(''),
  });
  constructor(
    private subcategoryService: SubcategoryService,
    private loadingService: LoadingService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadSubcategoryList();

    this.filtrosForm
      .get('name')
      ?.valueChanges.pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => {
        this.search();
      });
  }

  loadSubcategoryList(filters?: any) {
    this.loadingService.show();
    this.subcategoryService
      .get(
        this.currentPage.toString(),
        this.pageSize.toString(),
        filters ? filters : []
      )
      .subscribe(
        (data: any) => {
          console.log('data:', data);
          this.subcategoryList = data.items;
          this.totalItems = data.totalItems;
          this.dataSource.data = this.subcategoryList;
          this.loadingService.hide();
        },
        (error: any) => {
          console.error('Error fetching subcategories:', error);
          this.loadingService.hide();
        }
      );
  }

  handlePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadSubcategoryList();
  }

  addNewRecord() {
    const dialogRef = this.dialog.open(ViewSubcategoryComponent, {
      width: '600px',
      disableClose: true,
      data: {
        action: 'Nueva',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadSubcategoryList();
    });
  }

  viewRecord(element: any) {
    const dialogRef = this.dialog.open(CardSubcategoryComponent, {
      width: '600px',
      disableClose: true,
      data: {
        _id: element._id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadSubcategoryList();
    });
  }

  editRecord(element: any) {
    const dialogRef = this.dialog.open(ViewSubcategoryComponent, {
      width: '600px',
      disableClose: true,
      data: {
        action: 'Edicion de',
        _id: element._id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadSubcategoryList();
    });
  }

  async deleteRecord(id: string) {
    const result = await Swal.fire({
      title: '¿Estás seguro eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        this.loadingService.show();
        this.subcategoryService.delete(id).subscribe(
          (response: any) => {
            Swal.fire('Eliminado con éxito', '', 'success');
            this.loadSubcategoryList();
            this.loadingService.hide();
          },
          (error: any) => {
            console.error('Error al eliminar el item', error);
            Swal.fire(`Error al eliminar: ${error}`, '', 'error');
          }
        );
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
    ];
    this.loadSubcategoryList(filters);
  }
}
