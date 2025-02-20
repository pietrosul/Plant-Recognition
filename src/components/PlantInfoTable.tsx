import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import {
  Leaf,
  Droplets,
  Sun,
  Thermometer,
  Globe,
  AlertTriangle,
  Sprout,
} from "lucide-react";

import { PlantInfo } from "@/types/plant";

interface PlantInfoTableProps {
  plantInfo?: PlantInfo;
  isLoading?: boolean;
}

const defaultPlantInfo: PlantInfo = {
  name: "Peace Lily",
  species: "Spathiphyllum",
  description:
    "An elegant indoor plant known for its air-purifying qualities and striking white flowers. It's a popular choice for homes and offices.",
  family: "Araceae",
  nativeRegion: "Tropical Americas",
  toxicity: "Mildly toxic to humans and pets if ingested",
  growthHabit: "Clumping, upright growth with arching leaves",
  careRequirements: {
    water: "Keep soil moist but not waterlogged",
    light: "Low to moderate indirect light",
    soil: "Well-draining potting mix",
    temperature: "65-80°F (18-27°C)",
  },
  characteristics: {
    height: "1-4 feet",
    spread: "1-3 feet",
    flowerColor: "White",
    seasonality: "Year-round indoor",
  },
};

const PlantInfoTable: React.FC<PlantInfoTableProps> = ({
  plantInfo = defaultPlantInfo,
  isLoading = false,
}) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      );
    }

    return (
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              Plant Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {plantInfo.name}
                </h3>
                <p className="text-sm text-gray-500 italic">
                  {plantInfo.species}
                </p>
              </div>

              <p className="text-sm text-gray-600">{plantInfo.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Family</p>
                  <p className="text-sm">{plantInfo.family}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Native Region
                  </p>
                  <p className="text-sm">{plantInfo.nativeRegion}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{plantInfo.toxicity}</p>
                </div>
                <div className="flex items-start gap-2">
                  <Sprout className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    {plantInfo.growthHabit}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              Care Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Droplets className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                <span>{plantInfo.careRequirements.water}</span>
              </li>
              <li className="flex items-start gap-2">
                <Sun className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                <span>{plantInfo.careRequirements.light}</span>
              </li>
              <li className="flex items-start gap-2">
                <Leaf className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                <span>{plantInfo.careRequirements.soil}</span>
              </li>
              <li className="flex items-start gap-2">
                <Thermometer className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                <span>{plantInfo.careRequirements.temperature}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-white/80 backdrop-blur-sm border-2 border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg">Characteristics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Height</h4>
                <p className="mt-1">{plantInfo.characteristics.height}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Spread</h4>
                <p className="mt-1">{plantInfo.characteristics.spread}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Flower Color
                </h4>
                <p className="mt-1">{plantInfo.characteristics.flowerColor}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Seasonality
                </h4>
                <p className="mt-1">{plantInfo.characteristics.seasonality}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return renderContent();
};

export default PlantInfoTable;
