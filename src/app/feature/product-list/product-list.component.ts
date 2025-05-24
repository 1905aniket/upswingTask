import { Component, signal, Signal } from '@angular/core';
import { ProductStore } from '../../store/product-store';
import { CommonModule } from '@angular/common';
import { ModalPopupComponent } from '../../shared/components/modal-popup/modal-popup.component';
import { CommonServiceService } from '../../services/common-service.service';
import { Product } from '../../shared/models/product-modal';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ModalPopupComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  productList: Signal<Product[]> = signal<Product[]>([]);
  isEdit: boolean = false

  constructor(private store: ProductStore, private _commonService: CommonServiceService) {
    this.productList = this.store.products;
  }

  delete(id: string) {
    this.store.deleteProduct(id);
  }

  edit(productId: string) {
    this.isEdit = true;
    this._commonService.setId(productId);
  }
}
