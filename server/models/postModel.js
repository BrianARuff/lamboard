const db = require("../config/database");

module.exports = {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost
};

const getPosts = () => {
  return db("posts");
};

const getPost = id => {
  return db("posts")
    .where({ id })
    .first();
};

const addPost = post => {
  db("posts").insert(post);
};

const updatePost = (id, post) => {
  return db("posts")
    .where({ id })
    .first()
    .update(post);
};

const deletePost = id => {
  return db("posts")
    .where({ id })
    .first()
    .del();
};
