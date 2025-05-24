import { signal, computed } from '@angular/core';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../shared/models/product-modal';



@Injectable({ providedIn: 'root' })
export class ProductStore {
    private productsSignal = signal<Product[]>([]);
    products = computed(() => this.productsSignal());

    addProduct(product: Omit<Product, 'id'>) {
        const newProduct: Product = { ...product, id: uuidv4() };
        this.productsSignal.set([...this.productsSignal(), newProduct]);
    }

    updateProduct(updated: Product) {
        this.productsSignal.set(
            this.productsSignal().map(p => (p.id === updated.id ? updated : p))
        );
    }

     getProductkById(id: string): Product | undefined {
            return this.productsSignal().find(product => product.id === id);
        }

    deleteProduct(id: string) {
        this.productsSignal.set(this.productsSignal().filter(p => p.id !== id));
    }

    categoryDistribution = computed(() => {
        const counts: Record<string, number> = {};
        for (const product of this.productsSignal()) {
            counts[product.category] = (counts[product.category] || 0) + 1;
        }
        return counts;
    });
}
