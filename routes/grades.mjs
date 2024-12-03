
import express from "express";
//import db from "../db/conn.mjs";
//import { ObjectId } from "mongodb";
import Grade from "../models/grade.mjs";



const router = express.Router();
//get all the grades
router.get("/", async (req, res) => {
  try {
    const grades = await Grade.find({});
    res.status(200).send(grades);
  } catch (error) {
    res.status(400).send(error);
  }
});
// Create a single grade entry
router.post("/", async (req, res) => {
  let newDocument = req.body;

  // rename fields for backwards compatibility
  if (newDocument.student_id) {
    newDocument.learner_id = newDocument.student_id;
    delete newDocument.student_id;
  }
  try{
    const grade = new Grade(newDocument)
    await grade.save();
    res.status(201).send(grade);

  }catch (error){
    res.status(400).send(error.message)
  }

});



// Get a single grade entry
router.get("/:id", async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if(!grade){
      res.status(404).send("Not found")
    }else{
      res.status(200).send(grade)
    }
  }catch (error){
    res.status(400).send(error)
  };
 
 });
// Add a score to a grade entry
router.patch("/:id/add", async (req, res) => {
  try{
    const grade = await Grade.findByIdAndUpdate(
      req.params.id, 
      {$push: { scores: req.body }},
      {new:true}
    )  ;
    if(!grade){
      res.status(404).send("Not found")
    }else{
      res.status(200).send(grade)
    }
  }catch (error){
    res.status(400).send(error)
  };

});

// Remove a score from a grade entry
router.patch("/:id/remove", async (req, res) => {
  try{
    const grade = await Grade.findByIdAndUpdate(
      req.params.id, 
      {$pull: { scores: req.body }},
      {new:true}
    )  ;
    if(!grade){
      res.status(404).send("Not found")
    }else{
      res.status(200).send(grade)
    }
  }catch (error){
    res.status(400).send(error)
  };
 
});

// Delete a single grade entry
router.delete("/:id", async (req, res) => {
  try{
    const result = await Grade.findByIdAndDelete(
      req.params.id
    )  ;
    if(!result){
      res.status(404).send("Not found")
    }else{
      res.status(200).send(result)
    }
  }catch (error){
    res.status(400).send(error)
  };

});



// // Get route for backwards compatibility
// router.get("/student/:id", async (req, res) => {
//   res.redirect(`learner/${req.params.id}`);
// });


// // Get a learner's grade data
// router.get("/learner/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { learner_id: Number(req.params.id) };
  
//   // Check for class_id parameter
//   if (req.query.class) query.class_id = Number(req.query.class);

//   let result = await collection.find(query).toArray();

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Delete a learner's grade data
// router.delete("/learner/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { learner_id: Number(req.params.id) };

//   let result = await collection.deleteOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Get a class's grade data
// router.get("/class/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { class_id: Number(req.params.id) };

//   // Check for learner_id parameter
//   if (req.query.learner) query.learner_id = Number(req.query.learner);

//   let result = await collection.find(query).toArray();

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Update a class id
// router.patch("/class/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { class_id: Number(req.params.id) };

//   let result = await collection.updateMany(query, {
//     $set: { class_id: req.body.class_id }
//   });

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Delete a class
// router.delete("/class/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { class_id: Number(req.params.id) };

//   let result = await collection.deleteMany(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

export default router;
// contributions from - John, Ray 