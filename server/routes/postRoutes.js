const express = require("express");

const postModel = require("../models/postModel");

const router = express.Router();

router.get("/api/posts", (req, res) => {
  postModel
    .getPosts()
    .then(posts => {
      if (posts && posts.length > 1) {
        res.status(200).json({
          message: "Successfully retrieved list of all posts.",
          posts
        });
      } else {
        res.status(204).json({
          message:
            "There were no posts found at this current time. Please review your search query."
        });
      }
    })
    .catch(error =>
      res
        .status(500)
        .json({ message: "Internal server error", error: { ...error } })
    );
});

router.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  return postModel
    .getPost(id)
    .then(post => {
      if (post) {
        res
          .status(200)
          .json({ message: `Successfully retried post at Id: ${id}`, post });
      } else {
        res.status(204).json({
          message:
            "This was post not found in the database. Please review your search query."
        });
      }
    })
    .catch(error =>
      res
        .status(500)
        .json({ message: "Internal server error", error: { ...error } })
    );
});

router.post("/api/posts", (req, res) => {
  const { user_id, post_title, post_content, edited, timestamp } = req.body;
  const post = { user_id, post_title, post_content, edited, timestamp };
  const addPostErrors = [];
  if (!user_id) addPostErrors.push({ message: "missing user id" });
  if (!post_title) addPostErrors.push({ message: "missing post title" });
  if (!post_content) addPostErrors.push({ message: "missing post content" });
  if (
    (edited < 0 && edited > 1) ||
    edited === undefined ||
    typeof edited !== "number"
  )
    addPostErrors.push({ message: "missing post edited value" });
  if (!timestamp) addPostErrors.push({ message: "missing post timestamp." });
  if (
    !user_id ||
    !post_title ||
    !post_content ||
    !timestamp ||
    (edited < 0 && edited > 1) ||
    edited === undefined ||
    typeof edited !== "number"
  ) {
    res.status(401).json({ message: addPostErrors });
  } else {
    postModel
      .addPost(post)
      .then(count => {
        postModel
          .getPosts()
          .then(posts => {
            res.status(200).json({ count, posts });
          })
          .catch(error =>
            res
              .status(500)
              .json({ message: "Internal server error", error: { ...error } })
          );
      })
      .catch(error =>
        res
          .status(500)
          .json({ message: "Internal server error", error: { ...error } })
      );
  }
});

router.put("/api/id", (req, res) => {
  const { id } = req.params;
  const { user_id, post_title, post_content, edited, timestamp } = req.body;
  const post = { user_id, post_title, post_content, edited, timestamp };
  postModel.updatePost(id, post).then(count => {
    postModel
      .getPosts()
      .then(posts => {
        res.status(200).json({ message: "Successfully updated post.", posts, count });
      })
      .catch(error =>
        res
          .status(500)
          .json({ message: "Internal server error", error: { ...error } })
      );
  });
});

module.exports = router;
