const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;
let cors = require('cors');

app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];

app.get('/cart/add', (req, res)=> {
    let productId = parseInt(req.query.productId);
    let name = req.query.name;
    let price = req.query.price;
    let quantity = parseInt(req.query.quantity);

    let newItem = {
        productId: productId,
        name: name,
        price: price,
        quantity: quantity
    }
    cart.push(newItem);
    res.json({ cartItems: cart});
})

app.get('/cart/edit', (req, res)=> {
     let productId = parseInt(req.query.productId);
     let quantity = parseInt(req.query.quantity);

     for(let i=0;i<cart.length;i++) {
         if(cart[i].productId === productId) {
             cart[i].quantity=quantity;
         }
     }

     res.json({ cartItems: cart });
})

app.get('/cart/delete', (req, res)=> {
     let productId = parseInt(req.query.productId);
     let filteredCart = cart.filter(ele=>ele.productId!==productId);
     cart=filteredCart;
     res.json({ cartItems: cart});
})

app.get('/cart', (req, res)=> {
    res.json({ cartItems: cart });
})

app.get('/cart/total-quantity', (req, res)=> {
    let totalQuantity = 0;
    for(let i=0;i<cart.length;i++) {
        totalQuantity+=cart[i].quantity;
    }

    res.json({ totalQuantity: totalQuantity });
})

app.get('/cart/total-price', (req, res)=> {
  let totalPrice = 0;
  for(let i=0;i<cart.length;i++) {
      totalPrice+=cart[i].quantity*cart[i].price;
  }

  res.json({ totalPrice: totalPrice });    
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
