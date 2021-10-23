import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SeoService } from './shared/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // public methods
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    // Based on https://stackoverflow.com/questions/48330535/dynamically-add-meta-description-based-on-route-in-angular
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        this.updateTitleAndDescription(data);
        this.seoService.Title = data['title'];
        this.seoService.setMetaTag('description', data['description']);
      });
  }

  private updateTitleAndDescription(data: Data) {
    const path = this.router.url;
    const country = decodeURIComponent(path.split('/countries/')[1]) || '';
    // redirect happens when country does not exist so no need to not set the
    // title and meta tags

    const title = (data['title'] as string).replace('{{ country }}', country);
    data['title'] = title;
    const description = (data['description'] as string).replace(
      '{{ country }}',
      country
    );
    data['description'] = description;
  }
}
