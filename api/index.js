/**
 * Vercel Serverless Function - MineHR Backend API
 */
export default async (req, res) => {
  try {
    // Import the compiled backend app
    const { default: app } = await import('../backend/dist/index.js');
    
    // Handle the request through Express app
    return app(req, res);
  } catch (err) {
    console.error('Backend Loading Error:', err);
    return res.status(500).json({ 
      error: 'Backend API Error',
      message: err.message,
      nodeVersion: process.version
    });
  }
};
