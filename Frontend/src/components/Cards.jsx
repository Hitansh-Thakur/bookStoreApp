import React from "react";
import axios from "axios";

function Cards({ item }) {
  const addToCart = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("Users"))._id;
      console.log(userId);
      console.log({ userId, bookId: item._id });
      
      await axios.post("http://localhost:4001/cart/add", { userId, bookId: item._id });
      alert("Book added to cart");
    } catch (error) {
      console.error("Error adding book to cart", error.response ? error.response.data : error.message);
      alert("Failed to add book to cart");
    }
  };

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img src={`/images/${item.image}`} alt="" className="w-1/2" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between">
              <div className="badge badge-outline">${item.price}</div>
              <div className=" cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
                Buy Now
              </div>
              <button 
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 duration-300"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
