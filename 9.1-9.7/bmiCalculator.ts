const calculateBmi = (height: number, weight: number, printText: string): string => {
    const bmi = weight / ((height / 100) * (height / 100));
    console.log(printText, bmi);
    
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return "Normal range";
    } else if (bmi >= 25 && bmi <= 29.9) {
        return "Overweight";
    } else {
        return "Obese";
    }
};

if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.log("Please provide height (cm) and weight (kg) as arguments.");
        process.exit(1);
    }

    const height = Number(args[0]);
    const weight = Number(args[1]);
    const printText = args[2] || "Your BMI is:";

    if (isNaN(height) || isNaN(weight)) {
        console.log("Both height and weight should be numbers.");
        process.exit(1);
    }

    const result = calculateBmi(height, weight, printText);
    console.log(result);
};