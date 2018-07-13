import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PiratesRoutingModule } from './pirates-routing.module';
import { PiratesMaterialModule } from '../common/core/module/pirates-material.module';

import { PiratesComponent } from './pirates.component';
import { LoadingBoxComponent } from './loading-box/loading-box.component';
import { PirateComponent } from '../common/shared/component/pirate/pirate.component';
import { MediaComponent } from '../common/shared/component/media/media.component';

import { HttpService } from '../common/core/service/http.service';


@NgModule({
  imports: [
    CommonModule,
    PiratesRoutingModule,
    PiratesMaterialModule
  ],
  declarations: [
    PiratesComponent,
    LoadingBoxComponent,
    PirateComponent,
    MediaComponent
  ],
  entryComponents: [
    PirateComponent,
    MediaComponent
  ],
  providers: [
    HttpService
  ]
})
export class PiratesModule { }