const responseMiddleware = (req, res, next) => {
  if(res.data === null) {
    res.status(404).json({error: true, message: res.error });
  }else if(res.error) {
    res.status(400).json({error: true, message: res.error});
  } else {
    res.status(200).json(res.data);
  }
  next();
};

export { responseMiddleware };
