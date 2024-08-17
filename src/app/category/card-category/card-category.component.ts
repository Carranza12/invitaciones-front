import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../environment';
import { categoryService } from '../../services/category.service';

@Component({
  selector: 'app-card-category',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './card-category.component.html',
  styleUrl: './card-category.component.scss'
})
export class CardCategoryComponent {
  public source!:any;
  public hostNameBackend: string = environment.backendHost;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private thisDialogRef: MatDialogRef<CardCategoryComponent>,
    private categorySVC: categoryService,
  ) {}

  ngOnInit() {
    
    if(this.data._id){
      this.categorySVC
      .getById(this.data._id)
      .subscribe((itemdata: any) => {
        this.source = itemdata;
        this.source.image = this.hostNameBackend + "/" + this.source.image
      });
    }
  }
}
