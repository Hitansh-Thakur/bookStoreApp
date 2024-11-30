import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import axios from "axios";

import Cards from "./Cards";
function Freebook() {
  const [book, setBook] = useState([]);
  const [categories, setCategories] = useState([
    { id: 1, name: "Fiction" },
    { id: 2, name: "Non-Fiction" },
    { id: 3, name: "Story" },
    { id: 4, name: "Fantasy" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Free");

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        const filteredBooks = res.data.filter((data) => data.category === selectedCategory || (selectedCategory === "Free" && data.category === "Fiction"));
        setBook(filteredBooks);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    // Remove the getCategories function and its call
  }, []);

  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
      
        <div>
          <h2 className="font-semibold text-lg pb-2">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="border p-4 rounded shadow cursor-pointer"
                onClick={() => handleCategoryClick(category.name)}
              >
                <h3 className="font-semibold">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>

        <div>
          {book.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {book.map((item) => (
                <Cards item={item} key={item.id} />
              ))}
            </div>
          ) : (
            <p>No books available in this category at the moment.</p>
          )}
        </div>
      </div>
    </>
  );
}
export default Freebook;
