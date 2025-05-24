import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductStore } from '../../store/product-store';
import { CommonModule } from '@angular/common';
import { CommonServiceService } from '../../services/common-service.service';

@Component({
  selector: 'app-product-add-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-add-edit.component.html',
  styleUrl: './product-add-edit.component.scss'
})
export class ProductAddEditComponent implements OnInit {

  productForm: FormGroup;
  productId: string = '';
  @Output() formSubmitted = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private _productStore: ProductStore, private _commonService: CommonServiceService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._commonService.getId().subscribe((id) => {
      this.productId = id;
      const product = this._productStore.getProductkById(this.productId);
      this.productForm.patchValue({ ...product });
    })
  }

  onSubmit() {
    if (this.productId != '') {
      if (this.productForm.valid) {
        const newTask = {
          ...this.productForm.value,
          createdAt: new Date().toISOString(),
        };
        this._productStore.updateProduct({ ...newTask, id: this.productId });
        this.productId = '';
        this.productForm.reset({ category: 'Formal' });
        this.formSubmitted.emit();
      }
    } else {
      if (this.productForm.valid) {
        const newTask = {
          ...this.productForm.value,
          createdAt: new Date().toISOString(),
        };
        this._productStore.addProduct(newTask);
        this.productForm.reset({ category: 'Formal' });
        this.formSubmitted.emit();
      }
    }
  }
}
