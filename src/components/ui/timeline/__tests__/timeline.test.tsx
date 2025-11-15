import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { Timeline } from "../ui/timeline";
import type { TimelineEvent } from "../model/types";

describe("Timeline", () => {
  const mockEvents: TimelineEvent[] = [
    {
      id: "1",
      title: "Event 1",
      description: "Description 1",
      date: "2024-01-01",
      variant: "default",
    },
    {
      id: "2",
      title: "Event 2",
      description: "Description 2",
      date: "2024-01-02",
      variant: "success",
    },
  ];

  it("renders timeline with events", () => {
    render(() => <Timeline events={mockEvents} />);
    expect(screen.getByText("Event 1")).toBeInTheDocument();
    expect(screen.getByText("Event 2")).toBeInTheDocument();
  });

  it("renders event descriptions", () => {
    render(() => <Timeline events={mockEvents} />);
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
  });

  it("renders event dates when showDate is true", () => {
    render(() => <Timeline events={mockEvents} showDate={true} />);
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
    expect(screen.getByText("2024-01-02")).toBeInTheDocument();
  });

  it("hides event dates when showDate is false", () => {
    render(() => <Timeline events={mockEvents} showDate={false} />);
    expect(screen.queryByText("2024-01-01")).not.toBeInTheDocument();
    expect(screen.queryByText("2024-01-02")).not.toBeInTheDocument();
  });

  it("renders with vertical orientation by default", () => {
    render(() => <Timeline events={mockEvents} />);
    const container = screen.getByText("Event 1").closest(".timeline");
    expect(container).toHaveClass("timeline-vertical");
  });

  it("renders with horizontal orientation", () => {
    render(() => <Timeline events={mockEvents} orientation="horizontal" />);
    const container = screen.getByText("Event 1").closest(".timeline");
    expect(container).toHaveClass("timeline-horizontal");
  });

  it("renders custom icon when provided", () => {
    const eventsWithIcon: TimelineEvent[] = [
      {
        id: "1",
        title: "Event 1",
        icon: "star",
      },
    ];
    render(() => <Timeline events={eventsWithIcon} />);
    expect(screen.getByText("star")).toBeInTheDocument();
  });

  it("renders default icon based on variant", () => {
    const eventsWithVariant: TimelineEvent[] = [
      {
        id: "1",
        title: "Event 1",
        variant: "success",
      },
    ];
    render(() => <Timeline events={eventsWithVariant} />);
    expect(screen.getByText("check_circle")).toBeInTheDocument();
  });

  it("applies custom class name", () => {
    render(() => <Timeline events={mockEvents} class="custom-timeline" />);
    const container = screen.getByText("Event 1").closest(".timeline");
    expect(container).toHaveClass("custom-timeline");
  });

  it("renders custom content when provided", () => {
    const eventsWithContent: TimelineEvent[] = [
      {
        id: "1",
        title: "Event 1",
        content: <div data-testid="custom-content">Custom Content</div>,
      },
    ];
    render(() => <Timeline events={eventsWithContent} />);
    expect(screen.getByTestId("custom-content")).toBeInTheDocument();
  });
});
