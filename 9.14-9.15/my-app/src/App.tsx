import React from 'react';

interface HeaderProps {
  name: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface DescriptiveCoursePart extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends DescriptiveCoursePart {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends DescriptiveCoursePart {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends DescriptiveCoursePart {
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface ContentProps {
  parts: CoursePart[];
}

interface TotalProps {
  total: number;
}

const Header: React.FC<HeaderProps> = ({ name }) => (
  <h1>{name}</h1>
);

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>Exercises: {part.exerciseCount}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Group Projects: {part.groupProjectCount}</p>
          <p>Exercises: {part.exerciseCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>Exercises: {part.exerciseCount}</p>
          <p>
            Background Material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
          </p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Requirements: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return <p>Unknown part kind</p>;
  }
};

const Content: React.FC<ContentProps> = ({ parts }) => (
  <div>
    {parts.map((part, index) => (
      <Part key={index} part={part} />
    ))}
  </div>
);

const Total: React.FC<TotalProps> = ({ total }) => (
  <p>Number of exercises {total}</p>
);

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;