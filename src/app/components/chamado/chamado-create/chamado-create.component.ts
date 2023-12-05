import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/service/chamado/chamado.service';
import { ClienteService } from 'src/app/service/cliente/cliente.service';
import { TecnicoService } from 'src/app/service/tecnico/tecnico.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.scss']
})
export class ChamadoCreateComponent {

        chamado: Chamado = {
                prioridade:  '',
                status:      '',
                titulo:      '',
                observacao: '',
                tecnico:     '',
                cliente:     '',
                nomeCliente: '',
                nomeTecnico: '',
              }

              clientes: Cliente[] = []
              tecnicos: Tecnico[] = []

              prioridade: FormControl = new FormControl(null, [Validators.required]);
              status:     FormControl = new FormControl(null, [Validators.required]);
              titulo:     FormControl = new FormControl(null, [Validators.required]);
              observacao:FormControl = new FormControl(null, [Validators.required]);
              tecnico:    FormControl = new FormControl(null, [Validators.required]);
              cliente:    FormControl = new FormControl(null, [Validators.required]);

              constructor(
                private chamadoService: ChamadoService,
                private clienteService: ClienteService,
                private tecnicoService: TecnicoService,
                private toastService:    ToastrService,
                private router: Router,
              ) { }

              ngOnInit(): void {
                this.findAllClientes();
                this.findAllTecnicos();
              }

              create(): void {
                this.chamadoService.create(this.chamado).subscribe(() => {
                  this.toastService.success('Chamado criado com sucesso', 'Novo chamado');
                  this.router.navigate(['chamados']);
                }, ex => {
                  console.log(ex);

                  this.toastService.error(ex.error.error);
                })
              }


              findAllClientes(): void {
                this.clienteService.findAll().subscribe(resposta => {
                  this.clientes = resposta;
                })
              }

              findAllTecnicos(): void {
                this.tecnicoService.findAll().subscribe(resposta => {
                  this.tecnicos = resposta;
                })
              }

              validaCampos(): boolean {
                return this.prioridade.valid && this.status.valid && this.titulo.valid
                   && this.observacao.valid && this.tecnico.valid && this.cliente.valid
              }

            }
