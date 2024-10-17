// src/components/DeviceControls.tsx
import React from "react";
import { Activity } from "lucide-react";
import Card from "../components/ui/card";
import CardContent from "../components/ui/CardContent";
import CardHeader from "../components/ui/CardHeader";
import CardTitle from "../components/ui/CardTitle";

interface DeviceControlsProps {
  deviceStatus: {
    [key: string]: boolean; // Adjust this if you want strict types
  };
  toggleDevice: (device: keyof DeviceStatus) => Promise<void>; // Ensure this is set to keyof DeviceStatus
}

const DeviceControls: React.FC<DeviceControlsProps> = ({
  deviceStatus,
  toggleDevice,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {["redLed", "greenLed", "buzzer"].map((device) => (
          <button
            key={device}
            onClick={() => toggleDevice(device as keyof DeviceStatus)} // Type assertion
            className={`w-full p-4 rounded-lg flex items-center justify-between transition-colors ${
              deviceStatus[device]
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span className="capitalize">
              {device.replace(/([A-Z])/g, " $1")}
            </span>
            <Activity
              className={`h-5 w-5 ${
                deviceStatus[device] ? "animate-pulse" : ""
              }`}
            />
          </button>
        ))}
      </CardContent>
    </Card>
  );
};

export default DeviceControls;
