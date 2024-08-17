import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubcategoryService } from '../../services/subcategory.service';
import { environment } from '../../../environment';

@Component({
  selector: 'card-invitation',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './card-invitation.component.html',
  styleUrl: './card-invitation.component.scss'
})
export class CardInvitationComponent {
  public source!:any;
  public hostNameBackend: string = environment.backendHost;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private thisDialogRef: MatDialogRef<CardInvitationComponent>,
    private subcategorySVC: SubcategoryService,
  ) {}

  ngOnInit() {
    
    if(this.data._id){
      console.log("ID:", this.data._id)
      this.subcategorySVC
      .getById(this.data._id)
      .subscribe((itemdata: any) => {
        this.source = itemdata;
        this.source.image = this.hostNameBackend + "/" + this.source.image
      });
    }
  }
}
