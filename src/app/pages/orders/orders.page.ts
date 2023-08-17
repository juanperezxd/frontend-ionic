import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HomeService } from 'src/app/services/home.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';

  dataCarrito:Array<any> = [];
  total:number = 0;

  constructor(private toastController: ToastController, private orderService:OrdersService, private _router: Router) { 
    console.log('constructor')
  }

  ngOnInit() {
    var productos = JSON.parse(localStorage.getItem('products')!);
    console.log(productos)
    if(productos != null && productos != undefined){
      this.dataCarrito = productos;
    }

    this.dataCarrito.forEach(element => {
      this.total += Number(element.price);
    })
  }

  async processOrder(){
    let datos = {
      name: this.name,
      email: this.email,
      password: this.password,
      total: this.total,
      products: this.dataCarrito
    };

    if(this.name != ''){
      this.orderService.saveOrder(datos).subscribe(async (res:any) => {
        console.log(res);
        if(res.status == 1){
          let toast =  await this.toastController.create({
            message: 'Se registro la orden correctamente.',
            duration: 900,
            position: "bottom"
          })
      
          toast.present();
          localStorage.removeItem('products');
          this._router.navigate(['/home']);
          
        }else{
          let toast =  await this.toastController.create({
            message: 'Ha ocurrido un error.',
            color: 'danger',
            duration: 900,
            position: "bottom"
          })
      
          toast.present();
        }
      })
    }else{
      const toast =  await this.toastController.create({
        message: 'Debes ingresar los nombres.',
        color: 'danger',
        duration: 900,
        position: "bottom"
      })
  
      toast.present();
    }
  }
}
