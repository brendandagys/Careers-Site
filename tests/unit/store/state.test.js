import state from "@/store/state";

describe("State", () => {
  it("Keeps track of whether or not the user is logged in", () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBe(false);
  });

  it("Stores job listings", () => {
    const startingState = state();
    expect(startingState.jobs).toEqual([]);
  });

  it("Stores organizations that the user would like to filter jobs by", () => {
    const startingState = state();
    expect(startingState.selectedOrganizations).toEqual([]);
  });
});
