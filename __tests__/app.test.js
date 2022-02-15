const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const db = require("../db/connection");

beforeEach(async () => {
  await seed(data);
});

afterAll(async () => {
  await db.end();
});

describe("app", () => {
  describe("GET api/topics", () => {
    test("status: 200, responds with an array of topic objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).toHaveLength(3);
          body.topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
              })
            );
          });
        });
    });
    test("status: 404, responds with path not found", () => {
      return request(app)
        .get("/api/deadend")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Route not found");
        });
    });
  });
  describe("GET /api/articles/:article_id", () => {
    test("status:200, responds with correct article", () => {
      return request(app)
        .get("/api/articles/3")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0]).toEqual({
            article_id: 3,
            title: "Eight pug gifs that remind me of mitch",
            topic: "mitch",
            author: "icellusedkars",
            body: "some gifs",
            created_at: "2020-11-03T09:12:00.000Z",
            votes: 0,
          });
        });
    });
    test("status: 400, responds with invalid request", () => {
      return request(app)
        .get("/api/articles/9999")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("BAD REQUEST");
        });
    });
    test("status: 404, responds with path not found", () => {
      return request(app)
        .get("/api/deadend")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Route not found");
        });
    });
  });
  describe("PATCH /api/articles/:article_id", () => {
    test("status:200, responds with the updated article", () => {
      const updateVote = { inc_votes: 1 };
      return request(app)
        .patch("/api/articles/3")
        .send(updateVote)
        .expect(201)
        .then(({ body }) => {
          expect(body.articles).toEqual({
            article_id: 3,
            title: "Eight pug gifs that remind me of mitch",
            topic: "mitch",
            author: "icellusedkars",
            body: "some gifs",
            created_at: "2020-11-03T09:12:00.000Z",
            votes: 1,
          });
        });
    });
    test("status: 404, responds with path not found", () => {
      return request(app)
        .patch("/api/deadend")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Route not found");
        });
    });
    test("status: 400, responds with invalid request", () => {
      return request(app)
        .get("/api/articles/9999")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("BAD REQUEST");
        });
    });
    test("status: 400, responds with wrong format", () => {
      return request(app)
        .get("/api/articles/vote")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("WRONG FORMAT");
        });
    });
  });
});
