import User from "../models/user.js";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import should from "should";

chai.use(chaiHttp);

//Our parent block
describe("Users", () => {
  beforeEach((done) => {
    //Before each test we empty the database
    User.remove({}, (err) => {
      done();
    });
  });

  // Testing the Register /POST route
  describe("/POST user", () => {
    it("it should not POST if all register fields are not complete", (done) => {
      let user = {
        username: "",
        email: "admin@gmail.com",
        password: "admin123",
        repeatPassword: "admin123",
      };
      chai
        .request(app)
        .post("/api/v1/user/register")
        .send(user)
        .end((err, res) => {
          should(res.body).not.have.property("err");
          should(res.status).be.equal(404);
          should(res.body).be.Object;
          should(res.body).have.property("msg");
          should(res.body).have.property("msg").eql("All fields are required");
          done();
        });
    });
    it("it should POST if all register fields are complete", (done) => {
      let user = {
        username: "Admin",
        email: "admin@gmail.com",
        password: "admin123",
        repeatPassword: "admin123",
      };
      chai
        .request(app)
        .post("/api/v1/user/register")
        .send(user)
        .end((err, res) => {
          should(res.body).not.have.property("err");
          should(res.status).be.equal(200);
          should(res.body).be.Object;
          should(res.body).have.property("result");
          should(res.body).have.property("token");
          should(res.body.result).have.property("id");
          should(res.body.result).have.property("username");
          should(res.body.result).have.property("email");
          done();
        });
    });
  });

  
  // Testing the Login /POST route
  describe("/POST user", () => {
    it("it should not POST if all login fields are not complete", (done) => {
      let user = {
        email: "chuksjoshuaa@gmail.com",
        password: ""
      };
      chai
        .request(app)
        .post("/api/v1/user/login")
        .send(user)
        .end((err, res) => {
          should(res.body).not.have.property("err");
          should(res.status).be.equal(404);
          should(res.body).be.Object;
          should(res.body).have.property("status");
          should(res.body).have.property("status").eql("ok");
          should(res.body).have.property("msg");
          should(res.body)
            .have.property("msg")
            .eql("Please provide email and password");
         
          done();
        });
    });
    it("it should POST if all login fields are complete", (done) => {
      let user = {
        email: "admin@gmail.com",
        password: "admin123",
      };
      chai
        .request(app)
        .post("/api/v1/user/login")
        .send(user)
        .end((err, res) => {
          should(res.body).not.have.property("err");
          should(res.status).be.equal(200);
          should(res.body).be.Object;
          should(res.body).have.property("result");
          should(res.body).have.property("token");
          should(res.body.result).have.property("id");
          should(res.body.result).have.property("username");
          should(res.body.result).have.property("email");
          done();
        });
    });
  });
});
