export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) * (height / 100));

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
