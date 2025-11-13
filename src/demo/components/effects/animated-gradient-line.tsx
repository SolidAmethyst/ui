// Animated gradient line component
interface AnimatedGradientLineProps {
  color1: string;
  color2: string;
}

export const AnimatedGradientLine = (props: AnimatedGradientLineProps) => (
  <div
    style={{
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "100%",
      height: "2px",
      background: `linear-gradient(90deg, ${props.color1} 0%, ${props.color2} 50%, ${props.color1} 100%)`,
      "background-size": "200% 100%",
      animation: "gradient-slide 3s ease infinite",
      "border-radius": "1px",
    }}
  />
);
