// implement your posts router here
const express = require("express");

const router = express.Router();
const Post = require("./posts-model");

// router.get("/", async (req, res) => {
//   try {
//     const posts = await Post.find();
//     res.status(200).json(posts);
//   } catch (err) {
//     res
//       .status(500)
//       //   .json({ message: "The posts information could not be retrieved" });
//       .json({ message: err.message });
//   }
// });

router.get("/", (req, res) => {
  Post.find()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// router.get("/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const post = await Post.findById(id);
//     if (id) {
//       res.status(200).json(post);
//     } else {
//       res
//         .status(404)
//         .json({ message: "The post with the specified ID does not exist" });
//     }
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "The posts information could not be retrieved" });
//   }
// });

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Post.findById(id)
    .then((post) => {
      if (id) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
    });
});

// router.post("/", async (req, res) => {
//   try {
//     if (!req.body.title || !req.body.contents) {
//       res
//         .status(400)
//         .json({ message: "Please provide title and contents for the post" });
//     } else {
//       const newPost = await Post.insert(req.body);
//       res.status(201).json(newPost);
//     }
//   } catch (err) {
//     res.status(500).json({
//       message: "There was an error while saving the post to the database",
//     });
//   }
// });

router.post("/", (req, res) => {
  Post.insert(req.body)
    .then((newPost) => {
      if (!req.body.title || !req.body.contents) {
        res
          .status(400)
          .json({ message: "Please provide title and contents for the post" });
      } else {
        res.status(201).json(newPost);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

// router.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;

//   // validate the body
//   if (!changes.title || !changes.content) {
//     res
//       .status(400)
//       .json({ message: "Please provide title and contents for the post" });
//   } else if (!id) {
//     // validate the id
//     res
//       .status(404)
//       .json({ message: "The post with the specified ID does not exist" });
//   } else {
//     try {
//       const updatedPost = await Post.update(id, changes);
//       res.status(200).json(updatedPost);
//     } catch (err) {
//       res
//         .status(500)
//         .json({ message: "The post information could not be modified" });
//     }
//   }
// });

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!changes.title || !changes.contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Post.update(id, changes)
      .then((updatedPost) => {
        if (updatedPost) {
          res.status(200).json(changes);
        } else {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist" });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "The post information could not be modified" });
      });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Post.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({ message: "The post has been deleted" });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "The post could not be removed" });
    });
});

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;

  Post.findCommentById(id)
    .then((comments) => {
      if (comments) {
        res.status(200).json({ comments });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The comments information could not be retrieved" });
    });
});

module.exports = router;
