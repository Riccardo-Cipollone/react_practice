/* eslint-disable react/prop-types */
import { useContext } from "react";
import MenuContext from "./MenuProvider";

function MenuItem({ item }) {
  const { openItems, toggleItem } = useContext(MenuContext);
  // const [isOpen, setIsOpen] = useState(false);
  // ? Verify if the section has children or not
  const hasChildren = item.children && item.children.length > 0;

  // Open and close children items
  // function toggleOpen() {
  //   setIsOpen(!isOpen);
  // }

  function handleToggle() {
    if (hasChildren) {
      toggleItem(item.id);
    }
  }

  return (
    <li className={`border-b border-gray-200 relative ${hasChildren ? 'horizontal-line-item-with-children' : 'horizontal-line-item'}`}>
      <div className={`px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 ${hasChildren ? "font-semibold" : ""}`}
        // onClick={hasChildren ? toggleOpen : undefined}
        onClick={hasChildren ? handleToggle : undefined}
      >
        {item.label}
        {hasChildren && <span className="text-sm pl-4">{openItems[item.id] ? "-" : "+"}</span>}
      </div>
      {hasChildren && (
        // To persist open state, either use CSS classes or maybe reactContext? idk
        <ul className={`pl-8 parent-to-child-line ${openItems[item.id] ? "block" : "hidden"}`}>
          {item.children.map((child) => (
            <MenuItem key={child.id} item={child}/>
          ))}
        </ul>
      )}
    </li>
  );
}

function Menu({ items = [] }) {
  return (
    <ul>
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default Menu;
