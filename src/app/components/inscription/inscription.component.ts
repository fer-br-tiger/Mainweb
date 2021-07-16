import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CursosService } from 'src/app/services/cursos.service';
import { LocalidadesService } from 'src/app/services/localidades.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  localidades: any;
  comForm = new FormControl('', Validators.required);
  alumnoForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<InscriptionComponent>, public localidadesService: LocalidadesService, private cursosService: CursosService, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public curso: any) {
    this.alumnoForm = formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      celular: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      direccion_calle: ['', Validators.required],
      direccion_numero: ['', Validators.required],
      direccion_barrio: ['', Validators.required],
      direccion_localidad: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required]
    });

    try {
      localidadesService.getLocalidades().subscribe(resp => {
        this.localidades = resp.localidades;
        this.alumnoForm.controls.direccion_localidad.setValue(resp.localidades[18].nombre);        
      });
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {
  }

  async save() {

    let inscription = {
      nombres: this.alumnoForm.controls.nombres.value,
      apellidos: this.alumnoForm.controls.apellidos.value,
      dni: this.alumnoForm.controls.dni.value,
      celular: this.alumnoForm.controls.celular.value,
      mail: this.alumnoForm.controls.mail.value,
      direccion_calle: this.alumnoForm.controls.direccion_calle.value,
      direccion_numero: this.alumnoForm.controls.direccion_numero.value,
      direccion_barrio: this.alumnoForm.controls.direccion_barrio.value,
      direccion_localidad: this.alumnoForm.controls.direccion_localidad.value,
      fecha_nacimiento: this.alumnoForm.controls.fecha_nacimiento.value,
      id_comisiones: this.comForm.value.id_comisiones
    }

    await this.cursosService.inscription(inscription).toPromise()
      .then(res => console.log(res))
      .catch(err => console.log(err));
    this.dialogRef.close(true);
  }

}
