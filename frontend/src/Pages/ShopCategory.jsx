/* jshint esversion:6 */
import React, { useContext, useState } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortOrder, setSortOrder] = useState("low-to-high");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Function to handle sorting order change
  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  // Function to handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Function to sort and filter products based on the selected order and category
  const sortedProducts = () => {
    return (
      all_product
        .filter(
          (item) =>
            item.category === props.category ||
            item.category === selectedCategory
        )
        // .filter(
        //   (item) =>
        //     selectedCategory === "all" || item.category === selectedCategory
        // )
        .sort((a, b) => {
          if (sortOrder === "low-to-high") {
            return a.new_price - b.new_price;
          } else {
            return b.new_price - a.new_price;
          }
        })
    );
  };

  return (
    <div className="shop-category" style={{ backgroundColor: "#F7EFE5" }}>
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {sortedProducts().length} products
        </p>
        <div className="shopcategory-sort">
          <div className="sort-by">
            <strong className="sort-label">Sort by</strong>
            <select onChange={(e) => handleSortOrderChange(e.target.value)}>
              <option
                value="low-to-high"
                style={{ backgroundColor: "#C8A1E0" }}
              >
                Low to High
              </option>
              <option
                value="high-to-low"
                style={{ backgroundColor: "#C8A1E0" }}
              >
                High to Low
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="shopcategory-products">
        {sortedProducts()
          .slice(0, 12)
          .map((item, i) => (
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
  );
};

export default ShopCategory;

// import React, { useContext, useState } from "react";
// import "./CSS/ShopCategory.css";
// import { ShopContext } from "../Context/ShopContext";
// import dropdown_icon from "../Components/Assets/dropdown_icon.png";
// import Item from "../Components/Item/Item";

// const ShopCategory = (props) => {
//   const { all_product } = useContext(ShopContext);
//   const [sortOrder, setSortOrder] = useState("low-to-high");

//   // Function to handle sorting order change
//   const handleSortOrderChange = (order) => {
//     setSortOrder(order);
//   };

//   // Function to sort products based on the selected order
//   const sortedProducts = () => {
//     return all_product
//       .filter((item) => item.category === props.category)
//       .sort((a, b) => {
//         if (sortOrder === "low-to-high") {
//           return a.new_price - b.new_price;
//         } else {
//           return b.new_price - a.new_price;
//         }
//       });
//   };

//   return (
//     <div className="shop-category">
//       <div className="shopcategory-indexSort">
//         <p>
//           <span>Showing 1-12</span> out of {sortedProducts().length} products
//         </p>
//         <div className="shopcategory-sort">
//           <strong className="sort-label">Sort by</strong>
//           <select onChange={(e) => handleSortOrderChange(e.target.value)}>
//             <option value="low-to-high" style={{ backgroundColor: "#626262" }}>
//               {" "}
//               Low to High{" "}
//             </option>
//             <option value="high-to-low" style={{ backgroundColor: "#626262" }}>
//               {" "}
//               High to Low{" "}
//             </option>
//           </select>
//         </div>
//       </div>
//       <div className="shopcategory-products">
//         {sortedProducts()
//           .slice(0, 12)
//           .map((item, i) => (
//             <Item
//               key={i}
//               id={item.id}
//               name={item.name}
//               image={item.image}
//               new_price={item.new_price}
//               old_price={item.old_price}
//             />
//           ))}
//       </div>
//       <div className="shopcategory-loadmore">Explore More</div>
//     </div>
//   );
// };

// export default ShopCategory;
