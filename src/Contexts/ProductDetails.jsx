import React, { createContext, useState } from "react";

export const DetailsContext = createContext(null);
export default function DetailsProvider({ children }) {
  const [id, setId] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [cartProduct, setCartProduct] = useState(null);
  const [newproducts, setNewproducts] = useState(() => {
    const storedProducts = localStorage.getItem("newproducts");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });
  const [total, setTotal] = React.useState(0);

  function addNewProduct(product) {
    setNewproducts((previousProducts) => {
      const updatedProducts = [...previousProducts, product];
      localStorage.setItem("newproducts", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  }
  return (
    <DetailsContext.Provider
      value={{
        id,
        setId,
        cartId,
        setCartId,
        cartProduct,
        setCartProduct,
        newproducts,
        addNewProduct,
        total,
        setTotal,
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
}
