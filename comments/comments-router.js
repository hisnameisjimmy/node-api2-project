const express = require("express");
const db = require("../data/db.js");
const router = express.Router();

// post comment

router.post("/:id", (req, res) => {
    const id = req.params.id;
    const newComment = req.body;
    newComment.post_id = id;

    if (newComment.text) {
        db.findById(id)
            .then(post => {
                if (post.length > 0) {
                    console.log(newComment);
                    console.log(post);
                    db.insertComment(newComment)
                      .then(comment => {
                        res.status(201).json(comment);
                      })
                      .catch(err => {
                          console.log(err);
                        res.status(500).json({
                          error:
                            "There was an error while saving the comment to the database"
                        });
                      });
                } else {
                    res.status(404).json({ message: 'The post with the specified ID does not exist' });
                }
            })
    } else {
        res.status(400).json({
          errorMessage: "Please provide text for the comment."
        });
    }
});

// get comments
router.get("/:id", (req, res) => {
    const postId = req.params.id;
    db.findById(id)
    .then(post => {
        if (post.length > 0) {
            db.findPostComments(postId)
                .then(comments => {
                    res.status(200).json(comments);
                })
                .catch(err => {
                    res.status(404).json({
                    errorMessage: "The user information could not be retrieved."
                    });
                })
        } else {
            res.status(400).json({
                message: "The post with the specified ID does not exist."
            });
        }
    })
    .catch(err => {
        res.status(500).json({
          error: "The comments information could not be retrieved."
        });
    });
});

module.exports = router;