import "@testing-library/jest-dom";

// Mock CSS variables for test environment
if (typeof document !== "undefined") {
  // Set default light theme variables
  document.documentElement.style.setProperty("--background", "0 0% 100%");
  document.documentElement.style.setProperty("--foreground", "222.2 84% 4.9%");
  document.documentElement.style.setProperty("--card", "0 0% 100%");
  document.documentElement.style.setProperty(
    "--card-foreground",
    "222.2 84% 4.9%",
  );
  document.documentElement.style.setProperty("--popover", "0 0% 100%");
  document.documentElement.style.setProperty(
    "--popover-foreground",
    "222.2 84% 4.9%",
  );
  document.documentElement.style.setProperty("--primary", "271 81% 53%");
  document.documentElement.style.setProperty("--primary-hover", "271 81% 63%");
  document.documentElement.style.setProperty("--hover-color", "271 100% 58%");
  document.documentElement.style.setProperty(
    "--primary-foreground",
    "210 40% 98%",
  );
  document.documentElement.style.setProperty("--secondary", "210 40% 96%");
  document.documentElement.style.setProperty(
    "--secondary-foreground",
    "222.2 84% 4.9%",
  );
  document.documentElement.style.setProperty("--page-background", "0 0% 100%");
  document.documentElement.style.setProperty("--muted", "240 14% 96%");
  document.documentElement.style.setProperty(
    "--muted-foreground",
    "215.4 16.3% 46.9%",
  );
  document.documentElement.style.setProperty("--accent", "231 95% 66%");
  document.documentElement.style.setProperty(
    "--accent-foreground",
    "210 40% 98%",
  );
  document.documentElement.style.setProperty("--destructive", "0 84.2% 60.2%");
  document.documentElement.style.setProperty(
    "--destructive-foreground",
    "210 40% 98%",
  );
  document.documentElement.style.setProperty("--border", "240 14% 92%");
  document.documentElement.style.setProperty("--input", "214.3 31.8% 91.4%");
  document.documentElement.style.setProperty("--ring", "271 81% 53%");
  document.documentElement.style.setProperty("--radius", "0.5rem");

  // Set default theme to light
  document.documentElement.setAttribute("data-theme", "light");
}
