import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/services/cursos.service';
import { IdcursoService } from 'src/app/services/idcurso.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  cursos!: any[];

  constructor(private cursosService: CursosService, private idcursoService: IdcursoService) {
    try {
      this.cursosService.getCursos().subscribe(resp => {
        this.cursos = resp.cursos;
      });
    } catch (err) {
      console.log(err);
    }
  }

  ngOnInit(): void {
  }

  getId(id: number) {
    this.idcursoService.curso = id;
  }

}
