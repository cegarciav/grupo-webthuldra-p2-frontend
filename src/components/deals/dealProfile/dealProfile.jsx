import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorsModal from '../../common/errorsModal';
import { apiGet } from '../../../apiService';

const DealProfile = () => {
  const { storeId, dealId } = useParams();
  const [deal, setDeal] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(async () => {
    setLoading(true);
    const dealResponse = await apiGet(`/stores/${storeId}/deals/${dealId}`);
    setLoading(false);
    if (dealResponse.data && dealResponse.statusCode === 200) {
      setDeal(dealResponse.data);
      const messagesResponse = await apiGet(`/deals/${dealId}/messages`);
      if (messagesResponse.data && messagesResponse.statusCode === 200) {
        setMessages(messagesResponse.data);
      } else if (messagesResponse.type === 'response' && messagesResponse.errors) {
        setErrors(messagesResponse.errors);
      } else {
        setErrors([messagesResponse]);
      }
    } else if (dealResponse.type === 'response' && dealResponse.errors) {
      setErrors(dealResponse.errors);
    } else {
      setErrors([dealResponse]);
    }
  }, []);

  if (loading) {
    return (
      <main>
        <h1>Cargando información de ususario...</h1>
      </main>
    );
  }
  if (errors) {
    return <ErrorsModal errors={errors} />;
  }

  if (deal) {
    const productsList = deal.products
      .map((product) => (
        <li key={product.id}>
          <h2>{product.name}</h2>
          <p>{`Cantidad: ${product.purchase.amount} ${product.unit || 'c/u'}`}</p>
        </li>
      ));

    const messagesList = messages
      .map((message) => (
        <li key={message.id}>
          <h2>{message.sender}</h2>
          <p>{message.text}</p>
        </li>
      ));

    return (
      <main>
        <button type="button">Editar deal</button>
        <button type="button">Eliminar deal</button>
        <section className="store-main-profile">
          <aside className="store-info">
            <h1>Productos a comprar</h1>
            <ul>
              {productsList}
            </ul>
          </aside>
          <section className="products-in-store">
            <h1>Mensajes</h1>
            <ul>
              {messagesList}
            </ul>
            <input type="text" />
          </section>
        </section>
      </main>
    );
  }
  return (<main />);
};

export default DealProfile;
