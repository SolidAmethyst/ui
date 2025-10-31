export function useScrollbarObservers(
  containerRef: () => HTMLDivElement | undefined,
  contentRef: () => HTMLDivElement | undefined,
  updateCallback: () => void,
) {
  const setupObservers = () => {
    if (!containerRef() || !contentRef()) return;

    // ResizeObserver to update on size changes
    const resizeObserver = new ResizeObserver(() => {
      updateCallback();
    });
    resizeObserver.observe(contentRef()!);
    resizeObserver.observe(containerRef()!);

    // MutationObserver to track content changes
    const mutationObserver = new MutationObserver(() => {
      updateCallback();
      // Additional update for full content load
      setTimeout(updateCallback, 10);
    });
    mutationObserver.observe(contentRef()!, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  };

  return { setupObservers };
}
