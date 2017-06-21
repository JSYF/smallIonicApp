import { TimelinePage } from './../timeline/timeline';
import { YouPage } from './../you/you';
import { ImagePage } from './../image/image';
import { Component } from '@angular/core';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TimelinePage;
  tab2Root = ImagePage;
  tab3Root = YouPage;

  constructor() {

  }
}
