import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(public dialogRef: MatDialogRef<InscriptionComponent>, public localidadesService: LocalidadesService, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public curso: any) {
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
        this.alumnoForm.controls.direccion_localidad.setValue(resp.localidades[18].id);        
      });
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close(true);
  }

}
