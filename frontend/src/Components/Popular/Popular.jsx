/* jshint esversion:6 */
import React from "react";
import "./Popular.css";
import data_product from "../Assets/data";
import Item from "../Item/Item";

const Popular = () => {
  // Duplicate the items to create a seamless loop
  const items = [...data_product, ...data_product];

  return (
    <div className="popular">
      <h1>Special Products</h1>
      <hr />
      <div className="popular-item-container">
        <div className="popular-item">
          {items.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popular;
