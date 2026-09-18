module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      body = {};
    }
  }

  const userMessage = (body && body.message) ? body.message.trim() : '';

  if (!userMessage) {
    return res.status(400).json({ reply: "Please provide a valid question or message." });
  }

  const msg = userMessage.toLowerCase();
  let reply = "Your question has been received: " + userMessage;

  if (msg.includes("python")) {
    reply = "Python is a versatile programming language widely used in AI, Data Science, and Web Development. Start with variables, data types, and control flows in our Python course!";
  } else if (msg.includes("quiz") || msg.includes("test")) {
    reply = "Our adaptive AI Quizzes help test and reinforce your concepts. Head over to the Quiz section to get started!";
  } else if (msg.includes("course") || msg.includes("learn") || msg.includes("study")) {
    reply = "We offer top courses in Web Development, Python, Artificial Intelligence, Data Science, and Cloud Computing. Check out the Courses page!";
  } else if (msg.includes("planner") || msg.includes("schedule")) {
    reply = "Use the Daily Study Planner to keep track of your learning goals, timetables, and daily study streak!";
  } else if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
    reply = "Hello there! I am your SkillBridge AI Assistant. Ask me anything about courses, quizzes, or learning paths!";
  }

  return res.status(200).json({ reply });
};
