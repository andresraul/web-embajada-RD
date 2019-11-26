import { PageService } from './../../services/pages.service';
import { Component, OnInit } from '@angular/core';
import { Page } from '../../models/page';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dominicana',
  templateUrl: './sobredominicana.component.html',
  styleUrls: ['./sobredominicana.component.scss']
})
export class SobreDominicanaComponent implements OnInit {

  page$: Observable<Page>;
  pageList: Page[];
  sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PageService,
    private titleService: Title
  ) {}

  ngOnInit() {

    this.service.getPagesSobreDominicana().subscribe(pages => (this.pageList = pages));
    this.page$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getPageSobreDominicana(params.get('slug')))
    );

    this.sub = this.route.params.subscribe(params => {
      this.setTitle(this.inverse_slugify(params.slug));
    });

  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  private inverse_slugify(s) {
    return s.toLowerCase()
            .split('-')
            .map(i => i[0].toUpperCase() + i.substr(1))
            .join(' ');
  }
}
