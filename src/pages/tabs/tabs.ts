import { ListPage } from './../list/list';
import { TimelinePage } from './../timeline/timeline';
import { YouPage } from './../you/you';
import { Component } from '@angular/core';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TimelinePage;
  tab2Root = ListPage;
  tab3Root = YouPage;

  constructor() {

  }
}
