import { Component } from '@angular/core';
import { WishListFacadeService } from '../store/facades/wish-list-facade.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent {
  // public methods
  constructor(public wishListFacade: WishListFacadeService) {}
}
