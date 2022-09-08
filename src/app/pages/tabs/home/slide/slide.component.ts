import { Component, Input, OnInit } from '@angular/core';
import { slideOpts } from 'src/app/shared/common/const';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {
  @Input() title = '';
  @Input() urlPath = '';
  @Input() movies: Movie[] = [];

  slideOpts = slideOpts;
  constructor() { }

  ngOnInit() { }

}
