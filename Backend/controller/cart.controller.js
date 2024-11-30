import Cart from "../models/cart.model.js";

export const addToCart = async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.books.push(bookId);
      await cart.save();
    } else {
      await Cart.create({ userId, books: [bookId] });
    }
    res.status(200).json({ message: "Book added to cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("books");
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

