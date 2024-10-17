// src/components/ui/CardHeader.tsx
import React from "react";

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return (
    <div className={`font-bold border-b pb-2 ${className}`}>{children}</div>
  );
};

export default CardHeader;
