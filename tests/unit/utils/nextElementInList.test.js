import nextElementInList from "@/utils/nextElementInList";

describe("nextElementInList", () => {
  it("Locates element in list and returns the next element in the list", () => {
    const list = ["A", "B", "C", "D", "E"];
    const value = "C";
    const result = nextElementInList(list, value);
    expect(result).toBe("D");
  });

  describe("When element is at the end of the list", () => {
    it("Locates next element at the start of the list", () => {
      const list = ["A", "B", "C", "D", "E"];
      const value = "E";
      const result = nextElementInList(list, value);
      expect(result).toBe("A");
    });
  });
});
