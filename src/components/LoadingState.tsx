import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

const LoadingState = ({
  message = "Analyzing your plant...",
}: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full bg-white p-8 space-y-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="w-12 h-12 text-green-600" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{message}</h3>
        <p className="text-sm text-gray-500">This may take a few moments</p>
      </motion.div>

      <motion.div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-green-500"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingState;
