import React from "react";

interface BottomBarProps {
  items?: any[];
}

const BottomBar: React.FC<BottomBarProps> = ({ items = [] }) => {
  // Safe array check - will never crash
  const safeItems = Array.isArray(items) ? items : [];
  const filteredItems = safeItems.filter(item => item != null);
  
  return (
    <div style={{ 
      padding: "10px", 
      background: "#f5f5f5", 
      borderTop: "1px solid #ddd",
      textAlign: "center"
    }}>
      <span>Loaded: {filteredItems.length} candidates</span>
    </div>
  );
};

export default BottomBar;
