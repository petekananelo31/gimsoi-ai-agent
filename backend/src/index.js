require('dotenv').config();
const express = require('express');
const { rbacMiddleware } = require('./middleware/rbac');
const app = express();

app.use(express.json());

// Main Endpoint for your teammate
app.get('/ai/sprint-summary', rbacMiddleware, async (req, res) => {
  try {
    // Logic to call your AI service will go here
    res.json({ message: "GIMSOI AI Engine Online", status: "Ready for 18h00" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3400;
app.listen(PORT, () => console.log(`GIMSOI Backend running on port ${PORT}`));