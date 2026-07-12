function showMessage() {
    alert("Welcome to SkillBridge AI - Your Personalized Learning Partner!");
}
fetch("http://localhost:5000/api/courses")
.then(response => response.json())
.then(data => {

    let courses = "";

    data.forEach(course => {
        courses += `
        <div class="card">
            <h3>${course.name}</h3>
            <p>Level: ${course.level}</p>
        </div>
        `;
    });

    let courseList = document.getElementById("courseList");

    if(courseList){
        courseList.innerHTML = courses;
    }

})
.catch(error => {
    console.log("Error:", error);
});