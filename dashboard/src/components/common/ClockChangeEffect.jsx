import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const ClockChangeEffect = ({ amount, type }) => {
  const controls = useAnimation();

  useEffect(() => {
    // Trigger the animation when the component re-renders
    controls.start({
      y: ["-100%", "0%"], // Change direction from up to down
      opacity: [0, 1],
      transition: {
        y: { duration: 0.6, ease: "easeInOut" },
        opacity: { duration: 0.7, ease: "easeInOut" },
      },
    });
  }, [amount, controls]); // Depend on 'amount' to re-trigger the animation

  return (
    <motion.div
      animate={controls}
      className="relative overflow-hidden borde border-red-900 py-1" // Ensure content doesn't overflow
      //   style={{ height: "2.5em" }} // Adjust height based on your font size
    >
      <motion.p
        className="text-5xl font-black inline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}>
        ${amount}
      </motion.p>
      <p className="text-3xl inline">
        {type === "monthly" ? "" : "  /application"}
      </p>
    </motion.div>
  );
};

export default ClockChangeEffect;
