const errorHandler = (err, req, res, next) => {

console.log("IN ERROR HANDLER:", err)

    // ⚠️⚠️⚠️ CAREFUL ⚠️⚠️⚠️
    // this error handler needs to have 4 parameters defined
    // even if unused, to be considered an Error Handler by Express
    // logger.error(err.message, err);
    // Handle custom error that is thrown when express validator returns errors for passing request bodies
    if (err instanceof BaseBadRequest) {
      return res.status(400).json({ detail: err.message, errors: err.errors });
    }
    // Handle the EmptyResponse thrown from Bookshelf when a db query returns nothing
    if (err instanceof NotFoundError || err instanceof NotFound) {
      return res.status(404).json({ detail: 'Resource not found' });
    }
    if (err instanceof Forbidden) {
      return res.status(403).json({ detail: 'Forbidden' });
    }
    if (err instanceof Unauthorized) {
      return res.status(401).json({ detail: 'Unauthorized' });
    }
    return res.status(500).json({ detail: 'There has been a technical issue. Please call Foodbomb on 1300 309 055' });
  };

module.exports = {errorHandler};
  