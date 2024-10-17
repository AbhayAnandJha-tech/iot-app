// src/components/Dashboard.tsx
import React, { useState, useEffect, useCallback } from "react";
import { database } from "./FirebaseSetup";
import { ref, onValue, set } from "firebase/database";
import Navbar from "../components/Navbar";
import TemperatureCard from "../components/TemperatureCard";
import DeviceControls from "../components/DeviceControls";
import AlertsCard from "../components/AlertsCard";

// Define the types for device status and alerts
type DeviceStatus = {
  redLed: boolean;
  greenLed: boolean;
  buzzer: boolean;
  connected: boolean;
};

type Alert = {
  id: number;
  type: string;
  message: string;
  timestamp: string;
};

const Dashboard: React.FC = () => {
  // State management
  const [temperature, setTemperature] = useState<number>(0);
  const [tempHistory, setTempHistory] = useState<
    { time: string; value: number }[]
  >([]);
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>({
    redLed: false,
    greenLed: false,
    buzzer: false,
    connected: false,
  });
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Handle device control
  const toggleDevice = useCallback(
    async (device: string) => {
      try {
        const deviceRef = ref(database, `devices/${device}` as const);
        await set(deviceRef, !deviceStatus[device as keyof DeviceStatus]);
        addAlert(
          "info",
          `${device} toggled ${
            !deviceStatus[device as keyof DeviceStatus] ? "on" : "off"
          }`
        );
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        addAlert("error", `Failed to toggle ${device}: ${errorMessage}`);
      }
    },
    [deviceStatus]
  );

  // Add new alert
  const addAlert = useCallback((type: string, message: string) => {
    const newAlert: Alert = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date().toLocaleString(),
    };
    setAlerts((prev) => [newAlert, ...prev].slice(0, 10));
  }, []);

  // Firebase real-time listeners
  useEffect(() => {
    const temperatureRef = ref(database, "sensors/temperature");
    const devicesRef = ref(database, "devices");
    const connectionRef = ref(database, ".info/connected");

    const unsubscribeTemp = onValue(temperatureRef, (snapshot) => {
      const temp = snapshot.val();
      setTemperature(temp);
      setTempHistory((prev) =>
        [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            value: temp,
          },
        ].slice(-20)
      );

      if (temp > 30) {
        addAlert("warning", `High temperature detected: ${temp}°C`);
      }
    });

    const unsubscribeDevices = onValue(devicesRef, (snapshot) => {
      const devices = snapshot.val();
      setDeviceStatus((prev) => ({
        ...prev,
        ...devices,
      }));
    });

    const unsubscribeConnection = onValue(connectionRef, (snapshot) => {
      const connected = snapshot.val();
      setDeviceStatus((prev) => ({
        ...prev,
        connected,
      }));
      addAlert(
        connected ? "success" : "error",
        `Device ${connected ? "connected" : "disconnected"}`
      );
    });

    return () => {
      unsubscribeTemp();
      unsubscribeDevices();
      unsubscribeConnection();
    };
  }, [addAlert]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar deviceStatus={deviceStatus} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TemperatureCard
            temperature={temperature}
            tempHistory={tempHistory}
          />
          <DeviceControls
            deviceStatus={deviceStatus}
            toggleDevice={toggleDevice}
          />
          <AlertsCard alerts={alerts} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
