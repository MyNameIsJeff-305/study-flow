const express = require('express');
const openai = require('../../config/openai');
const router = express.Router();
const { StudyPlan, Exercise, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// Get all study plans
router.get('/', async (req, res) => {
    const studyPlans = await StudyPlan.findAll({
        include: { model: User, attributes: ['username'] }
    });
    res.json(studyPlans);
});

//Get the Studyplans created by a specific user
router.get('/current', requireAuth, async (req, res) => {
    const studyPlans = await StudyPlan.findAll({
        where: {
            createdBy: parseInt(req.user.id)
        },
        include: { model: User, attributes: ['username'] }
    });
    res.json(studyPlans);
});

// Get a study plan by ID
router.get('/:id', async (req, res) => {
    const studyPlan = await StudyPlan.findByPk(req.params.id, {
        include: [{ model: Exercise }, { model: User, attributes: ['username'] }]
    });
    if (studyPlan) {
        res.json(studyPlan);
    } else {
        res.status(404).json({ error: 'Study plan not found' });
    }
});

// Create a new study plan
// In your studyPlans.js or relevant route file
router.post('/', requireAuth, async (req, res, next) => {
    const { subject, goal, deadline, createdBy, imageUrl } = req.body;

    // console.log(createdBy, "THIS IS THE CREATED BY");

    try {
        // Step 1: Create the new study plan
        const studyPlan = await StudyPlan.create({ subject, goal, deadline, createdBy });

        // Step 2: Generate AI exercises using OpenAI
        const exercises = await generateExercisesFromAI(subject, goal, deadline);

        // Step 3: Store the generated exercises in the database
        for (const exerciseText of exercises) {
            await Exercise.create({
                exercise: exerciseText,
                studyPlanId: studyPlan.id,
            });
        }

        imageUrl && (studyPlan.imageUrl = imageUrl);

        const resultExercises = await Exercise.findAll({
            where: {
                studyPlanId: studyPlan.id
            }
        });

        const result = {
            studyPlan,
            resultExercises
        }

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

// AI exercise generation function
async function generateExercisesFromAI(subject, goal, deadline) {
    try {


        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // Use the correct model based on your requirements
            // prompt: prompt,
            messages: [{ role: 'system', content: 'You are a Study Plan Exercises generator' }, {
                role: 'user', content: `Generate the necessary amount of exercises for a study plan with the following details:
      - Subject: ${subject}
      - Goal: ${goal}
      - Deadline: ${deadline}
      
      Provide the exercises in bullet points. The exercises format must be only single bullet points, and you must only answer with the bullet points` }],
        });

        // console.log();
        const exercises = response.choices[0].message.content.trim().split('\n').filter(Boolean);

        for(let exercise of exercises){
            if(exercise.startsWith('-')){
                exercise = exercise.slice(1);
            }
        }

        return exercises;
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        return [];
    }
}


// Update a study plan
router.put('/:id', async (req, res) => {
    const { subject, goal } = req.body;
    const studyPlan = await StudyPlan.findByPk(req.params.id);
    if (studyPlan) {
        studyPlan.subject = subject || studyPlan.subject;
        studyPlan.goal = goal || studyPlan.goal;
        await studyPlan.save();
        res.json(studyPlan);
    } else {
        res.status(404).json({ error: 'Study plan not found' });
    }
});

// Delete a study plan
router.delete('/:id', async (req, res) => {
    const studyPlan = await StudyPlan.findByPk(req.params.id);
    if (studyPlan) {
        await studyPlan.destroy();
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'Study plan not found' });
    }
});

module.exports = router;
