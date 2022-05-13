export default [
    {question: "Scouter Name", type: "short_answer"},
    {question: "Drivetrain Motors", type: "multiple_choice", options: [1, 2, 3, 4, 5, 6, 7, 8]},
    {question: "Drivetrain Type", type: "multiple_choice", options: ["WCD (Kit)", "WCD (Custom)", "Swerve", "Omni", "H-Drive", "2 + 2 Omni and Traction", "Other..."]},
    {question: "Robot Weight (AS INSPECTED)", type: "short_answer"},
    {question: "Approximate Length of Bumpers (ft)", type: "short_answer"},
    {question: "How many cargo can you store in your robot?", type: "multiple_choice", options: [0, 1, 2]},
    {question: "Which rung can you climb to?", type: "checkboxes", options: ["None", "Low", "Mid", "High", "Traversal"]},
    {question: "Where can your autos start?", type: "checkboxes_with_image", options: [1, 2, 3, 4], image: "image1"},
    {question: "Programming Language", type: "multiple_choice", options: ["Java", "Python", "C++", "LabView", "Other..."]},
    {question: "How many competitions have your drivers driven at?", type:"short_answer"},
    {type: "picture"},
    {question: "Unique mechanism(s) or any other interesting features", type: "short_answer"},
]