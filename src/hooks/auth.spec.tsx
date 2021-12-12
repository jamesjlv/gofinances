import "jest-fetch-mock";

import { renderHook, act } from "@testing-library/react-hooks";
import { mocked } from "ts-jest/utils";
import { AuthProvider, useAuth } from "./auth";
import { startAsync } from "expo-auth-session";
import fetchMock from "jest-fetch-mock";
import * as mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("expo-auth-session");
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

fetchMock.enableMocks();

describe("Auth Hook", () => {
  it("Should be able to sign in with a existing Google Account", async () => {
    const googleMocked = mocked(startAsync as any);

    googleMocked.mockReturnValueOnce({
      type: "success",
      params: {
        access_token: "any_token",
      },
    });

    //Agora que temos o Token, vamos mockar a requisição ttp dos dados de profile do usuário.
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: "any_id",
        email: "james.leal2@gmail.com",
        name: "James Leal",
        photo: "any_photo.png",
      })
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());
    console.log("USER PROFILE =>", result.current.user);

    expect(result.current.user.email).toBe("james.leal2@gmail.com");
  });

  it("Should not connect if cancel sign in with Google Account", async () => {
    const googleMocked = mocked(startAsync as any);

    googleMocked.mockReturnValueOnce({
      type: "cancel",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty("id");
  });
});
