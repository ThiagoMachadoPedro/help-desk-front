import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_CONFIG } from 'src/app/config/api.config';
import { Credenciais } from 'src/app/models/credenciais';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

       jwtService: JwtHelperService = new JwtHelperService();

        constructor(private http: HttpClient) { }
      // credencias verifica se o usuario tem credenciais usar a pasta config
        authenticate(creds: Credenciais) {
          return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
            observe: 'response',
            responseType: 'text'
          })
        }


      // pega o token de autehticação da funcao a cima
        successfulLogin(authToken: string) {
          localStorage.setItem('token', authToken);
        }

        isAuthenticated() {
          let token = localStorage.getItem('token')
          if(token != null) {// não o token esta inpirado nega o acesso
            return !this.jwtService.isTokenExpired(token)
          }
          return false
        }
      //retira o token depois de deslogado retira o token depois de deslogar
        logout() {
          localStorage.clear();
        }





      }
