import { Component } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { NavComponent } from '../../../components/nav/nav.component';

@Component({
  selector: 'superadmin-home',
  standalone: true,
  imports: [SidebarComponent, NavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class superAdminHomeComponent {

}
