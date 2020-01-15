import { Component, OnInit } from '@angular/core';
import { AppSyncClientConnector } from './appsync.connector';

import gql from 'graphql-tag';
import * as axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() { }

  orders: any[] = [];
  appSyncClient = null;
  axios = null;

  productName: string = null;
  productPrice: number = null;
  productAmount: number = null;
  deliveryAddress: string = null;

  ngOnInit() {
    this.appSyncClient = AppSyncClientConnector.getInstance();
    
    const subscribeOrder = gql`
      subscription onCreateOrder {
        onCreateOrder {
          id
          productId
          productName
          productAmount
          productPrice
          deliveryState
          deliveryAddress
          createdAt
        }
      }
    `;

    let subscription;

    (async () => {
      subscription = this.appSyncClient.subscribe({ query: subscribeOrder }).subscribe({
        next: data => {
          const order = data.data.onCreateOrder;
          this.orders.push(order);
          console.log(order);
        },
        error: error => {
          console.warn(error);
        }
      });
    })();

    // subscription.unsubscribe();
  }

  makeOrder() {
    if( !this.productName || !this.productAmount || !this.productPrice || !this.deliveryAddress ) {
      alert('全ての項目を入力してください');
      return;
    }
    const data = {
      'productId': 'angular-demo-client-product-id',
      'productName': this.productName,
      'productAmount': this.productAmount,
      'productPrice': this.productPrice,
      'deliveryAddress': this.deliveryAddress,
      'deliveryState': 1,
    }

    console.log({data})
    const url = 'YOUR_ORDER_API_ENDPOINT_URL';
    axios.default.post(url, { data: data }).then(result => {
      console.log(result);
    })
  }
}
