import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];

export default methods.reduce((acc, method) => {
  acc[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
    const request = superagent[method](path);

    if (params) {
      request.query(params);
    }

    if (data) {
      request.send(data);
    }

    request.end((err, { body } = {}) => {
      return err
        ? reject(body || {_error: err.toString()})
        : resolve(body);
    });
  });
  return acc;
}, {});
