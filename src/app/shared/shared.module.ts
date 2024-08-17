import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginator,
    MatSelectModule,
    MatTabsModule,
    MatCheckboxModule,
    MatPaginator,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginator,
    MatSelectModule,
    MatTabsModule,
    MatCheckboxModule,
    MatPaginator,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatPaginatorModule
  ],
})
export class SharedModule {}
