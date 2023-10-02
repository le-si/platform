import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test, vitest, afterAll } from "vitest";
import { AccessToken } from "./AccessToken";

// Prevent vitest from loading the User domain (tries to load canvas)
vitest.mock("~/User", () => ({}));

// Mock calls to Auth0
const mockGetAccessTokenSilently = vitest.fn();
const mockLoginWithRedirect = vitest.fn();
vitest.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    isAuthenticated: true,
    getAccessTokenSilently: mockGetAccessTokenSilently,
    loginWithRedirect: mockLoginWithRedirect,
  }),
}));

describe("AccessToken", () => {
  const consoleMock = vitest
    .spyOn(console, "error")
    .mockImplementation(() => undefined);

  afterAll(() => {
    consoleMock.mockRestore();
  });

  test("returns undefined while auth0 is negotiating token", async () => {
    const { result } = renderHook(() => AccessToken.use());

    expect(mockGetAccessTokenSilently).toBeCalled();
    expect(mockLoginWithRedirect).not.toBeCalled();
    expect(console.error).not.toBeCalled();
    expect(result.current).toBeUndefined();
  });

  test("returns token from auth0 once negotiated", async () => {
    const accessToken = "access-token";
    mockGetAccessTokenSilently.mockImplementation(() => accessToken);

    const { result } = renderHook(() => AccessToken.use());
    await waitForValueToChange(() => result.current);

    expect(mockGetAccessTokenSilently).toBeCalled();
    expect(mockLoginWithRedirect).not.toBeCalled();
    expect(console.error).not.toBeCalled();
    expect(result.current).toEqual(accessToken);
  });

  test("initiates re-authentication on error", async () => {
    const mockError = new Error("mock error");
    mockGetAccessTokenSilently.mockImplementation(() => {
      throw mockError;
    });

    renderHook(() => AccessToken.use());

    expect(mockGetAccessTokenSilently).toBeCalled();
    expect(console.error).toBeCalledWith(mockError);
    expect(mockLoginWithRedirect).toHaveBeenCalledWith({
      appState: {
        returnTo: window.location.pathname + window.location.search,
      },
      authorizationParams: {
        audience: "VITE_AUTH0_AUDIENCE",
      },
    });
  });
});

async function waitForValueToChange<T>(getValue: () => T) {
  const original = getValue();

  await waitFor(
    async () => {
      expect(await original).not.toBe(await getValue());
    },
    { timeout: 1_000 }
  );
}
