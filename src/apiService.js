import axios from 'axios';

const apiOrigin = process.env.REACT_APP_API_ORIGIN;

const apiRequester = axios.create({
  baseURL: apiOrigin,
});

const errorGenerator = (e) => {
  let errorResponse = null;
  if (e.response) {
    errorResponse = {
      errors: e.response.data.errors,
      type: 'response',
      statusCode: e.response.status,
    };
  } else {
    errorResponse = {
      type: 'unexpected',
      message: 'Algo salió mal. Por favor, revisa tu conexión o intenta ingresar más tarde',
    };
  }
  return errorResponse;
};

async function apiGet(path, params) {
  try {
    if (!apiOrigin) throw Error('La conexión con el servidor no ha podido ser establecida');
    const url = new URL(`${apiOrigin}${path}`);
    const token = localStorage.getItem('apiToken');
    let headers = {};
    if (token) headers = { Authorization: `bearer ${token}` };
    if (params) {
      Object.keys(params)
        .forEach((key) => url.searchParams.append(key, params[key]));
    }
    const response = await apiRequester.get(
      url, {
        headers,
      },
    );
    return {
      data: response.data,
      statusCode: response.status,
    };
  } catch (e) {
    return errorGenerator(e);
  }
}

async function apiPost(path, body, params) {
  try {
    if (!apiOrigin) throw Error('La conexión con el servidor no ha podido ser establecida');
    const url = new URL(`${apiOrigin}${path}`);
    const token = localStorage.getItem('apiToken');
    let headers = {};
    if (token) headers = { Authorization: `bearer ${token}` };
    if (params) {
      Object.keys(params)
        .forEach((key) => url.searchParams.append(key, params[key]));
    }
    const response = await apiRequester.post(
      url,
      body, {
        headers,
      },
    );
    return {
      data: response.data,
      statusCode: response.status,
    };
  } catch (e) {
    return errorGenerator(e);
  }
}

async function apiPatch(path, body, params) {
  try {
    if (!apiOrigin) throw Error('La conexión con el servidor no ha podido ser establecida');
    const url = new URL(`${apiOrigin}${path}`);
    const token = localStorage.getItem('apiToken');
    let headers = {};
    if (token) headers = { Authorization: `bearer ${token}` };
    if (params) {
      Object.keys(params)
        .forEach((key) => url.searchParams.append(key, params[key]));
    }
    const response = await apiRequester.patch(
      url,
      body, {
        headers,
      },
    );
    return {
      data: response.data,
      statusCode: response.status,
    };
  } catch (e) {
    return errorGenerator(e);
  }
}

async function apiDelete(path, body, params) {
  try {
    if (!apiOrigin) throw Error('La conexión con el servidor no ha podido ser establecida');
    const url = new URL(`${apiOrigin}${path}`);
    const token = localStorage.getItem('apiToken');
    let headers = {};
    if (token) headers = { Authorization: `bearer ${token}` };
    if (params) {
      Object.keys(params)
        .forEach((key) => url.searchParams.append(key, params[key]));
    }
    const response = await apiRequester.delete(
      url,
      body, {
        headers,
      },
    );
    return {
      data: response.data,
      statusCode: response.status,
    };
  } catch (e) {
    return errorGenerator(e);
  }
}

export {
  apiGet,
  apiPost,
  apiPatch,
  apiDelete,
};
