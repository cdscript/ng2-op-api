import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators'
import * as _ from 'lodash';

import { SharedService } from '../common/core/service/shared.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  pirateCtrl: FormControl;
  reactivePirates: any;

  pirates: any[] = [];
  onePiece = [];

  isShow: boolean = false;
  counter: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shared: SharedService
  ) { }

  ngOnInit() {
    setTimeout(() => { this.router.navigate(['f'], { relativeTo: this.route }); }, 350);
    this.pirateCtrl = new FormControl(null);
    this.shared.setLoadingAllPiratesChanged = false;

    this.shared.piratesChanged.subscribe((response) => {
      this.pirates = this.pirates.concat(response);
      this.pirateCtrl.patchValue('');
    });

    this.reactivePirates = this.pirateCtrl.valueChanges
      .pipe(
        startWith(this.pirateCtrl.value),
        map(val => this.displayFn(val)),
        map(name => this.filterPirates(name))
      );

    this.reactivePirates.subscribe((response) => {
      // this.onePiece = response;
      this.shared.setAutocomplete = response;
    });

    this.pirateCtrl.valueChanges.subscribe((response) => {
      if (response === null) return;
      this.isShow = response.length > 0;
    });

    this.shared.loadingAllPiratesChanged.subscribe((response) => {

      response ? (() => {
        this.pirateCtrl.disable();
        if (this.counter !== 0) return;
        this.shared.snackbar('Loading all chararacters. Please wait');
        this.counter++;
      })() : (() => {
        this.pirateCtrl.enable();
        this.shared.closeAllSnackbar();
        this.counter = 0;
      })();
    });
  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.name : value;
  }

  filterPirates(val: string) {
    return val ? this._filter(this.pirates, val) : this.pirates;
  }

  private _filter(pirates: any[], val: string = '') {
    const filterValue = val.toLowerCase();
    return pirates.filter(pirate => pirate.attributes.names.en.toLowerCase().includes(filterValue));
  }

}
