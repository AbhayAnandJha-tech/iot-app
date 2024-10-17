// src/components/ui/card.tsx
import React from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children }) => {
  return <div className={`border rounded-lg p-4 ${className}`}>{children}</div>;
};

export default Card; // Ensure this is a default export
