import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { ProgressBar } from "../ui/progress-bar";

describe("ProgressBar", () => {
  it("renders determinate progress bar", () => {
    render(() => <ProgressBar value={50} />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "50");
    expect(progressBar).toHaveAttribute("aria-valuemin", "0");
    expect(progressBar).toHaveAttribute("aria-valuemax", "100");
  });

  it("renders indeterminate progress bar", () => {
    render(() => <ProgressBar variant="indeterminate" />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).not.toHaveAttribute("aria-valuenow");
  });

  it("clamps value between 0 and 100", () => {
    render(() => <ProgressBar value={150} />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "100");
  });

  it("clamps negative value to 0", () => {
    render(() => <ProgressBar value={-10} />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "0");
  });

  it("shows label when showLabel is true", () => {
    render(() => <ProgressBar value={75} showLabel={true} />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("shows custom label when provided", () => {
    render(() => (
      <ProgressBar value={50} showLabel={true} label="Loading..." />
    ));
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("50%")).not.toBeInTheDocument();
  });

  it("does not show label by default", () => {
    render(() => <ProgressBar value={50} />);
    expect(screen.queryByText("50%")).not.toBeInTheDocument();
  });

  it("applies custom height", () => {
    render(() => <ProgressBar value={50} height="16px" />);
    const container = screen.getByRole("progressbar");
    expect(container).toHaveStyle({ height: "16px" });
  });

  it("applies custom class name", () => {
    render(() => <ProgressBar value={50} class="custom-progress" />);
    const container = screen.getByRole("progressbar");
    expect(container).toHaveClass("custom-progress");
  });

  it("has default height of 8px", () => {
    render(() => <ProgressBar value={50} />);
    const container = screen.getByRole("progressbar");
    expect(container).toHaveStyle({ height: "8px" });
  });

  it("uses determinate variant by default", () => {
    render(() => <ProgressBar value={50} />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "50");
  });

  it("renders track element", () => {
    const { container } = render(() => <ProgressBar value={50} />);
    const track = container.querySelector(".progress-bar-track");
    expect(track).toBeInTheDocument();
  });
});
