function Product({ image, title, category, price }) {
  return (
    <div className="product">
      <img src={image} alt="product" />
      <h3>{title}</h3>
      <p>{category}</p>
      <p>${price}</p>
    </div>
  );
}

export default Product;
