import React, { createContext, useState } from "react";

export const DetailsContext = createContext(null);
export default function DetailsProvider({ children }) {
  const [id, setId] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [total, setTotal] = React.useState(0);
  return (
    <DetailsContext.Provider
      value={{
        id,
        setId,
        cartId,
        setCartId,
        total,
        setTotal,
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
}
