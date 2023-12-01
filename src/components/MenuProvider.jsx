/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const MenuContext = createContext();
export default MenuContext;

export function MenuContextProvider({ children }) {
  const [openItems, setOpenItems] = useState({});

  function toggleItem(id) {
    setOpenItems((prevOpenItems) => {
        const newMenuState = { ...prevOpenItems, [id]: !prevOpenItems[id] };
        console.log("New Menu State: ", newMenuState);
        return newMenuState;
    })
  }

  return (
    <MenuContext.Provider value={{ openItems, toggleItem }}>
      {children}
    </MenuContext.Provider>
  );
}
