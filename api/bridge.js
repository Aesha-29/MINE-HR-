module.exports = async (req, res) => {
  try {
    const { default: app } = await import('../backend/index.js');
    return app(req, res);
  } catch (error) {
    console.error('Bridge Error:', error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
};
