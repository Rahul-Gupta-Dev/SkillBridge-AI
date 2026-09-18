module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json([
    { id: 1, name: "Web Development", level: "Beginner", progress: 60 },
    { id: 2, name: "Python Programming", level: "Intermediate", progress: 80 },
    { id: 3, name: "Artificial Intelligence", level: "Advanced", progress: 40 },
    { id: 4, name: "Data Science & Analytics", level: "Intermediate", progress: 25 },
    { id: 5, name: "Cloud Computing & DevOps", level: "Advanced", progress: 10 }
  ]);
};
