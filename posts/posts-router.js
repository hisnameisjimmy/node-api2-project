const express = require("express");
const db = require("../data/db.js");
const router = express.Router();

// post to posts
router.post("/", (req, res) => {
  const newPost = req.body;
  if (newPost.title && newPost.contents) {
    db.insert(newPost)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the post to the database"
        });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

// get posts
router.get("/", (req, res) => {
  db.find()
    .then(postList => {
      res.status(200).json(postList);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "The posts information could not be retrieved."
      });
    });
});

// delete post
router.delete("/:id", (req, res) => {
  const postId = req.params.id;
  db.remove(postId)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "The post could not be removed"
      });
    });
});

// router.put("/:id", (req, res) => {
//   const id = req.params.id;
//   const editPost = req.body;

//   if (editPost.title && editPost.contents) {
//     console.log(id);
//     console.log(editPost);
//     db.findById(id)
//     .then(post => {
//       if (post.length > 0) {
//         db.update(id, editPost)
//           .then(post => {
//             res.status(200).json(post);
//           })
//           .catch(err => {
//             res.status(500).json({
//               errorMessage: "The post information could not be modified."
//             });
//           });
//       } else {
//         res.status(404).json({
//           message: "The post with the specified ID does not exist."
//         });
//       }
//     })
    
//   } else {
//     res.status(400).json({
//       errorMessage: "Please provide title and contents for the post."
//     });
//   }
// });

router.put("/:id", async(req, res) => {
  const id = req.params.id;
  const editPost = req.body;

  if (!editPost.title || !editPost.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    try {
      const post = await db.findById(id)
      if (post.length > 0) {
        const update = await db.update(id, editPost)
        res.json(update);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    } catch(err) {
      res.status(500).json({
        errorMessage: "The post information could not be modified."
      });
    }
  }
});

module.exports = router;