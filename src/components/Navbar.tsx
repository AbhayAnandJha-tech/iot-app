// src/components/Navbar.tsx
import React from "react";
import { Activity, Power, Settings } from "lucide-react";

// Define the type for device status
type DeviceStatus = {
  redLed: boolean;
  greenLed: boolean;
  buzzer: boolean;
  connected: boolean;
};

// Define the props interface for Navbar
interface NavbarProps {
  deviceStatus: DeviceStatus;
}

const Navbar: React.FC<NavbarProps> = ({ deviceStatus }) => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Activity className="h-8 w-8 text-blue-500" />
          <span className="ml-2 text-xl font-semibold">IoT Dashboard</span>
        </div>
        <div className="flex items-center space-x-4">
          <div
            className={`flex items-center px-3 py-1 rounded-full ${
              deviceStatus.connected
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            <Power className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">
              {deviceStatus.connected ? "Connected" : "Offline"}
            </span>
          </div>
          <Settings className="h-6 w-6 text-gray-500 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
