import axios from "axios";
jest.mock("axios");

import getJobs from "@/api/getJobs";

describe("getJobs", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Rust engineer",
        },
      ],
    });
  });

  it("Fetches jobs that candidates can apply to", async () => {
    await getJobs();
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/jobs`
    );
  });

  it("Extracts jobs from response", async () => {
    const data = await getJobs();
    expect(data).toEqual([
      {
        id: 1,
        title: "Rust engineer",
      },
    ]);
  });
});
