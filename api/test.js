/**
 * Absolute Minimal CJS API test.
 */
module.exports = (req, res) => {
  res.status(200).json({
    message: "Simple CJS Test Successful",
    env: process.env.NODE_ENV
  });
};
