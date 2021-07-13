import React, { useEffect, useState } from 'react';
import {
  Link,
  useParams,
} from 'react-router-dom';
import ErrorsModal from '../../common/errorsModal';
import { apiGet } from '../../../apiService';

const ProductProfile = () => {
  const { productId, storeId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(async () => {
    setLoading(true);
    const productResponse = await apiGet(`/stores/${storeId}/products/${productId}`);
    setLoading(false);
    if (productResponse.data && productResponse.statusCode === 200) {
      setProduct(productResponse.data);
    } else if (productResponse.type === 'response' && productResponse.errors) {
      setErrors(productResponse.errors);
    } else {
      setErrors([productResponse]);
    }
  }, []);

  if (loading) {
    return (
      <main>
        <h1>Cargando perfil de la tienda...</h1>
      </main>
    );
  }
  if (errors) {
    return <ErrorsModal errors={errors} />;
  }

  if (product) {
    return (
      <main>
        <section className="return-link">
          <Link
            to={`/stores/${product.storeId}`}
          >
            <i className="material-icons">arrow_back</i>
            Ir a la tienda
          </Link>
        </section>
        <button type="button">Editar producto</button>
        <button type="button">Eliminar producto</button>
        <section className="product-card">
          <figure>
            <img src={product.picture || '/default_product_picture.png'} alt={product.name} />
          </figure>
          <article className="product-info">
            <h1>{product.name}</h1>
            <h3>{`$${product.price} ${product.unit || 'c/u'}`}</h3>
            <h4>{`Disponibles: ${product.stock} ${product.unit || 'unidades'}`}</h4>
            <input type="number" min="0" max={product.stock} />
            <button type="button">Comprar</button>
          </article>
        </section>
      </main>
    );
  }

  return (<main />);
};

export default ProductProfile;
