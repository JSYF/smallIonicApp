import { MePage } from './../me/me';
import { ListPage } from './../list/list';
import { TimelinePage } from './../timeline/timeline'
import { Component } from '@angular/core';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TimelinePage;
  tab2Root = ListPage;
  tab3Root = MePage;

  constructor() {

  }
}
