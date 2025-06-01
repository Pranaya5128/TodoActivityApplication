import React from "react";

type toasterProps = {
  toasterMessage: string;
  isVisible: boolean;
};

const styles = {
  container: {
    position: "fixed" as "fixed",
    top: "30px",
    right: "30px",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "16px 24px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    zIndex: 1000,
  }
};

const Toaster: React.FC<toasterProps> = ({ toasterMessage, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div style={styles.container}>
      {toasterMessage}
    </div>
  );
};

export default Toaster;