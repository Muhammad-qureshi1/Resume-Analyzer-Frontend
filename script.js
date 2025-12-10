// ===========  Signup  ======== //
let signupForm = document.getElementById("signupForm");
if(signupForm){
    signupForm.addEventListener("submit", async (e) => {
    try {
        e.preventDefault(); // page reload na hoo.

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
    
           if (!name || !email || !password) {
                return alert("Please fill all feilds");
            }
            if (password.length < 6) {
                return alert("Password length must be greater than 6");
            }
        
        const res = await axios.post("http://resume-analyzer-backend-green.vercel.app/api/signup", {
        // const res = await axios.post("http://localhost:5000/api/signup", {
            name,
            email,
            password
        });
            
        // const data = res.data;
        // console.log(res);
        
        if (res.data.status === 400) {
            alert(res.data.message);
            return;
        }
        else if (res.status === 200) {
            alert(res.data.message);
            window.location.href = "index.html";
        }
    }
    catch (err) {
        console.log(err);
    alert("Error in Frontend Signup script file.")
    }
}) };

// =========== Login  ======== //
const loginFrom = document.getElementById("loginForm");
if(loginFrom){
   loginFrom.addEventListener("submit", async (e) => {
try {
    e.preventDefault(); // page reload na hoo.

let email = document.getElementById("loginEmail").value;
let  password = document.getElementById("loginPassword").value;

    const res =  await axios.post("http://resume-analyzer-backend-green.vercel.app/api/login", {
    // const res =  await axios.post("http://localhost:5000/api/login", {
           email,
           password
        })  

        if (res.data.status === 400) {
            alert(res.data.message);
            return; 
        }
        else if (res.data.status === 404) {
            alert(res.data.message);
            return;
        }
        else if(res.status === 200){
            alert(res.data.message);
            window.location.href = 'resume.html';
            return
        }

    } catch (err) {
        console.log(err);
    alert('Error in Frontend login script file');

    }
})
}

// =========== Resumei Page ==============
const resumeAnalyze = async () => {
const resumeFile = document.getElementById('resume').files[0];
const jobDescription = document.getElementById('jobDescription').value;

if(!resumeFile ){
    alert('Please upload your resume PDF');
    return;
}

const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription); // optional

    const res = await axios.post("http://resume-analyzer-backend-green.vercel.app/api/resume", {
        resumeFile, jobDescription
    });

    const data = await res.json();
    document.getElementById("responseBox").innerHTML = data.result;

console.log(resumeFile);
console.log(jobDescription);
}
// const resumePdf = document.getElementById('resumeAnalyze');
// if(resumePdf){  
//     resumePdf.addEventListener('submit', async (e) => {
// try{
//     e.preventDefault(); // form kei by default bbehaviour ko rokhta hai.
// let resume = document.getElementById('resume');
// if(!resume){
//     alert('Please upload a PDF');
// }
// }
// catch(err){
//     console.log(err);
// }
//     })
// }