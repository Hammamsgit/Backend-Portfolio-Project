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
          expect(body.article).toEqual(
            expect.objectContaining({
            article_id: 3,
            title: "Eight pug gifs that remind me of mitch",
            topic: "mitch",
            author: "icellusedkars",
            body: "some gifs",
            created_at: "2020-11-03T09:12:00.000Z",
            votes: 0,
          })
        )
        });
    });
    test("status:200, responds with correct article with additional comment count", () => {
      return request(app)
        .get("/api/articles/3")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual({
            article_id: 3,
            title: "Eight pug gifs that remind me of mitch",
            topic: "mitch",
            author: "icellusedkars",
            body: "some gifs",
            created_at: "2020-11-03T09:12:00.000Z",
            votes: 0,
            comment_count: 2,
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
      const updateVote = { inc_votes: "1" };
      return request(app)
        .patch("/api/articles/3")
        .send(updateVote)
        .expect(201)
        .then(({ body }) => {
          expect(body.article).toEqual({
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

    test("status: 400, responds with Bad request when given wrong data value i.e. string", () => {
      const updateVote = { inc_votes: "thIs is a string" };
      return request(app)
        .patch("/api/articles/3")
        .send(updateVote)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
    test("status: 404, responds with not found", () => {
      return request(app)
        .patch("/api/articles/9999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Article not found");
        });
    });
    test("status: 400, responds with invalid input when wrong key input", () => {
      const updateVote = { inc_votest: 1 };
      return request(app)
        .patch("/api/articles/3")
        .send(updateVote)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("invalid input");
        });
    });
    test("status: 400, responds with invalid input when multiple keys input", () => {
      const updateVote = { inc_votes: 1, author: "james" };
      return request(app)
        .patch("/api/articles/3")
        .send(updateVote)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid input");
        });
    });
    test("status: 400, responds with invalid input when body is empty ", () => {
      const updateVote = {};
      return request(app)
        .patch("/api/articles/3")
        .send(updateVote)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("invalid input");
        });
    });
  });
  describe("GET api/users", () => {
    test("status: 200, responds with an array of user objects", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body.users).toHaveLength(4);
          body.users.forEach((user) => {
            expect(user).toEqual(
              expect.objectContaining({
                username: expect.any(String),
              })
            );
          });
        });
    });
  });
  describe("GET api/articles", () => {
    test("status: 200, responds with an array of article objects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toHaveLength(12);
          body.articles.forEach((article) => {
            expect(article).toEqual(
              expect.objectContaining({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
              })
            );
          });
        });
    });
    test("status:200, array of article objects sorted by date/descending order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });
    test("status: 200, responds with an array of article objects with comment count", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toHaveLength(12);
          body.articles.forEach((article) => {
            expect(article).toEqual(
              expect.objectContaining({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(Number),
              })
            );
          });
        });
    });
  });
  describe("GET /api/articles/:article_id/comments", () => {
    test("status:200, responds with an array of comments for relevant article id", () => {
      return request(app)
        .get("/api/articles/3/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toHaveLength(2);
          body.comments.forEach((comment) => {
            expect(comment).toEqual(
              expect.objectContaining({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
              })
            );
          });
        });
    });
    test("status: 400, responds with invalid request", () => {
      return request(app)
        .get("/api/articles/9999/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Article not found");
        });
    });
  });
});
