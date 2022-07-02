import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, Event, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnDestroy {

  public title: string = '';
  public titleSubs$: Subscription;

  constructor(private router: Router) {
    this.titleSubs$ = this.getPathArguments().subscribe(({ titulo }) => {
      this.title = titulo;
      document.title = `AdminPro - ${titulo}`;
    });

  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getPathArguments() {
    return this.router.events
      .pipe(
        filter((event: Event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data),
      )
  }

}
