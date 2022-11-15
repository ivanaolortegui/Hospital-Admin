import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medic } from 'src/app/models/medics.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicService } from 'src/app/services/medic.service';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: [
  ]
})
export class MedicComponent implements OnInit {

  //public medicForm: FormGroup;
  public medicForm: any;
  public hospitals: Hospital[] = [];
  public selectedMedic: any;
  public selectedHospital: any = null;

  // public selectedHospital: Hospital;

  constructor(private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicService: MedicService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => this.loadMedic(id));



    this.medicForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });
    this.loadHospitals();
    this.medicForm.get('hospital').valueChanges
      .subscribe((hospitalId: string) => {
        // this.selectedHospital = this.hospitals.find(h => h._id === hospitalId);
      })
  }

  loadMedic(id: string) {

    if (id === 'nuevo') {
      return;
    }

    this.medicService.getMedicById(id)
      .pipe(
        delay(100)
      )
      .subscribe((medic): any => {
        if (!medic) {
          return this.router.navigateByUrl(`/dashboard/medics`);
        }
        // const { nombre, hospital:{ _id } } = medico; 
        const { name, hospital, _id } = medic;
        this.selectedMedic = medic;
        this.medicForm.setValue({ name, hospital: _id });
      });

  }

  loadHospitals() {
    this.hospitalService.loadHospitals()
      .subscribe((hospitals: any) => {
        this.hospitals = hospitals;
      })
  }

  saveMedic() {
    // const { nombre } = this.medicForm.value;
    if (this.selectedMedic) {
      // actualizar
      const data = {
        ...this.medicForm.value,
        _id: this.selectedMedic._id
      }
      this.medicService.updateMedic(data)
        .subscribe(resp => {
          // Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
        })
    } else {
      // crear
      this.medicService.createMedic(this.medicForm.value)
        .subscribe((resp: any) => {
          //   Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medic/${resp.medic._id}`)
        })
    }



  }

}
