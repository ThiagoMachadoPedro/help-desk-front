import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {


        constructor(
                private router: Router,
                private authService: AuthService,
                private toast: ToastrService) { }


ngOnInit() {
  this.router.navigate(['home']);
}


logout() {
        this.router.navigate(['login'])
        //retira o token depois de deslogado
        this.authService.logout();
        this.toast.info('Logout realizado com sucesso', 'Logout')
      }
}
