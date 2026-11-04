import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Stage } from "@/design/leritos/stage";

// jsdom has no IntersectionObserver, and the reveal must not depend on one being present.
let lastCallback: IntersectionObserverCallback | undefined;
class FakeObserver implements IntersectionObserver {
  readonly root = null;
  readonly thresholds = [0];
  constructor(callback: IntersectionObserverCallback) {
    lastCallback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}
globalThis.IntersectionObserver = FakeObserver as unknown as typeof IntersectionObserver;
const intersecting = (isIntersecting: boolean) =>
  act(() => lastCallback?.([{ isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver));

describe("Stage reveal", () => {
  it("renders its block hidden and interactive, with the tag and class the layout selects on", () => {
    const { container } = render(
      <Stage className="editorial-section content-width">
        <h2>Making room</h2>
      </Stage>,
    );

    const block = container.querySelector("section.editorial-section.content-width")!;
    expect(block).toHaveAttribute("data-stage", "hidden");
    expect(screen.getByRole("heading", { name: "Making room" })).toBeVisible();
    expect(block.getAttribute("inert")).toBeNull();
  });

  it("keeps the header tag when asked for one", () => {
    const { container } = render(
      <Stage as="header" className="page-intro">
        <p>intro</p>
      </Stage>,
    );

    expect(container.querySelector("header.page-intro")).not.toBeNull();
  });

  it("reveals the block through rendered state when it enters the viewport", () => {
    const { container } = render(
      <Stage as="div" className="next-section">
        <p>next</p>
      </Stage>,
    );

    const block = container.querySelector("div.next-section")!;
    expect(block).toHaveAttribute("data-stage", "hidden");

    intersecting(true);
    expect(block).toHaveAttribute("data-stage", "visible");

    intersecting(false);
    expect(block).toHaveAttribute("data-stage", "hidden");
  });
});
