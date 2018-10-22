const express = require("express");

const postModel = require("../models/postModel");

const router = express.Router();

router.get("/", (req, res) => {
  postModel
    .getPosts()
    .then(posts => {
      if (posts && posts.length > 0) {
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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  return postModel
    .getPost(id)
    .then(post => {
      if (!post) {
        res.status(200).json({ message: "Post not found." });
      } else {
        res
          .status(200)
          .json({ message: `Successfully retrieved post at Id: ${id}`, post });
      }
    })
    .catch(error =>
      res
        .status(500)
        .json({ message: "Internal server error", error: { ...error } })
    );
});

router.post("/", (req, res) => {
  const { user_id, post_title, post_content } = req.body;
  const post = { user_id, post_title, post_content };
  const addPostErrors = [];
  if (!user_id) addPostErrors.push({ message: "missing user id" });
  if (!post_title) addPostErrors.push({ message: "missing post title" });
  if (!post_content) addPostErrors.push({ message: "missing post content" });
  if (!user_id || !post_title || !post_content) {
    res.status(401).json({ messages: addPostErrors });
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

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { user_id, post_title, post_content, edited, timestamp } = req.body;
  const post = { user_id, post_title, post_content, edited, timestamp };
  postModel.updatePost(id, post).then(count => {
    postModel
      .getPosts()
      .then(posts => {
        res
          .status(200)
          .json({ message: "Successfully updated post.", posts, count });
      })
      .catch(error =>
        res
          .status(500)
          .json({ message: "Internal server error", error: { ...error } })
      );
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  postModel
    .deletePost(id)
    .then(count => {
      postModel
        .getPosts()
        .then(posts =>
          res
            .status(200)
            .json({ message: "Successfully deleted post", posts, count })
        );
    })
    .catch(error =>
      res.status(500).json({ message: "Internal server error.", ...error })
    );
});

module.exports = router;
