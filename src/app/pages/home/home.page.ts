import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  data:Array<any> = [];
  itemsPerPage:number = 0;
  count:number = 0;
  currentPage:number = 1;
  category:string = '';
  dataCarrito:Array<any> = [];
  constructor(private homeService:HomeService, private toastController: ToastController, private _router:Router) { }

  ngOnInit() {
    this.getProducts();
    var productos = JSON.parse(localStorage.getItem('products')!);
    if(productos != null && productos != undefined){
      this.dataCarrito = productos;
    }
    console.log(productos);
  }

  getProducts(){
    this.homeService.getProducts(this.currentPage.toString(), this.category).subscribe((res:any) => {
      console.log(res);
      this.data = res.data;
      this.currentPage = res.current_page;
      this.itemsPerPage = res.per_page;
      this.count = res.total;
    })
  }

  changeText(){
    this.getProducts();
  }

  async addProduct(item:any){
    var validarCarrito = this.dataCarrito.filter(element => {
      return element.id == item.id
    });

    if(validarCarrito.length == 0){
      this.dataCarrito.push(item);
      localStorage.removeItem('products');
      localStorage.setItem('products', JSON.stringify(this.dataCarrito));
      const toast =  await this.toastController.create({
        message: 'Producto Agregado Correctamente',
        duration: 900,
        position: "bottom"
      })
  
      toast.present();
    }else{
      const toast =  await this.toastController.create({
        message: 'Ya has Agregado este producto anteriormente.',
        color: 'danger',
        duration: 900,
        position: "bottom"
      })
  
      toast.present();
    }
 
  }

  public onChange(event:any): void {
    console.dir(event);
    this.currentPage = event;
    this.getProducts();
  }

  goToCart(){
    this._router.navigate(['/cart']);
  }

}
