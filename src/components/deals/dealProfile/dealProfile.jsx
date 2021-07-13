import React, { useState, useEffect } from 'react';
import {
  Formik,
  Form,
  Field,
} from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import ErrorsModal from '../../common/errorsModal';
import { apiGet, apiPost } from '../../../apiService';

const DealProfile = () => {
  const { storeId, dealId } = useParams();
  const [deal, setDeal] = useState(null);
  const [myInfo, setMyInfo] = useState(null);
  const [amICustomer, setAmICustomer] = useState(false);
  const [messages, setMessages] = useState([]);
  const [updatedMessages, setUpdatedMessages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const messageValidation = Yup.object({
    text: Yup.string()
      .required(''),
  });

  useEffect(async () => {
    setLoading(true);
    const dealResponse = await apiGet(`/stores/${storeId}/deals/${dealId}`);
    setLoading(false);
    if (dealResponse.data && dealResponse.statusCode === 200) {
      setDeal(dealResponse.data);
      const messagesResponse = await apiGet(`/deals/${dealId}/messages`);
      if (messagesResponse.data && messagesResponse.statusCode === 200) {
        setMessages(messagesResponse.data);
        setUpdatedMessages(true);
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

  useEffect(async () => {
    if (deal) {
      setLoading(true);
      const myInfoResponse = await apiGet('/users/me');
      setLoading(false);
      if (myInfoResponse.data && myInfoResponse.statusCode === 200) {
        setMyInfo(myInfoResponse.data);
        if (deal.customerId === myInfoResponse.data.id) {
          setAmICustomer(true);
        }
      } else if (myInfoResponse.type === 'response' && myInfoResponse.errors) {
        setErrors(myInfoResponse.errors);
      } else {
        setErrors([myInfoResponse]);
      }
    }
  }, [deal]);

  useEffect(async () => {
    if (!updatedMessages) {
      const messagesResponse = await apiGet(`/deals/${dealId}/messages`);
      if (messagesResponse.data && messagesResponse.statusCode === 200) {
        setMessages(messagesResponse.data);
        setUpdatedMessages(true);
      } else if (messagesResponse.type === 'response' && messagesResponse.errors) {
        setErrors(messagesResponse.errors);
      } else {
        setErrors([messagesResponse]);
      }
    }
  }, [updatedMessages]);

  const sendMessage = async (values) => {
    setLoading(true);
    const newMessageResponse = await apiPost(`/deals/${deal.id}/messages`, values);
    setLoading(false);
    if (newMessageResponse.data && newMessageResponse.statusCode === 201) {
      setUpdatedMessages(false);
    } else if (newMessageResponse.type === 'response' && newMessageResponse.errors) {
      setErrors(newMessageResponse.errors);
    } else {
      setErrors([newMessageResponse]);
    }
  };

  if (loading) {
    return (
      <main>
        <h1>Cargando información de acuerdo de compra...</h1>
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
          <figure className="product-in-deal">
            <img src={product.picture || '/default_product_picture.png'} alt={product.name} />
            <figcaption>
              {`${product.name}. Cantidad: ${product.purchase.amount} ${product.unit || 'c/u'}`}
            </figcaption>
          </figure>
        </li>
      ));

    const messagesList = messages
      .map((message) => {
        const isMyMessage = (amICustomer && message.sender === 'customer')
          || (!amICustomer && message.sender === 'store');
        return (
          <li key={message.id} className={isMyMessage ? 'my-message' : 'other-message'}>
            <p>{message.text}</p>
          </li>
        );
      });

    return (
      <main>
        <button type="button">Editar deal</button>
        <button type="button">Eliminar deal</button>
        <section className="deal-main-profile">
          <aside className="deal-info">
            <h1>Productos a comprar</h1>
            <ul>
              {productsList}
            </ul>
          </aside>
          <section className="messages-in-deal">
            <h1>Mensajes</h1>
            <ul>
              {(myInfo && messagesList) ? messagesList : null}
            </ul>
            <Formik
              initialValues={{ text: '' }}
              validationSchema={messageValidation}
              onSubmit={sendMessage}
            >
              {() => (
                <Form className="form-user-inputs">
                  <Field
                    name="text"
                    placeholder="Escribe un mensaje"
                    type="text"
                  />
                </Form>
              )}
            </Formik>
          </section>
        </section>
      </main>
    );
  }
  return (<main />);
};

export default DealProfile;
