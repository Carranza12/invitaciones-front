import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage.service';
import Swal from 'sweetalert2';
import { LoadingService } from '../../services/loading.service';
import { AuthService } from '../../auth/services/auth.service';
@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  _localStorageSVC = inject(LocalstorageService);
  _loadingSvc = inject(LoadingService);
  _authSvc = inject(AuthService);
  ngOnInit(): void {
    this.user = this._localStorageSVC.getUserJSON();
    console.log("this.user:", this.user)
  }

  user: any = {
    profileImage: 'path/to/profile-image.jpg', // Ruta a la imagen de perfil del usuario
    name: 'John Doe', // Nombre del usuario
    role: 'Admin', // Rol del usuario
  };

  sections = [
    {
      title: 'Dashboard',
      submodules: ['Overview', 'Stats', 'Reports'],
      expanded: false,
    },
    {
      title: 'Settings',
      submodules: ['Profile', 'Security', 'Notifications'],
      expanded: false,
    },
    {
      title: 'Help',
      submodules: ['Documentation', 'FAQ', 'Support'],
      expanded: false,
    },
  ];
  toggle(index: number) {
    this.sections[index].expanded = !this.sections[index].expanded;
  }

  async logout(){
    const result = await Swal.fire({
      title: '¿Estás seguro de que desea cerrar sesion?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      icon: 'question',
    });

    if (result.isConfirmed) {
      try {
        this._loadingSvc.show()
        await new Promise(resolve => setTimeout(resolve, 500));
        this._authSvc.logout();
        this._loadingSvc.hide()
      } catch (error) {
        console.error(error);
        this._loadingSvc.hide()
      }
    }
  }
}
