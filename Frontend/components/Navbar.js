
import React from 'react';
import { Link } from 'react-router-dom';
// ...existing code...
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const Navbar = () => {
  // ...existing code...

  return (
    <nav>
      // ...existing code...
      <Link to="/cart">
        <ShoppingCartIcon />
      </Link>
      // ...existing code...
    </nav>
  );
};

export default Navbar;