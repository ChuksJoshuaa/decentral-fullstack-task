import Post from "../models/post.js";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import should from "should";

chai.use(chaiHttp);

const token = process.env.TOKEN;

//Our parent block
describe("Posts", () => {
  beforeEach((done) => {
    //Before each test we empty the database
    Post.remove({}, (err) => {
      done();
    });
  });

  // Test the /GET route
  describe("/GET Posts", () => {
    it("it should GET all the posts", (done) => {
      chai
        .request(app)
        .get("/api/v1/posts")
        .end((err, res) => {
          should(res.body).not.have.property("err");
          should(res.status).be.equal(200);
          should(res.body).be.Object;
          should(res.body).have.property("posts");
          should(res.body).have.property("count");
          done();
        });
    });
  });

  //Testing the Single /GET route
  describe("/GET/:id post", () => {
    it("it should GET a post by the given id", (done) => {
      let post = new Post({
        title: "Natural language processing for contracts",
        description:
          "Manage high touch conversations in parallel. Drive engagement across your community. Build long term relationships with investors. Create personalized messages. that build trust. Demo at ETH SF with ZK-Starks, viewable on Youtube",
        imageUrl:
          "https://ondecentral.com/static/4a73444ed18da690ecdb083b7929ae58/03d34/zkstark.webp",
        authorId: "63e889f4439ccbf69d377068",
        authorName: "Joshua",
      });
      post.save((err, post) => {
        chai
          .request(app)
          .get("/api/v1/posts/" + post._id)
          .send(post)
          .end((err, res) => {
            should(res.body).not.have.property("err");
            should(res.status).be.equal(200);
            should(res.body).be.Object;
            should(res.body).have.property("post");
            should(res.body.post).have.property("title");
            should(res.body.post).have.property("authorId");
            should(res.body.post).have.property("authorName");
            should(res.body.post).have.property("description");
            should(res.body.post).have.property("imageUrl");
            should(res.body.post).have.property("createdAt");
            should(res.body.post).have.property("updatedAt");
            done();
          });
      });
    });
  });

  // Testing the /POST route
  describe("/POST post", () => {
    it("it should not POST if all fields are not complete", (done) => {
      let post = {
        title: "",
        description:
          "Manage high touch conversations in parallel. Drive engagement across your community. Build long term relationships with investors. Create personalized messages. that build trust. Demo at ETH SF with ZK-Starks, viewable on Youtube",
        imageUrl:
          "https://ondecentral.com/static/4a73444ed18da690ecdb083b7929ae58/03d34/zkstark.webp",
        authorId: "63e889f4439ccbf69d377068",
        authorName: "Joshua",
      };
      chai
        .request(app)
        .post("/api/v1/posts/create")
        .set({ Authorization: `Bearer ${token}` })
        .send(post)
        .end((err, res) => {
          should(res.body).not.have.property("err");
          should(res.status).be.equal(404);
          should(res.body).be.Object;
          should(res.body).have.property("msg");
          should(res.body).have.property("msg").eql("All fields are required");
          done();
        });
    });
    it("it should POST if all fields are complete", (done) => {
      let post = {
        title: "Natural language processing for contracts",
        description:
          "Manage high touch conversations in parallel. Drive engagement across your community. Build long term relationships with investors. Create personalized messages. that build trust. Demo at ETH SF with ZK-Starks, viewable on Youtube",
        imageUrl:
          "https://ondecentral.com/static/4a73444ed18da690ecdb083b7929ae58/03d34/zkstark.webp",
        authorId: "63e889f4439ccbf69d377068",
        authorName: "Joshua",
      };
      chai
        .request(app)
        .post("/api/v1/posts/create")
        .set({ Authorization: `Bearer ${token}` })
        .send(post)
        .end((err, res) => {
          should(res.body).not.have.property("err");
          should(res.status).be.equal(201);
          should(res.body).be.Object;
          should(res.body).have.property("newPost");
          should(res.body.newPost).have.property("_id");
          should(res.body.newPost).have.property("title");
          should(res.body.newPost).have.property("description");
          should(res.body.newPost).have.property("imageUrl");
          should(res.body.newPost).have.property("authorId");
          should(res.body.newPost).have.property("authorName");
          should(res.body.newPost).have.property("createdAt");
          should(res.body.newPost).have.property("updatedAt");
          done();
        });
    });
  });

  // Testing the /PATCH route
  describe("/PATCH/:id post", () => {
    it("it should UPDATE a post with the given id", (done) => {
      let post = new Post({
        title: "Natural language processing for contracts",
        description:
          "Manage high touch conversations in parallel. Drive engagement across your community. Build long term relationships with investors. Create personalized messages. that build trust. Demo at ETH SF with ZK-Starks, viewable on Youtube",
        imageUrl:
          "https://ondecentral.com/static/4a73444ed18da690ecdb083b7929ae58/03d34/zkstark.webp",
        authorId: "63e889f4439ccbf69d377068",
        authorName: "Joshua",
      });
      post.save((err, post) => {
        chai
          .request(app)
          .patch("/api/v1/posts/update/" + post._id)
          .set({ Authorization: `Bearer ${token}` })
          .send({
            title: "Natural language",
            description:
              "Manage high touch conversations in parallel. Drive engagement across your community. Build long term relationships with investors. Create personalized messages. that build trust. Demo at ETH SF with ZK-Starks, viewable on Youtube",
            imageUrl:
              "https://ondecentral.com/static/4a73444ed18da690ecdb083b7929ae58/03d34/zkstark.webp",
            authorId: "63e889f4439ccbf69d377068",
            authorName: "Joshua",
          })
          .end((err, res) => {
            should(res.body).not.have.property("err");
            should(res.status).be.equal(200);
            should(res.body).be.Object;
            should(res.body).have.property("title");
            should(res.body).have.property("description");
            should(res.body).have.property("imageUrl");
            done();
          });
      });
    });
  });

  // Testing the /DELETE route
  describe("/DELETE/:id post", () => {
    it("it should DELETE a post with the given id", (done) => {
      let post = new Post({
        title: "Natural language processing for contracts",
        description:
          "Manage high touch conversations in parallel. Drive engagement across your community. Build long term relationships with investors. Create personalized messages. that build trust. Demo at ETH SF with ZK-Starks, viewable on Youtube",
        imageUrl:
          "https://ondecentral.com/static/4a73444ed18da690ecdb083b7929ae58/03d34/zkstark.webp",
        authorId: "63e889f4439ccbf69d377068",
        authorName: "Joshua",
      });
      post.save((err, post) => {
        chai
          .request(app)
          .delete("/api/v1/posts/" + post._id)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            should(res.body).not.have.property("err");
            should(res.status).be.equal(200);
            should(res.body).be.Object;
            done();
          });
      });
    });
  });
});
