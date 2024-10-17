import React from "react";

type AlertVariant = "success" | "error" | "warning" | "info";

interface AlertProps {
  variant: AlertVariant;
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ variant, children }) => {
  const variantClasses: Record<AlertVariant, string> = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
  };

  return (
    <div className={`p-4 rounded ${variantClasses[variant]}`}>{children}</div>
  );
};

export default Alert;
