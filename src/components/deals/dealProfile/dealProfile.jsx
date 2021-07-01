import React from 'react';

const DealProfile = () => {
  const dealInfo = {
    id: '317ff996-34aa-4fb6-90ed-ea57a74d8642',
    status: 'abierto',
    storeId: '207ff996-34aa-4fb6-90ed-ea57a74d8642',
    customerId: '8e67c890-e293-4c8f-af99-1ea3e89ad4c5',
    store: {
      id: '207ff996-34aa-4fb6-90ed-ea57a74d8642',
      address: 'Dirección 1',
      name: 'Una tienda 1',
      image: 'https://cdn.geekwire.com/wp-content/uploads/2020/02/amzngo1.jpeg',
      description: 'Descripción de la tienda 1',
      ownerId: 'ceeaa745-fdc1-4679-89c0-bb1a15f36f43',
    },
    customer: {
      id: '8e67c890-e293-4c8f-af99-1ea3e89ad4c5',
      firstName: 'Nombre 1',
      lastName: 'Apellido 1',
      email: 'test1@test.com',
      image: 'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
    },
    messages: [{
      id: '5354d4e8-f900-4f9b-9cd0-d351edeca84e',
      text: 'Primer mensaje',
      sender: 'store',
      senderId: '207ff996-34aa-4fb6-90ed-ea57a74d8642',
    }, {
      id: '5fac18fc-cdaf-4cc0-9bf5-6085f2bd7e14',
      text: 'Segundo mensaje',
      sender: 'customer',
      senderId: '8e67c890-e293-4c8f-af99-1ea3e89ad4c5',
    }],
    products: [{
      id: '4c74458e-f05a-4729-8f36-7836552eef33',
      name: 'Product 1',
      purchase: {
        amount: 5,
      },
      price: 500,
      unit: null,
    }, {
      id: '4c74458e-f05a-4729-8f36-7836552eef34',
      name: 'Product 2',
      purchase: {
        amount: 1,
      },
      price: 5000,
      unit: 'kg',
      storeId: '207ff996-34aa-4fb6-90ed-ea57a74d8642',
    }],
  };

  const productsList = dealInfo.products
    .map((product) => (
      <li key={product.id}>
        <h2>{product.name}</h2>
        <p>{`Cantidad: ${product.purchase.amount} ${product.unit || 'c/u'}`}</p>
      </li>
    ));

  const messagesList = dealInfo.messages
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
};

export default DealProfile;
