import request from "supertest";

describe("Testing Card", () => {
  describe("GET /card/:id", async () => {
    test("Should respond with a 200 status code", async () => {
      const URL = "http://localhost:3000";
      try {
        const response = await request(URL).get("/card/c140fd11-aa81-423a-86df-00c3437e565a").send();
        expect(response.statusCode).toBe(200);
      } catch (e) {
        console.log("Error: ", e);
      }
    });
    test("Should body is a object", async () => {
      try {
        const response = await request(URL).get("/card/c140fd11-aa81-423a-86df-00c3437e565a").send();
        expect(typeof response.body).toBe("object");
      } catch (e) {
        console.log("Error: ", e);
      }
    });
  });
});
