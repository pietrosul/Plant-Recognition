import React, { useState } from "react";
import ImageInput from "./ImageInput";
import PlantInfoTable from "./PlantInfoTable";
import AnalyzingOverlay from "./AnalyzingOverlay";
import { Card, CardContent } from "./ui/card";
import { Leaf, Camera, Info, Sprout } from "lucide-react";
import Footer from "./Footer";

import { PlantInfo } from "@/types/plant";
import { analyzePlantImage } from "../lib/gemini";

const Home = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [plantInfo, setPlantInfo] = useState<PlantInfo | undefined>();
  const [showHero, setShowHero] = useState(true);

  const handleImageSelect = async (file: File) => {
    setIsAnalyzing(true);
    setPlantInfo(undefined);
    setShowHero(false);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        const result = await analyzePlantImage(base64data);
        setPlantInfo(result);
        setIsAnalyzing(false);
      };
    } catch (error) {
      console.error("Error processing image:", error);
      setIsAnalyzing(false);
    }
  };

  const handleImageCapture = async (imageData: string) => {
    setIsAnalyzing(true);
    setPlantInfo(undefined);
    setShowHero(false);

    try {
      const result = await analyzePlantImage(imageData);
      setPlantInfo(result);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setPlantInfo(undefined);
    setShowHero(true);
  };

  const features = [
    {
      icon: <Camera className="w-6 h-6 text-green-600" />,
      title: "Instant Recognition",
      description:
        "Take a photo or upload an image for immediate plant identification",
    },
    {
      icon: <Info className="w-6 h-6 text-blue-600" />,
      title: "Detailed Information",
      description:
        "Get comprehensive details about care requirements and characteristics",
    },
    {
      icon: <Sprout className="w-6 h-6 text-purple-600" />,
      title: "Expert Care Guide",
      description:
        "Learn how to help your plants thrive with tailored care instructions",
    },
  ];

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-green-50 via-white to-green-50">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {showHero && (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-green-100 blur-lg opacity-75" />
                  <Leaf className="relative w-16 h-16 text-green-600" />
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                Plant Recognition
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                Discover detailed information about any plant by taking a photo
                or uploading an image
              </p>
            </div>

            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="p-3 rounded-full bg-gray-50 ring-1 ring-gray-100">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Main Content */}
        <div className="max-w-3xl mx-auto space-y-8">
          <ImageInput
            onImageSelect={handleImageSelect}
            onImageCapture={handleImageCapture}
            onClear={handleClear}
          />

          {isAnalyzing && <AnalyzingOverlay />}

          {!isAnalyzing && plantInfo && (
            <div className="transition-all duration-300 ease-in-out">
              <PlantInfoTable plantInfo={plantInfo} />
            </div>
          )}

          {!isAnalyzing && !plantInfo && !showHero && (
            <Card className="bg-white/50 backdrop-blur-sm border-2 border-gray-100 p-8 text-center">
              <p className="text-gray-500">
                No plant analysis yet. Take or upload a photo to get started.
              </p>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
