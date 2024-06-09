const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if(req.err) {
    res.status(400).json({error: true, message: req.err.message});
  }else if(req.data === null) {
    res.status(400).json({error: true, message: 'Data was not found' });
  } else {
    res.status(200).json(req.data);
  }
  next();
};

export { responseMiddleware };
