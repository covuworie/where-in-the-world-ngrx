import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-region-filter',
  templateUrl: './region-filter.component.html',
  styleUrls: ['./region-filter.component.scss'],
})
export class RegionFilterComponent {
  // public properties
  readonly filterHeader = 'All Regions';
  @Output() regionChange = new EventEmitter<string>();
  selectedRegion = this.filterHeader;
  regions = [this.selectedRegion];

  // private fields
  private regionsOpen = false;
  private sortedRegions = [
    'Africa',
    'Americas',
    'Antarctic',
    'Asia',
    'Europe',
    'Oceania',
  ];

  // public methods
  constructor() {}

  onChangeRegion(region: string) {
    this.regions.forEach((region) => this.onToggleRegion(region));
    this.selectedRegion = region;
    this.onToggleDropdown();
    this.regionChange.emit(region);
  }

  onToggleDropdown() {
    this.regionsOpen = !this.regionsOpen;

    if (this.regionsOpen) {
      this.regions = [this.filterHeader].concat(this.sortedRegions);
    } else {
      this.regions = [this.selectedRegion];
    }
  }

  onToggleRegion(region: string) {
    return region !== this.selectedRegion;
  }
}
