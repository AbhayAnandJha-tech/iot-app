import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertTriangle, Bell } from "lucide-react";
import Card from "../components/ui/card";
import CardContent from "../components/ui/CardContent";
import CardHeader from "../components/ui/CardHeader";
import CardTitle from "../components/ui/CardTitle";

// Define valid alert types
type AlertVariant = "success" | "error" | "warning" | "info";

// Define the structure of an alert
interface AlertType {
  id: number;
  type: AlertVariant; // Updated to use AlertVariant
  message: string;
  timestamp: string;
}

// Define the props for AlertsCard
interface AlertsCardProps {
  alerts: AlertType[];
}

const AlertsCard: React.FC<AlertsCardProps> = ({ alerts }) => {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>Recent Alerts</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {alerts.map((alert) => (
            <Alert key={alert.id} variant={alert.type}>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="ml-2">
                {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
              </AlertTitle>
              <AlertDescription className="ml-2">
                {alert.message}
                <span className="text-sm text-gray-500 ml-2">
                  {alert.timestamp}
                </span>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsCard;
