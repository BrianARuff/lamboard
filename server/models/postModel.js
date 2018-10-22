const db = require("../config/database");

module.exports = {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost
};

function getPosts() {
  return db("posts");
};

function getPost(id) {
  return db("posts")
    .where({ id })
    .first();
};

function addPost(post) {
  return db("posts").insert(post);
};

function updatePost(id, post) {
  return db("posts")
    .where({ id })
    .first()
    .update(post);
};

function deletePost(id) {
  return db("posts")
    .where({ id })
    .first()
    .del();
};
