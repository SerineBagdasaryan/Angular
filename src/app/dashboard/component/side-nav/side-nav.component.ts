import {Component, NgZone, OnInit} from '@angular/core';
const MAX_WIDTH_BREAKPOINT =720;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
private media: MediaQueryList =
  matchMedia(`(max-width :  ${MAX_WIDTH_BREAKPOINT}px)`)
  links = [
    {name: 'Invoices',
    url: 'invoices'},
    // {name: 'Invoice',
    // url: 'invoice'}
  ];
  constructor(zone: NgZone) {
  // this.media.EventTarget((mql,o) => {
  //   zone.run(() => this.media = mql)
  // })
  }

  ngOnInit() {
  }
  isScreenSmall(){
return this.media.matches;
  }
}
