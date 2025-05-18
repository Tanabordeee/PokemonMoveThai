import React, { useEffect, useRef, useState } from "react";

interface SearchDropdownProps {
  moves: string[];
  showDropdown: boolean;
  onSelect: (move: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  moves,
  showDropdown,
  onSelect,
  inputRef,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownWidth, setDropdownWidth] = useState(0);

  useEffect(() => {
    if (showDropdown && inputRef.current) {
      // inputref ใช้เพื่อให้ dropdown มี ความกว้างเท่ากับ input field
      // getBoundingClientRect() เอาพิกัดและขนาดของ input มาใช้งาน
      const inputRect = inputRef.current.getBoundingClientRect();
      setDropdownWidth(inputRect.width);
    }
  }, [showDropdown, inputRef]);

  if (!showDropdown || moves.length === 0) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute z-50 max-h-48 overflow-y-auto rounded border border-gray-300 bg-white shadow-lg"
      style={{ width: dropdownWidth }}
    >
      {moves.map((move, index) => (
        <div
          key={index}
          className="cursor-pointer px-4 py-2 hover:bg-gray-200"
          onMouseDown={() => onSelect(move)}
        >
          {move}
        </div>
      ))}
    </div>
  );
};

export default SearchDropdown;