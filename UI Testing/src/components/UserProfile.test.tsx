import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserProfile } from "./UserProfile";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("UserProfile component", () => {
  it("renders loading state initially", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise(() => {}))
    );
    render(<UserProfile />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders user profile after successful fetch", async () => {
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Developer",
    };

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUser),
        })
      )
    );

    render(<UserProfile />);

    const profile = await screen.findByTestId("user-profile");
    expect(profile).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
  });

  it("renders empty state when no user data is available", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(null),
        })
      )
    );

    render(<UserProfile />);
    expect(await screen.findByTestId("empty")).toBeInTheDocument();
  });

  it("renders error message on failed fetch", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
        })
      )
    );

    render(<UserProfile />);
    expect(await screen.findByTestId("error")).toBeInTheDocument();
  });

  it("renders error message on network error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("Network error")))
    );

    render(<UserProfile />);
    expect(await screen.findByTestId("error")).toBeInTheDocument();
  });
});
