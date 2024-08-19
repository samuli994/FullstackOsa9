interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export function calculateExercises(dailyHours: number[], target: number): ExerciseResult {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(day => day > 0).length;
    const average = dailyHours.reduce((sum, day) => sum + day, 0) / periodLength;
    const success = average >= target;

    let rating: number;
    let ratingDescription: string;

    if (average >= target) {
        rating = 3;
        ratingDescription = "You met your goal!";
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = "Not too bad but could be better";
    } else {
        rating = 1;
        ratingDescription = "You need to work harder to meet your goal";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
}

if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.log("Please provide the target and daily exercise hours as arguments.");
        process.exit(1);
    }

    const target = Number(args[0]);
    const dailyHours = args.slice(1).map(Number);

    if (isNaN(target) || dailyHours.some(isNaN)) {
        console.log("All inputs should be numbers.");
        process.exit(1);
    }

    const result = calculateExercises(dailyHours, target);
    console.log(result);
}