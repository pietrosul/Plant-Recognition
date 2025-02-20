import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { Card } from "./ui/card";

const AnalyzingOverlay = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 p-8 w-full">
      <div className="flex flex-col items-center space-y-6">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="text-green-500"
        >
          <Leaf size={48} />
        </motion.div>

        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            Analyzing Your Plant
          </h3>
          <p className="text-gray-500">
            Our AI is identifying and gathering information...
          </p>
        </div>

        <motion.div className="w-full max-w-md h-2 bg-gray-100 rounded-full overflow-hidden">
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
    </Card>
  );
};

export default AnalyzingOverlay;
