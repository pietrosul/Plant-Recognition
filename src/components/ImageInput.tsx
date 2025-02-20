import React, { useState, useEffect } from "react";
import { Camera, Upload, X, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface ImageInputProps {
  onImageSelect?: (file: File) => void;
  onImageCapture?: (imageData: string) => void;
  onClear?: () => void;
}

const ImageInput = ({
  onImageSelect = () => {},
  onImageCapture = () => {},
  onClear = () => {},
}: ImageInputProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isLoadingCamera, setIsLoadingCamera] = useState(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        onImageSelect(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    setIsLoadingCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      setVideoStream(stream);
      setShowCamera(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
    } finally {
      setIsLoadingCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      setVideoStream(null);
    }
    setShowCamera(false);
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg");
        setSelectedImage(imageData);
        onImageCapture(imageData);
        stopCamera();
      }
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    stopCamera();
    onClear();
  };

  return (
    <Card className="overflow-hidden border-2 border-gray-100 shadow-lg bg-white/80 backdrop-blur-sm hover:border-green-200 transition-all duration-300">
      <div className="p-6 space-y-6">
        {!showCamera && !selectedImage && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={startCamera}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-6 py-4 h-auto transition-colors duration-300"
              size="lg"
              disabled={isLoadingCamera}
            >
              {isLoadingCamera ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Camera className="w-5 h-5" />
              )}
              Take Photo
            </Button>
            <label className="contents">
              <Button
                variant="outline"
                className="flex items-center gap-2 px-6 py-4 h-auto border-2 hover:border-green-600 hover:text-green-600 transition-colors duration-300"
                size="lg"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Upload className="w-5 h-5" />
                Upload Photo
              </Button>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          </div>
        )}

        {showCamera && (
          <div className="relative rounded-lg overflow-hidden max-w-sm mx-auto">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              onLoadedMetadata={() => setIsLoadingCamera(false)}
              className="w-full rounded-lg"
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
              <Button
                onClick={captureImage}
                className="bg-green-600 hover:bg-green-700 transition-colors duration-300"
                size="lg"
              >
                Capture
              </Button>
              <Button
                onClick={stopCamera}
                variant="outline"
                size="lg"
                className="border-2 hover:bg-white/50 transition-colors duration-300"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {selectedImage && (
          <div className="relative rounded-lg overflow-hidden max-w-sm mx-auto">
            <img
              src={selectedImage}
              alt="Selected plant"
              className="w-full rounded-lg"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300"
              onClick={clearImage}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {!selectedImage && !showCamera && (
          <div className="text-center text-gray-500 py-4">
            <p>Take a photo or upload an image of a plant to get started</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ImageInput;
