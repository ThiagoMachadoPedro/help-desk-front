import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/service/tecnico/tecnico.service';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.scss']
})
export class TecnicoListComponent {

  ELEMENT_DATA: Tecnico[] = []

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
        private service: TecnicoService
      ) { }

      ngOnInit(): void {
        this.findAll();
      }
    // pega a service e subscribe para escrever no ahtml
      findAll() {
        this.service.findAll().subscribe(resposta => {
          this.ELEMENT_DATA = resposta
          this.dataSource = new MatTableDataSource<Tecnico>(resposta);
          this.dataSource.paginator = this.paginator;
        })
      }

      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }

}
