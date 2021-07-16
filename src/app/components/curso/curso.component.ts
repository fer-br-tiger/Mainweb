import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as bootstrap from 'bootstrap';
import { CursosService } from 'src/app/services/cursos.service';
import { IdcursoService } from 'src/app/services/idcurso.service';
import { InscriptionComponent } from '../inscription/inscription.component';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {
  curso!: any;
  myToast!: bootstrap.Toast;

  constructor(public dialog: MatDialog, public idcursoService: IdcursoService, private cursosService: CursosService) {
    try {
      this.cursosService.getCurso(idcursoService.curso).subscribe(resp => {
        this.curso = resp.curso;
      });
    } catch (err) {
      console.log(err);
    }
  }

  ngOnInit(): void {
    var myToastEl = document.getElementById('liveToast')!;
    this.myToast = new bootstrap.Toast(myToastEl);
  }

  openDialog() {
    let cursoInf = {
      id_cursos: this.idcursoService.curso,
      nombre: this.curso.nombre,
      precio_inscripcion: this.curso.precio_inscripcion,
      comisiones: this.curso.comisiones
    }

    const dialogRef = this.dialog.open(InscriptionComponent, { data: cursoInf, width: '40%' });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.myToast.show();
      }
    });
  }

}
