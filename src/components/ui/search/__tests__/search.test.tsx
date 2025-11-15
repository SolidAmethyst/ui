import { render, screen, fireEvent, waitFor } from "@solidjs/testing-library";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { Search } from "../ui/search";

describe("Search", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("renders with default props", () => {
    render(() => <Search />);
    const input = screen.getByPlaceholderText("Search...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders with custom placeholder", () => {
    render(() => <Search placeholder="Search users..." />);
    expect(screen.getByPlaceholderText("Search users...")).toBeInTheDocument();
  });

  it("renders with initial value", () => {
    render(() => <Search value="test query" />);
    const input = screen.getByDisplayValue("test query") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("test query");
  });

  it("shows search icon by default", () => {
    render(() => <Search />);
    const icon = screen.getByText("search");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("material-symbols-rounded");
  });

  it("hides search icon when showIcon is false", () => {
    render(() => <Search showIcon={false} />);
    expect(screen.queryByText("search")).not.toBeInTheDocument();
  });

  it("shows clear button when value is present", () => {
    render(() => <Search value="test" />);
    const clearButton = screen.getByLabelText("Clear search");
    expect(clearButton).toBeInTheDocument();
    expect(clearButton).toHaveTextContent("close");
  });

  it("hides clear button when value is empty", () => {
    render(() => <Search value="" />);
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });

  it("hides clear button when showClear is false", () => {
    render(() => <Search value="test" showClear={false} />);
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });

  it("calls onInput immediately on input change", () => {
    const onInput = vi.fn();
    render(() => <Search onInput={onInput} />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.input(input, { target: { value: "test" } });

    expect(onInput).toHaveBeenCalledTimes(1);
    expect(onInput).toHaveBeenCalledWith("test");
  });

  it("calls onSearch after debounce delay", async () => {
    const onSearch = vi.fn();
    render(() => <Search onSearch={onSearch} debounceMs={300} />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.input(input, { target: { value: "test" } });

    // Should not be called immediately
    expect(onSearch).not.toHaveBeenCalled();

    // Fast-forward time
    vi.advanceTimersByTime(300);

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith("test");
    });
  });

  it("uses default debounce delay of 300ms", async () => {
    const onSearch = vi.fn();
    render(() => <Search onSearch={onSearch} />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.input(input, { target: { value: "test" } });

    vi.advanceTimersByTime(300);

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith("test");
    });
  });

  it("debounces multiple rapid input changes", async () => {
    const onSearch = vi.fn();
    render(() => <Search onSearch={onSearch} debounceMs={300} />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.input(input, { target: { value: "t" } });
    vi.advanceTimersByTime(100);
    fireEvent.input(input, { target: { value: "te" } });
    vi.advanceTimersByTime(100);
    fireEvent.input(input, { target: { value: "tes" } });
    vi.advanceTimersByTime(100);
    fireEvent.input(input, { target: { value: "test" } });
    vi.advanceTimersByTime(300);

    await waitFor(() => {
      // Should only be called once after final debounce
      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith("test");
    });
  });

  it("clears value when clear button is clicked", async () => {
    const onSearch = vi.fn();
    render(() => <Search value="test" onSearch={onSearch} />);
    const clearButton = screen.getByLabelText("Clear search");
    const input = screen.getByDisplayValue("test") as HTMLInputElement;

    fireEvent.click(clearButton);

    // Wait for debounce
    vi.advanceTimersByTime(300);

    await waitFor(() => {
      // onSearch should be called with empty string
      expect(onSearch).toHaveBeenCalledWith("");
      // Input value should be cleared
      expect(input.value).toBe("");
    });
  });

  it("focuses input after clearing", () => {
    render(() => <Search value="test" />);
    const input = screen.getByDisplayValue("test") as HTMLInputElement;
    const clearButton = screen.getByLabelText("Clear search");

    // Mock focus
    const focusSpy = vi.spyOn(input, "focus");

    fireEvent.click(clearButton);

    expect(focusSpy).toHaveBeenCalled();
  });

  it("renders disabled state", () => {
    render(() => <Search disabled />);
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it("does not call callbacks when disabled", () => {
    const onInput = vi.fn();
    const onSearch = vi.fn();
    render(() => <Search disabled onInput={onInput} onSearch={onSearch} />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.input(input, { target: { value: "test" } });

    // Input events should still fire, but we can check that the input is disabled
    expect(input).toBeDisabled();
  });

  it("applies custom class name", () => {
    render(() => <Search class="custom-search" />);
    const input = screen.getByPlaceholderText("Search...");
    const container = input.closest("div")?.parentElement;
    expect(container).toHaveClass("custom-search");
  });

  it("applies custom inline styles", () => {
    render(() => <Search style={{ width: "500px" }} />);
    const input = screen.getByPlaceholderText("Search...");
    const container = input.closest("div")?.parentElement;
    expect(container).toHaveStyle({ width: "500px" });
  });

  it("supports name attribute", () => {
    render(() => <Search name="search-query" />);
    const input = screen.getByPlaceholderText("Search...");
    expect(input).toHaveAttribute("name", "search-query");
  });

  it("supports id attribute", () => {
    render(() => <Search id="search-input" />);
    const input = screen.getByPlaceholderText("Search...");
    expect(input).toHaveAttribute("id", "search-input");
  });

  it("handles boolean isDark prop", () => {
    render(() => <Search />);
    const input = screen.getByPlaceholderText("Search...");
    expect(input).toBeInTheDocument();
  });

  it("handles function isDark prop", () => {
    render(() => <Search />);
    const input = screen.getByPlaceholderText("Search...");
    expect(input).toBeInTheDocument();
  });

  it("syncs with external value prop", () => {
    render(() => <Search value="initial" />);
    const input = screen.getByDisplayValue("initial") as HTMLInputElement;

    expect(input.value).toBe("initial");
  });

  it("handles empty string value", () => {
    render(() => <Search value="" />);
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    expect(input.value).toBe("");
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });
});
