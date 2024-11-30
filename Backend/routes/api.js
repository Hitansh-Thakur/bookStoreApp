
import express from 'express';
import Cart from '../models/cart.model.js';
// ...existing code...

const router = express.Router();

// ...existing code...

router.get('/cart/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('books');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ...existing code...

export default router;