import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Thermometer } from "lucide-react";
import Card from "../components/ui/card";
import CardContent from "../components/ui/CardContent";
import CardHeader from "../components/ui/CardHeader";
import CardTitle from "../components/ui/CardTitle";

// Define the props type
interface TemperatureCardProps {
  temperature: number;
  tempHistory: { time: string; value: number }[];
}

const TemperatureCard: React.FC<TemperatureCardProps> = ({
  temperature,
  tempHistory,
}) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Thermometer className="h-5 w-5" />
          <span>Temperature Monitor</span>
          <span
            className={`ml-auto text-2xl font-mono ${
              temperature > 30 ? "text-red-500" : "text-green-500"
            }`}
          >
            {temperature}°C
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tempHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 50]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemperatureCard;
