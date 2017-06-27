import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AddListItemComponent } from './add-list-item';

@NgModule({
  declarations: [
    AddListItemComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    AddListItemComponent
  ]
})
export class AddListItemComponentModule {}
