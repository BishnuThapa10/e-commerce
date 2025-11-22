

export const formatPrice = (price) => {
  return `Rs. ${Number(price).toLocaleString('en-IN', { minimumFractionDigits: 2})}`;
};