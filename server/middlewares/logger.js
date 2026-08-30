const log = (req, res, next) => {
  console.log(`URL: ${req.url}, Method: ${req.method}, Time: ${new Date().toISOString()}`);
  next();
};

export default log;
