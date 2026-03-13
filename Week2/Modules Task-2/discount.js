// Available coupons
const coupons = {
'WELCOME10': { type: 'percentage', value: 10, minAmount: 1000 },
'FLAT500': { type: 'flat', value: 500, minAmount: 5000 },
'ELECTRONICS20': { type: 'percentage', value: 20, minAmount: 10000, category: 'electronics' }
};
             
export function validateCoupon(couponCode, cartTotal, cartItems) {
// 1. Check if coupon exists
// 2. Check minimum amount requirement
// 3. Check category requirement (if any)
// Return { valid: true/false, message: '...' }
   const coupon = coupons[couponCode];
    if (!coupon) {
        return { valid: false, message: 'Invalid coupon code' };
    }   
    if (cartTotal < coupon.minAmount) {
        return { valid: false, message: `Minimum cart total of ${coupon.minAmount} required` };
    }
   if (coupon.category) {
    const hasCategoryItem = cartItems.some(item => {return item.category === coupon.category;});

    if (!hasCategoryItem) {
        return { valid: false, message: `Coupon valid only for ${coupon.category} items` };
    }
}
    return { valid: true, message: 'Coupon is valid' };
}

export function calculateDiscount(couponCode, cartTotal) {
// Calculate discount amount based on coupon type
 // Return discount amount
    const coupon = coupons[couponCode];
    if (!coupon) {
        return 0;
    }
    if (coupon.type === 'percentage') {
        return (cartTotal * coupon.value) / 100;
    }
    if (coupon.type === 'flat') {
        return coupon.value;
    }
    return 0;
}

export function applyDiscount(cartTotal, couponCode, cartItems) {
 // 1. Validate coupon
// 2. If valid, calculate discount
// 3. Return final amount and discount details
// Return { 
//   originalTotal: ..., 
//   discount: ..., 
//   finalTotal: ...,
//   message: '...'
// }
    const validation = validateCoupon(couponCode, cartTotal, cartItems);
    if (!validation.valid) {
        return { originalTotal: cartTotal, discount: 0, finalTotal: cartTotal, message: validation.message };
    }
    const discount = calculateDiscount(couponCode, cartTotal);
    const finalTotal = cartTotal - discount;
    return { originalTotal: cartTotal, discount, finalTotal, message: 'Coupon applied successfully'
        };
}

export {applyDiscount}