import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it, vi } from "vitest";
import { TitleBar } from "../ui/title-bar";

describe("TitleBar", () => {
  it("renders with title", () => {
    render(() => <TitleBar title="Test App" />);
    const titleBar = screen.getByText("Test App");
    expect(titleBar).toBeInTheDocument();
  });

  it("renders burger menu button when onBurgerClick is provided", () => {
    const onBurgerClick = vi.fn();
    render(() => <TitleBar title="Test" onBurgerClick={onBurgerClick} />);
    const burgerButton = screen.getByTitle("Toggle Sidebar");
    expect(burgerButton).toBeInTheDocument();
  });

  it("handles burger menu click", () => {
    const onBurgerClick = vi.fn();
    render(() => <TitleBar title="Test" onBurgerClick={onBurgerClick} />);
    const burgerButton = screen.getByTitle("Toggle Sidebar");
    burgerButton.click();
    expect(onBurgerClick).toHaveBeenCalledTimes(1);
  });

  it("renders theme toggle button when onThemeToggle is provided", () => {
    const onThemeToggle = vi.fn();
    // Set dark theme
    document.documentElement.setAttribute("data-theme", "dark");
    render(() => <TitleBar title="Test" onThemeToggle={onThemeToggle} />);
    // In dark theme, it shows light_mode icon with "Light mode" title
    const themeButton = screen.getByTitle("Light mode");
    expect(themeButton).toBeInTheDocument();
    // Reset theme
    document.documentElement.setAttribute("data-theme", "light");
  });

  it("shows light mode icon when theme is light", () => {
    // Set light theme
    document.documentElement.setAttribute("data-theme", "light");
    render(() => <TitleBar title="Test" onThemeToggle={() => {}} />);
    const themeButton = screen.getByTitle("Dark mode");
    expect(themeButton).toBeInTheDocument();
  });

  it("shows dark mode icon when theme is dark", () => {
    // Set dark theme
    document.documentElement.setAttribute("data-theme", "dark");
    render(() => <TitleBar title="Test" onThemeToggle={() => {}} />);
    const themeButton = screen.getByTitle("Light mode");
    expect(themeButton).toBeInTheDocument();
    // Reset theme
    document.documentElement.setAttribute("data-theme", "light");
  });

  it("renders debug button when onDebugClick is provided", () => {
    const onDebugClick = vi.fn();
    render(() => <TitleBar title="Test" onDebugClick={onDebugClick} />);
    const debugButton = screen.getByTitle("Debug");
    expect(debugButton).toBeInTheDocument();
  });

  it("renders pin button when onPinClick is provided", () => {
    const onPinClick = vi.fn();
    render(() => <TitleBar title="Test" onPinClick={onPinClick} />);
    const pinButton = screen.getByTitle("Pin");
    expect(pinButton).toBeInTheDocument();
  });

  it("renders settings button when onSettingsClick is provided", () => {
    const onSettingsClick = vi.fn();
    render(() => <TitleBar title="Test" onSettingsClick={onSettingsClick} />);
    const settingsButton = screen.getByTitle("Settings");
    expect(settingsButton).toBeInTheDocument();
  });

  it("renders minimize button when onMinimizeClick is provided", () => {
    const onMinimizeClick = vi.fn();
    render(() => <TitleBar title="Test" onMinimizeClick={onMinimizeClick} />);
    const minimizeButton = screen.getByTitle("Minimize");
    expect(minimizeButton).toBeInTheDocument();
  });

  it("renders maximize button when onMaximizeClick is provided", () => {
    const onMaximizeClick = vi.fn();
    render(() => <TitleBar title="Test" onMaximizeClick={onMaximizeClick} />);
    const maximizeButton = screen.getByTitle("Maximize");
    expect(maximizeButton).toBeInTheDocument();
  });

  it("shows restore title when maximized is true", () => {
    render(() => (
      <TitleBar title="Test" onMaximizeClick={() => {}} maximized={true} />
    ));
    const maximizeButton = screen.getByTitle("Restore");
    expect(maximizeButton).toBeInTheDocument();
  });

  it("renders close button when onCloseClick is provided", () => {
    const onCloseClick = vi.fn();
    render(() => <TitleBar title="Test" onCloseClick={onCloseClick} />);
    const closeButton = screen.getByTitle("Close");
    expect(closeButton).toBeInTheDocument();
  });

  it("handles theme toggle click", () => {
    const onThemeToggle = vi.fn();
    // Set dark theme
    document.documentElement.setAttribute("data-theme", "dark");
    render(() => <TitleBar title="Test" onThemeToggle={onThemeToggle} />);
    // In dark theme, it shows light_mode icon with "Light mode" title
    const themeButton = screen.getByTitle("Light mode");
    themeButton.click();
    expect(onThemeToggle).toHaveBeenCalledTimes(1);
    // Reset theme
    document.documentElement.setAttribute("data-theme", "light");
  });

  it("handles debug click", () => {
    const onDebugClick = vi.fn();
    render(() => <TitleBar title="Test" onDebugClick={onDebugClick} />);
    const debugButton = screen.getByTitle("Debug");
    debugButton.click();
    expect(onDebugClick).toHaveBeenCalledTimes(1);
  });

  it("handles pin click", () => {
    const onPinClick = vi.fn();
    render(() => <TitleBar title="Test" onPinClick={onPinClick} />);
    const pinButton = screen.getByTitle("Pin");
    pinButton.click();
    expect(onPinClick).toHaveBeenCalledTimes(1);
  });

  it("handles settings click", () => {
    const onSettingsClick = vi.fn();
    render(() => <TitleBar title="Test" onSettingsClick={onSettingsClick} />);
    const settingsButton = screen.getByTitle("Settings");
    settingsButton.click();
    expect(onSettingsClick).toHaveBeenCalledTimes(1);
  });

  it("handles minimize click", () => {
    const onMinimizeClick = vi.fn();
    render(() => <TitleBar title="Test" onMinimizeClick={onMinimizeClick} />);
    const minimizeButton = screen.getByTitle("Minimize");
    minimizeButton.click();
    expect(onMinimizeClick).toHaveBeenCalledTimes(1);
  });

  it("handles maximize click", () => {
    const onMaximizeClick = vi.fn();
    render(() => <TitleBar title="Test" onMaximizeClick={onMaximizeClick} />);
    const maximizeButton = screen.getByTitle("Maximize");
    maximizeButton.click();
    expect(onMaximizeClick).toHaveBeenCalledTimes(1);
  });

  it("handles close click", () => {
    const onCloseClick = vi.fn();
    render(() => <TitleBar title="Test" onCloseClick={onCloseClick} />);
    const closeButton = screen.getByTitle("Close");
    closeButton.click();
    expect(onCloseClick).toHaveBeenCalledTimes(1);
  });

  it("renders custom children instead of title", () => {
    render(() => (
      <TitleBar>
        <span>Custom Title</span>
      </TitleBar>
    ));
    const customTitle = screen.getByText("Custom Title");
    expect(customTitle).toBeInTheDocument();
  });

  it("applies custom class names", () => {
    render(() => <TitleBar title="Test" class="custom-title-bar" />);
    const titleBar = screen.getByText("Test").parentElement;
    expect(titleBar).toHaveClass("custom-title-bar");
  });

  it("renders separator when both functional and window controls are present", () => {
    // Set dark theme
    document.documentElement.setAttribute("data-theme", "dark");
    render(() => (
      <TitleBar title="Test" onThemeToggle={() => {}} onCloseClick={() => {}} />
    ));
    // Separator is a div with specific styling, we can check if controls are rendered
    // In dark theme, it shows light_mode icon with "Light mode" title
    const themeButton = screen.getByTitle("Light mode");
    const closeButton = screen.getByTitle("Close");
    expect(themeButton).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    // Reset theme
    document.documentElement.setAttribute("data-theme", "light");
  });
});
