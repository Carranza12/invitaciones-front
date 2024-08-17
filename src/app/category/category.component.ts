import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { LoadingService } from '../services/loading.service';
import { environment } from '../../environment';
import { CardCategoryComponent } from './card-category/card-category.component';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { categoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [SidebarComponent, SharedModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class categoryComponent {
  public hostNameBackend: string = environment.backendHost;
  public categoryList: any[] = [];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['name', 'status', 'actions'];
  public pageSizeOptions: number[] = [5, 10, 20];
  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filtrosForm = new FormGroup({
    name: new FormControl(''),
  });
  constructor(
    private categoryService: categoryService,
    private loadingService: LoadingService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadCategoryList();

    this.filtrosForm
      .get('name')
      ?.valueChanges.pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => {
        this.search();
      });
  }

  loadCategoryList(filters?: any) {
    this.loadingService.show();
    this.categoryService
      .get(
        this.currentPage.toString(),
        this.pageSize.toString(),
        filters ? filters : []
      )
      .subscribe(
        (data: any) => {
          this.categoryList = data.items;
          this.totalItems = data.totalItems;
          this.dataSource.data = this.categoryList;
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
    this.loadCategoryList();
  }

  addNewRecord() {
    const dialogRef = this.dialog.open(ViewCategoryComponent, {
      width: '600px',
      disableClose: true,
      data: {
        action: 'Nueva',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadCategoryList();
    });
  }

  viewRecord(element: any) {
    const dialogRef = this.dialog.open(CardCategoryComponent, {
      width: '600px',
      disableClose: true,
      data: {
        _id: element._id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadCategoryList();
    });
  }

  editRecord(element: any) {
    const dialogRef = this.dialog.open(ViewCategoryComponent, {
      width: '600px',
      disableClose: true,
      data: {
        action: 'Edicion de',
        _id: element._id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadCategoryList();
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
        this.categoryService.delete(id).subscribe(
          (response: any) => {
            Swal.fire('Eliminado con éxito', '', 'success');
            this.loadCategoryList();
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
    this.loadCategoryList(filters);
  }
}
