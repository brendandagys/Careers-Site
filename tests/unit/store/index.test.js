import { state, mutations } from "@/store";

describe("State", () => {
  it("Keeps track of whether or not the user is logged in", () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBe(false);
  });
});

describe("Mutations", () => {
  describe("LOGIN_USER", () => {
    it("Logs the user in", () => {
      const state = { isLoggedIn: false };
      mutations.LOGIN_USER(state);
      expect(state).toEqual({ isLoggedIn: true });
    });
  });
});
