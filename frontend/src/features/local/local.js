


export const setUserToLocal = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
}

export const getUserFromLocal = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export const clearLocal = () => {
  localStorage.clear();
}

// cart
export const setCartToLocal = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export const getCartFromLocal = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

export const removeCartFromLocal = () => {
  localStorage.removeItem('cart');
}