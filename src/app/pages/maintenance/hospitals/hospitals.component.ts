import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit, OnDestroy {
  public hospitals: Hospital[] = [];
  public load: boolean = true;
  public imgSubs: any = null;
  constructor(private hospitalService: HospitalService,
    private searchService: SearchService,
    private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.loadHospital();
    this.imgSubs = this.modalImagenService.newImage
      .pipe(delay(100))
      .subscribe(img => this.loadHospital());
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  loadHospital() {
    this.hospitalService.loadHospitals().subscribe((resp: any) => {
      this.hospitals = resp
      this.load = false;
      console.log(resp)
    })
  }

  search(term: string): any {
    if (term.length === 0) {
      return this.loadHospital();
    }
    this.searchService.search('hospitales', term)
    /*  .subscribe( resp => {
       this.users = resp;
     }); */
  }

  saveChanges(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital._id, hospital.name)
      .subscribe(resp => {
        // Swal.fire( 'Actualizado', hospital.nombre, 'success' );
      });
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id)
      .subscribe(resp => {
        this.loadHospital();
        // Swal.fire( 'Borrado', hospital.nombre, 'success' );
      });
  }

  async openSweetAlert() {
    if (true) {
      this.hospitalService.createHospital('')
        .subscribe((resp: any) => {
          this.hospitals.push(resp.hospital)
        })
    }
  }



  openModal(hospital: Hospital) {
    this.modalImagenService.openModal('hospitales', hospital._id, hospital.img);
  }
}
