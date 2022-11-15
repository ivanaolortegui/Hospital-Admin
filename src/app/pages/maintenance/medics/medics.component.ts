import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medic } from 'src/app/models/medics.model';
import { MedicService } from 'src/app/services/medic.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: [
  ]
})
export class MedicsComponent implements OnInit, OnDestroy {
  medics: Medic[] = [];
  public load: boolean = true;
  public imgSubs: any = null;
  constructor(private medicService: MedicService,
    private searchService: SearchService,
    private modalImagenService: ModalImagenService,) { }

  ngOnInit(): void {
    this.loadMedic();

    this.imgSubs = this.imgSubs = this.modalImagenService.newImage
      .pipe(delay(100))
      .subscribe(img => this.loadMedic());
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  loadMedic() {
    this.medicService.loadMedics().subscribe((resp: any) => {
      this.medics = resp
      this.load = false;
      console.log(resp)
    })
  }
  search(term: string): any {
    if (term.length === 0) {
      return this.loadMedic();
    }
    this.searchService.search('medicos', term)
    /*  .subscribe( resp => {
       this.users = resp;
     }); */
  }

  openModal(medic: Medic) {
    this.modalImagenService.openModal('medicos', medic._id, medic.img);
  }

  deleteMedic(medic: Medic) {
    this.medicService.deleteMedic(medic._id)
      .subscribe(resp => {
        this.loadMedic();
        // Swal.fire( 'Borrado', hospital.nombre, 'success' );
      });
  }
}
