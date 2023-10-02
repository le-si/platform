import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test, vitest } from "vitest";
import { AccessToken } from "./AccessToken";

// Prevent vitest from loading the User domain (tries to load canvas)
vitest.mock("~/User", () => ({}));

// Mock calls to Auth0
const getAccessTokenSilently = vitest.fn();
const loginWithRedirect = vitest.fn();
vitest.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    getAccessTokenSilently,
    isAuthenticated: true,
    loginWithRedirect,
  }),
}));

describe("AccessToken", () => {
  test("returns undefined while auth0 is negotiating token", async () => {
    const { result } = renderHook(() => AccessToken.use());

    expect(getAccessTokenSilently).toBeCalled();
    expect(loginWithRedirect).not.toBeCalled();
    expect(result.current).toBeUndefined();
  });

  test("returns token from auth0 once negotiated", async () => {
    const accessToken = "access-token";
    getAccessTokenSilently.mockImplementation(() => accessToken);

    const { result } = renderHook(() => AccessToken.use());
    await waitForValueToChange(() => result.current);

    expect(getAccessTokenSilently).toBeCalled();
    expect(loginWithRedirect).not.toBeCalled();
    expect(result.current).toEqual(accessToken);
  });

  test("initiates re-authentication on error", async () => {
    getAccessTokenSilently.mockImplementation(() => {
      throw new Error("expired tokens");
    });

    renderHook(() => AccessToken.use());

    expect(getAccessTokenSilently).toBeCalled();
    expect(loginWithRedirect).toHaveBeenCalledWith({
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
