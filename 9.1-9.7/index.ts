import express from 'express';
import { calculateBmi } from './bmiCalculatorModule';
import { calculateExercises, ExerciseResult } from './exerciseCalculatorModule';

const app = express();
app.use(express.json());

interface ExercisesRequestBody {
  daily_exercises: number[];
  target: number;
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
      return res.status(400).json({ error: 'malformatted parameters' });
  }

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (isNaN(heightNum) || isNaN(weightNum)) {
      return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(heightNum, weightNum);

  return res.json({
      height: heightNum,
      weight: weightNum,
      bmi,
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ExercisesRequestBody;

  if (!daily_exercises || target === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises) || typeof target !== 'number') {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  if (daily_exercises.some((e) => isNaN(Number(e)))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const dailyHours = daily_exercises.map(Number);

  const result: ExerciseResult = calculateExercises(dailyHours, target);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});