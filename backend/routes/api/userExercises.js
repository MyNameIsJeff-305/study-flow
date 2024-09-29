const express = require('express');
const openai = require('../../config/openai');
const router = express.Router();
const { StudyPlan, Exercise, User, UserExercise } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');



//Get all UserExercises
router.get('/', requireAuth, async (req, res) => {
    const userExercises = await UserExercise.findAll();
    return res.json(userExercises);
});

//Get all UserExercises for the current user
router.get('/current', requireAuth, async (req, res) => {
    const userExercises = await UserExercise.findAll({
        where: {
            userId: req.user.id
        }
    });
    return res.json(userExercises);
});

//Add a UserExercise
router.post('/', requireAuth, async (req, res) => {
    const { exerciseId, userId } = req.body;
    const userExercise = await UserExercise.create({
        exerciseId,
        userId
    });
    return res.json(userExercise);
});

//Delete a UserExercise
router.delete('/:id', requireAuth, async (req, res) => {
    const userExercise = await UserExercise.findByPk(req.params.id);
    await userExercise.destroy();
    return res.json(userExercise);
});

module.exports = router;