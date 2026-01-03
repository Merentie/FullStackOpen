const assert = require("node:assert");
const { test, after, beforeEach, describe, before } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 7,
  },
  {
    title: "abc kissa kävelee",
    author: "perttu",
    url: "blog.com",
    likes: 8,
  },
  {
    title: "tikapuita pitkin",
    author: "perttu",
    url: "blog2.com",
    likes: 4,
  },
  {
    title: "on scratch",
    author: "johannes",
    url: "blog3.com",
    likes: 9,
  },
];

const initialUsers = [
  {
    username: "dijk",
    name: "Edsger W. Dijkstra",
    password: "hunter2",
  },
  {
    username: "perttux",
    name: "perttu",
    password: "abc123",
  },
  {
    username: "johku",
    name: "johannes",
    password: "johq",
  },
];

describe("api tests", () => {
  describe("blog tests", () => {
    beforeEach(async () => {
      await Blog.deleteMany({});
      let blogObject = new Blog(initialBlogs[0]);
      await blogObject.save();
      blogObject = new Blog(initialBlogs[1]);
      await blogObject.save();
      blogObject = new Blog(initialBlogs[2]);
      await blogObject.save();
      blogObject = new Blog(initialBlogs[3]);
      await blogObject.save();
    });

    test("all blogs are returned", async () => {
      const response = await api.get("/api/blogs");
      assert.strictEqual(response.body.length, initialBlogs.length);
    });

    test("blogs are returned as json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("verify the unique identifier property of the blog posts is named id and not _id", async () => {
      const response = await api.get("/api/blogs");
      response.body.forEach((blog) => {
        assert.strictEqual(blog.id && !blog._id, true);
      });
    });
    
    describe("adding blogs", () => {
      test("adding blogs works and the number of total blogs increases", async () => {
        const user = await api
          .post("/api/login")
          .send({ username: "johku", password: "johq" });

        const newBlog = {
          title: "on blogging",
          author: "johannes",
          url: "blog4.com",
          likes: 2,
        };
        await api
          .post("/api/blogs")
          .set("Authorization", `Bearer ${user.body.token}`)
          .send(newBlog)
          .expect(201);

        const response = await api.get("/api/blogs");
        assert.strictEqual(response.body.length, initialBlogs.length + 1);
      });

      test("likes are set at 0 by default", async () => {
        const user = await api
          .post("/api/login")
          .send({ username: "johku", password: "johq" });
        const newBlog = {
          title: "how many likes can this blog get???",
          author: "pleaselikeme",
          url: "like.me",
        };
        await api
          .post("/api/blogs")
          .set("Authorization", `Bearer ${user.body.token}`)
          .send(newBlog)
          .expect(201);
        const response = await api.get("/api/blogs");
        addedBlog = response.body[response.body.length - 1];
        assert.strictEqual(addedBlog.likes, 0);
      });

      test("return error if the title or url of a blog is missing", async () => {
        const user = await api
          .post("/api/login")
          .send({ username: "johku", password: "johq" });
        const badBlog = {
          author: "howdoesthiswork",
          likes: 1000,
        };
        await api
          .post("/api/blogs")
          .set("Authorization", `Bearer ${user.body.token}`)
          .send(badBlog)
          .expect(400);
      });

      test("return error if a token is not provided when trying to add a blog", async () => {
        const newBlog = {
          title: "tokentest",
          author: "me",
          url: "token.test",
        };
        await api.post("/api/blogs").send(newBlog).expect(401);
      });
    });

    describe("deleting blogs", () => {
      test("succeeds with status code 204 if id is valid", async () => {
        const user = await api
          .post("/api/login")
          .send({ username: "johku", password: "johq" });
        const newBlog = {
          title: "delete me",
          author: "johku",
          url: "does.not.matter",
        };
        const blogToDelete = await api
          .post("/api/blogs")
          .set("Authorization", `Bearer ${user.body.token}`)
          .send(newBlog)
          .expect(201);
        await api
          .delete(`/api/blogs/${blogToDelete.body.id}`)
          .set("Authorization", `Bearer ${user.body.token}`)
          .expect(204);
      });

      test("return error if no blog is found", async () => {
        const user = await api
          .post("/api/login")
          .send({ username: "johku", password: "johq" });
        await api
          .delete("/api/blogs/111b58e1d22eefc31bae7b24")
          .set("Authorization", `Bearer ${user.body.token}`)
          .expect(404);
      });
    });

    describe("updating blogs", () => {
      test("increase the amount of likes of an blog by 1", async () => {
        const user = await api
          .post("/api/login")
          .send({ username: "johku", password: "johq" });
        const initialResponse = await api.get("/api/blogs");
        const blogToUpdate = initialResponse.body[0];
        await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .set("Authorization", `Bearer ${user.body.token}`)
          .expect(201);
        const updatedResponse = await api.get("/api/blogs");
        assert.strictEqual(
          updatedResponse.body[0].likes,
          initialResponse.body[0].likes + 1
        );
      });
      test("return error if the blog is not found", async () => {
        const user = await api
          .post("/api/login")
          .send({ username: "johku", password: "johq" });
        await api
          .put("/api/blogs/111b58e1d22eefc31bae7b24")
          .set("Authorization", `Bearer ${user.body.token}`)
          .expect(404);
      });
    });
  });

  describe("user tests", () => {
    beforeEach(async () => {
      await User.deleteMany({});
      for (let i = 0; i < initialUsers.length; i++) {
        currentUser = initialUsers[i];
        let passwordHash = await bcrypt.hash(currentUser.password, 10);
        let userObject = new User({
          username: currentUser.username,
          name: currentUser.name,
          passwordHash: passwordHash,
        });
        await userObject.save();
      }
    });
    describe("adding users", () => {
      test("adding blogs works and the number of total users increases", async () => {
        const newUser = {
          username: "user",
          name: "pekka",
          password: "passu",
        };
        await api.post("/api/users").send(newUser).expect(201);
        const response = await api.get("/api/users");
        assert.strictEqual(response.body.length, initialUsers.length + 1);
      });

      test("return error if the username is too short", async () => {
        const newUser = {
          username: "mä",
          name: "pertti",
          password: "12345",
        };
        await api.post("/api/users").send(newUser).expect(400);
      });

      test("return error if the password is too short", async () => {
        const newUser = {
          username: "patsu",
          name: "pate",
          password: "pw",
        };
        await api.post("/api/users").send(newUser).expect(400);
      });

      test("return error if the username is missing", async () => {
        const newUser = {
          name: "patrik",
          password: "passu",
        };
        await api.post("/api/users").send(newUser).expect(400);
      });

      test("return error if the password is missing", async () => {
        const newUser = {
          username: "kuikka",
          name: "patu",
        };
        await api.post("/api/users").send(newUser).expect(400);
      });

      test("return error if the username is already taken", async () => {
        const newUser = {
          username: "johku",
          name: "johq",
          password: "passu",
        };
        await api.post("/api/users").send(newUser).expect(400);
      });
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
