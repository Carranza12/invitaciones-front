import { Component } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { NavComponent } from '../../../components/nav/nav.component';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'superadmin-home',
  standalone: true,
  imports: [SidebarComponent, NavComponent, SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class superAdminHomeComponent {
  public userData!: any;
  constructor(
  
  ) {}

  ngOnInit(): void {
    const user_json = localStorage.getItem('user');
    if (user_json) {
      this.userData = JSON.parse(user_json);
    }
  }

}
