import { reduceStock } from './product.js';
import { getCartItems, getCartTotal, clearCart } from './cart.js';
import { applyDiscount } from './discount.js';

export function processPayment(paymentMethod, couponCode = null) {
// 1. Get cart items and total
// 2. Apply discount if coupon provided
// 3. Validate payment method (card/upi/cod)
// 4. Process payment (simulate)
// 5. Reduce stock for all items
// 6. Clear cart
 // 7. Generate order summary
// Return order summary:
// {
//   orderId: ...,
//   items: [...],
//   subtotal: ...,
//   discount: ...,
//   total: ...,
//   paymentMethod: ...,
//   status: 'success/failed',
 // }
const cartItems = getCartItems();
const cartTotal = getCartTotal();
if (cartItems.length === 0) {
return {
            status: 'failed',
            message: 'Cart is empty'
        };
}
let discountDetails = {
originalTotal: cartTotal,
discount: 0,
finalTotal: cartTotal,
message: 'No coupon applied'
};
if (couponCode) {
discountDetails = applyDiscount(cartTotal, couponCode, cartItems);
    }
if (!validatePaymentMethod(paymentMethod)) {
return {
            status: 'failed',
            message: 'Invalid payment method'
        };
}
const paymentSuccess = true;
if (!paymentSuccess) {
return {
            status: 'failed',
            message: 'Payment failed'
        };
}
cartItems.forEach(item => {reduceStock(item.productId, item.quantity); });
clearCart();
const orderSummary = {
        orderId: generateOrderId(),
        items: cartItems,
        subtotal: discountDetails.originalTotal,
        discount: discountDetails.discount,
        total: discountDetails.finalTotal,
        paymentMethod: paymentMethod,
        status: 'success',
        message: 'Order placed successfully'
    };
return orderSummary;
}

export function validatePaymentMethod(method) {
// Check if method is valid (card/upi/cod)
    const validMethods = ['card', 'upi', 'cod'];
    if (validMethods.includes(method)) {
        return true;
    }
    return false;
}

function generateOrderId() {
// Generate random order ID
return 'ORD' + Date.now();
}

export {processPayment }