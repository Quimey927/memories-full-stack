import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
      const decodedData = jwt.verify(token, 'secret');

      req.userId = decodedData?.id;
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;
