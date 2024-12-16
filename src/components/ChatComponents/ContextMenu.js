import React, { forwardRef } from "react";

const ContextMenu = forwardRef(({ position, options, onOptionClick }, ref) => {
  if (!position) return null;

  const handleOptionClick = (e, option) => {
    e.stopPropagation(); // Prevent event from propagating to the document
    if (onOptionClick) {
      onOptionClick(option); // Call the parent handler with the selected option
    }
  };

  return (
    <div
      ref={ref} // Attach ref to the container
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        background: "#fff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "4px",
        zIndex: 1000,
        padding: "10px",
      }}
      onClick={(e) => e.stopPropagation()} // Prevent hiding on click inside menu
    >
      {options.map((option, index) => (
        <div
          key={index}
          style={{
            padding: "5px 10px",
            cursor: "pointer",
            borderBottom: index < options.length - 1 ? "1px solid #ddd" : "none",
          }}
          className="context-options"
          onClick={(e) => handleOptionClick(e, option)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
});

export default ContextMenu;
