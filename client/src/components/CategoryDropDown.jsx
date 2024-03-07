import { useState, useRef, useEffect } from "react";
import DropDownCategories from "./DropDownCategories";



function CategoryDropDown() {
  const [dropdown, setDropdown] = useState(false)
  const divRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [divRef])

  function handleDropDown() {
    setDropdown(!dropdown)
  }

  return (
    <div className="category-container" ref={divRef}>
      <div className="category-trigger"></div>
      <div className="hamburger-container" onClick={handleDropDown}>
        <div className="hamburger-icon"></div>
        <div className="hamburger-icon"></div>
        <div className="hamburger-icon"></div>
      </div>
        {dropdown && (
          <DropDownCategories />
        )}
    </div>
  );
}

export default CategoryDropDown;