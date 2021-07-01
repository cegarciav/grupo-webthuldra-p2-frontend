import React from 'react';
import {
  Link,
  useParams,
} from 'react-router-dom';

const ProductProfile = () => {
  const { productId } = useParams();
  const productInfo = {
    id: productId,
    name: 'Product 1',
    stock: 100,
    price: 500,
    unit: null,
    storeId: '207ff996-34aa-4fb6-90ed-ea57a74d8642',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSsfKHi3iw8M4r6es253TBy0sH_i4D9WSrt23oHNSB5eygGMStKIkKETHNxd2DGhOUHo4&usqp=CAU',
  };
  return (
    <main>
      <section className="return-link">
        <Link
          to={`/stores/${productInfo.storeId}`}
        >
          <i className="material-icons">arrow_back</i>
          Ir a la tienda
        </Link>
      </section>
      <button type="button">Editar producto</button>
      <button type="button">Eliminar producto</button>
      <section className="product-card">
        <figure>
          <img src={productInfo.image} alt={productInfo.name} />
        </figure>
        <article className="product-info">
          <h1>{productInfo.name}</h1>
          <h3>{`$${productInfo.price} ${productInfo.unit || 'c/u'}`}</h3>
          <h4>{`Disponibles: ${productInfo.stock} ${productInfo.unit || 'unidades'}`}</h4>
          <input type="number" min="0" max={productInfo.stock} />
          <button type="button">Comprar</button>
        </article>
      </section>
    </main>
  );
};

export default ProductProfile;
