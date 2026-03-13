import { getProductById, checkStock } from './product.js';
     let cartItems = [];
export function addToCart(productId, quantity) {
 // 1. Get product details
 // 2. Check stock availability
 // 3. Check if product already in cart
 //    - If yes, update quantity
 //    - If no, add new item
 // 4. Return success/error message
   const product = getProductById(productId);
    if (!product) {
        return 'Product not found';
    }
    if (!checkStock(productId, quantity)) {
        return 'Insufficient stock';
    }   
    const cartItem = cartItems.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cartItems.push({ productId, quantity });
    }
    return 'Product added to cart';
}

export function removeFromCart(productId) {
// Remove product from cart
   cartItems = cartItems.filter(item => item.productId !== productId);
return 'Product removed from cart';
}
export function updateQuantity(productId, newQuantity) {
// Update quantity of product in cart
// Check stock before updating
    if (!checkStock(productId, newQuantity)) {
        return 'Insufficient stock';
    }
    const cartItem = cartItems.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity = newQuantity;
        return 'Quantity updated';
    }
}

export function getCartItems() {
   // Return all cart items with product details
     return cartItems.map(item=>{
        const product = getProductById(item.productId);
        return {
            name: product.name,
            price: product.price,
            quantity: item.quantity,
            category: product.category,
            total: product.price * item.quantity
        }
     })
}

 export function getCartTotal() {
// Calculate total price of all items in cart
// Return total
   return cartItems.reduce((total, item) => {
        const product = getProductById(item.productId);
        return total + (product.price * item.quantity);
    }, 0);
 }

 export function clearCart() {
  // Empty the cart
    cartItems = [];
    return 'Cart cleared';
 }

 export {addToCart,getCartItems,getCartTotal,updateQuantity,removeFromCart}