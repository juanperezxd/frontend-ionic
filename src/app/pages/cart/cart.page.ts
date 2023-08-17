import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  dataCarrito:Array<any> = [];

  constructor() { 
    console.log('constructor')
  }

  deleteProduct(item:any){
    this.dataCarrito = this.dataCarrito.filter(element => {
      return element.id !== item.id
    });
    localStorage.removeItem('products');
    localStorage.setItem('products', JSON.stringify(this.dataCarrito));
  }

  ngOnInit() {
    var productos = JSON.parse(localStorage.getItem('products')!);
    console.log(productos)
    if(productos != null && productos != undefined){
      this.dataCarrito = productos;
    }
  }


}
