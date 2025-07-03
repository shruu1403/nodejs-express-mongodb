const express = require("express");
const noteRouter = express.Router();
const { noteModel } = require("../models/noteModel");
const { auth } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the note
 *         description:
 *           type: string
 *           description: The description of the note
 */

/**
 * @swagger
 * tags:
 *   - name: Notes
 *     description: All the API routes related to Notes
 */

/**
 * @swagger
 * /note/create:
 *   post:
 *     summary: To post the details of a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       200:
 *         description: Note has been saved
 *       400:
 *         description: Some server error
 */
noteRouter.post("/create", auth, async (req, res) => {
    try {
        const note = new noteModel(req.body);
        await note.save();
        res.status(200).send({ msg: "new note has been created" });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: To get the details of all notes
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All the notes of a user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       400:
 *         description: Some server error
 */
noteRouter.get("/", auth, async (req, res) => {
    try {
        const notes = await noteModel.find();
        res.send(notes);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

/**
 * @swagger
 * /note/update/{noteId}:
 *   patch:
 *     summary: To update the details of a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noteId
 *         schema:
 *           type: string
 *         required: true
 *         description: The note id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       200:
 *         description: Note has been updated
 *       400:
 *         description: Some server error
 */
noteRouter.patch("/update/:noteId", auth, async (req, res) => {
    const { noteId } = req.params;
    try {
        await noteModel.findByIdAndUpdate({ _id: noteId }, req.body);
        res.send({ msg: `note has been updated with the id: ${noteId}` });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

/**
 * @swagger
 * /note/delete/{noteId}:
 *   delete:
 *     summary: To delete the details of a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noteId
 *         schema:
 *           type: string
 *         required: true
 *         description: The note id
 *     responses:
 *       200:
 *         description: Note has been deleted
 *       400:
 *         description: Some server error
 */
noteRouter.delete("/delete/:noteId", auth, async (req, res) => {
    const { noteId } = req.params;
    try {
        await noteModel.findByIdAndDelete({ _id: noteId });
        res.send({ msg: `note has been deleted with the id: ${noteId}` });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = { noteRouter };
