import { Component, OnInit, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { ProductService } from '../services/product.service'
import { CartService } from '../services/cart.service';

import ProductDto = Insite.Catalog.Services.Dtos.ProductDto;
import ProductCollectionModel = Insite.Catalog.WebApi.V1.ApiModels.ProductCollectionModel;
import { IProductCollectionParameters } from '../services/product.service';

@Component({
    selector: 'productlist',
    templateUrl: './productlist.component.html',
    styleUrls: ['./productlist.component.css'],
    providers: [ProductService, CartService],

    // encapsulation: ViewEncapsulation.Native  // shadowdom or polyfill 
    // encapsulation: ViewEncapsulation.None
    encapsulation: ViewEncapsulation.Emulated
})
export class ProductListComponent implements OnInit {

    @Input()
    name;
    products: ProductDto[];
    productCollection: ProductCollectionModel;

    constructor(
        private productService: ProductService,
        private cartService: CartService) { }

    ngOnInit() {
        this.getProductData({ categoryId: "a926eb0b-1e10-4163-adaf-a67200d93e63"});
    }

    protected getProductData(params: IProductCollectionParameters, expand?: string[]): void {
        var products = this.productService.GetProducts(params).subscribe(
            productCollection => {
                this.productCollection = productCollection;
                this.products = productCollection.products;
            },
            error => { console.log('an error occurred'); }
        )
    }

    updateProductData = () => {
        const params: IProductCollectionParameters = {
            categoryId: "a926eb0b-1e10-4163-adaf-a67200d93e63",
            page: this.productCollection.pagination.page,
            pageSize: this.productCollection.pagination.pageSize,
            sort: this.productCollection.pagination.sortType
        };

        this.getProductData(params);
    }

    addToCart(product: ProductDto) {
        this.cartService.addLineFromProduct(product, true).subscribe(
            cartLine => {

            });
    }
}
