import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";

describe("usePreviousAndNextPages", () => {
  it("Calculates the page before the current one", () => {
    const currentPage = { value: 2 };
    const maxPage = { value: 10 };
    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(previousPage.value).toBe(1);
  });

  describe("When the current page is the first page", () => {
    it("Does not provide the previous page", () => {
      const currentPage = { value: 1 };
      const maxPage = { value: 1 };
      const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(previousPage.value).toBeUndefined();
    });
  });

  it("Calculates the page after the current one", () => {
    const currentPage = { value: 8 };
    const maxPage = { value: 10 };
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(nextPage.value).toBe(9);
  });

  describe("When the current page the last page", () => {
    it("Does not provide the next page", () => {
      const currentPage = { value: 8 };
      const maxPage = { value: 8 };
      const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(nextPage.value).toBeUndefined();
    });
  });
});
