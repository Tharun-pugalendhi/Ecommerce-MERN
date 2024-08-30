/* jshint esversion:6 */
import React, { useEffect } from "react";
import "./NewCollections.css";
import new_collection from "../Assets/new_collections";
import Item from "../Item/Item";

const NewCollections = () => {
  useEffect(() => {
    const items = document.querySelectorAll(".item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      items.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <div className="new-collections">
      <h1>Unique Products</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            p={item.p}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
            className="item"
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
