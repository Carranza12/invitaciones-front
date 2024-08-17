import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage.service';
import Swal from 'sweetalert2';
import { LoadingService } from '../../services/loading.service';
import { AuthService } from '../../auth/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  public userData!: any;
  public sessionExpirationTime: string = '';
  public profile_picture!: string;
  public actual_path!: string;
  public showMenu: boolean = false;

  public modalIsOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private _router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const user_json = localStorage.getItem('user');
    if (user_json) {
      this.userData = JSON.parse(user_json);
      console.log(" this.userData:",  this.userData)
      let srcImage = this.userData.img;
      console.log("srcImage:", srcImage)
      srcImage = srcImage.replace('148.212.195.49', '192.168.1.27');
      this.profile_picture = 'http://' + srcImage;
      this.profile_picture = "../../../assets/logos/user_Desconocido.jpg"
    }

    this.route.url.subscribe((urlSegments:any) => {
      if (urlSegments[0]) {
        this.actual_path = urlSegments[1].path;
      }
    });

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const expirationTimestamp = decodedToken.exp;
        const expirationDate = new Date(expirationTimestamp * 1000);
        this.sessionExpirationTime = expirationDate.toLocaleTimeString();
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }

  async logout(): Promise<void> {
    const result = await Swal.fire({
      title: '¿Estás seguro de que desea cerrar sesion?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      icon: 'question',
    });

    if (result.isConfirmed) {
      try {
        this.loadingService.show();
        await new Promise((resolve) => setTimeout(resolve, 500));
        this.authService.logout();
        this.loadingService.hide();
      } catch (error) {
        console.error(error);
        this.loadingService.hide();
      }
    }
  }

  public navigateBy(url: string) {
    this._router.navigateByUrl(url);
  }

  public openMenu() {
    this.showMenu = true;
    this.modalIsOpen = true;
  }

  public closeMenu() {
    this.showMenu = false;
    this.modalIsOpen = false;
  }
}
