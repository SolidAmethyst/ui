// Glow effect for scrollbar containers
export const ScrollbarGlowEffect = () => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "500px",
      height: "400px",
      background:
        "linear-gradient(135deg, rgba(59, 130, 246, 0.6) 0%, rgba(139, 92, 246, 0.6) 50%, rgba(236, 72, 153, 0.6) 100%)",
      "background-size": "200% 200%",
      animation: "gradient-shift 4s ease infinite",
      filter: "blur(40px)",
      opacity: "0.9",
      "z-index": "0",
      "pointer-events": "none",
    }}
  />
);
