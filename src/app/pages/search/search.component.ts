import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medic } from 'src/app/models/medics.model';
import { User } from 'src/app/models/user.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  public users: User[] = [];
  public medics: Medic[] = [];
  public hospitals: Hospital[] = [];


  constructor(private activatedRoute: ActivatedRoute,
    private searchService: SearchService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ term }) => this.globalSearch(term));
  }

  globalSearch(term: string) {
    this.searchService.globalSearch(term)
      .subscribe((resp: any) => {
        console.log(resp)
        this.users = resp.users;
        this.medics = resp.medics;
        this.hospitals = resp.hospitals;
      });
  }

}
