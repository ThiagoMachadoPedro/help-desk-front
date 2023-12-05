import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
        //creds pega o que esta sendo digitado no campo
        creds: Credenciais = {
                email: '',
                senha: '',
        };

        //vilidator valida oque esta sendo digitado no campo
        email = new FormControl(null, Validators.email);
        senha = new FormControl(null, Validators.minLength(3));

        constructor(
                private toast: ToastrService,
                private service: AuthService,
                private router: Router
        ) {}

        //
        logar() {
                // pega o service autenticath metodo para autenticar descodifica token
                this.service.authenticate(this.creds).subscribe(
                        (resposta) => {
                                // pega a funcao services para dar acesso ao usuario
                                this.service.successfulLogin(
                                        resposta.headers
                                                .get('Authorization')
                                                .substring(7)
                                );
                                this.router.navigate(['']); // navega ate a rota home
                        },
                        () => {
                                // mensagens quando usuario fazer coisas errada no sistema
                                this.toast.error(
                                        'Usuário inválidos. Verifique os campos !!!'
                                );
                                // depois de aparacecer a mensagem volta com o campo vazio
                                this.creds.senha = '';
                        }
                );
        }
        // desabilitar logar enquanto os inputs não tiver preenchidos
        validaCampos(): boolean {
                return this.email.valid && this.senha.valid;
        }
}
