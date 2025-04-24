function displayRegDeadline(){
    let deadline = new Date('2025-05-01')
    console.log(deadline);
    let presentDay = new Date()
    console.log(presentDay);
    if(presentDay > deadline){
        console.log('Registration Deadline has passed pay #5000 to continue');
        return;
    }
}
displayRegDeadline()

function validateSchoolReg(){
    const screg_name = document.getElementById('screg_name').value
    const screg_name_err = document.getElementById('screg_name_err')
    const screg_email = document.getElementById('screg_email').value
    const screg_email_err = document.getElementById('screg_email_err')

    if(screg_name === ''){
        screg_name_err.textContent = "Please input your School's name "
        document.getElementById('screg_name').classList.add('border', 'border-red-500')
    }else{
        screg_name_err.textContent = ''
        document.getElementById('screg_name').classList.remove('border-red-500')
    }

    if(screg_email === ''){
        screg_email_err.textContent = "Please input your School's email address "
        document.getElementById('screg_email').classList.add('border', 'border-red-500')
    }else{
        screg_email_err.textContent = ''
        document.getElementById('screg_email').classList.remove( 'border-red-500')
    }


    if(screg_name !== '' && screg_email !== ''){
        const schoolData = {
            name: screg_name,
            email: screg_email
        }

        const schoolInfo = JSON.parse(localStorage.getItem('schoolInfo')) || []
        schoolInfo.push(schoolData)
        localStorage.setItem('schoolInfo', JSON.stringify(schoolInfo))

        alert('Registration Successful')
        document.getElementById('reg_form').reset()
        window.location.href = 'login.html'
    }
}

function registerSchool(){
    validateSchoolReg()
}




function validateRegForm(){
    const regName = document.getElementById('reg_name').value
    const regNameErr = document.getElementById('reg_name_err')
    const regSchool = document.getElementById('reg_school').value
    const regSchoolErr = document.getElementById('reg_school_err')
    const regEmail = document.getElementById('reg_email').value
    const regEmailErr = document.getElementById('reg_email_err')
    const regPhone = document.getElementById('reg_phone').value
    const regPhoneErr = document.getElementById('reg_phone_err')

    if(regName === ''){
        regNameErr.textContent = 'Please input your name '
        document.getElementById('reg_name').classList.add('border', 'border-red-500')
    }else{
        regNameErr.textContent = ''
        document.getElementById('reg_name').classList.remove('border-red-500')
    }

    if(regSchool === ''){
        regSchoolErr.textContent = 'Please input your School '
        document.getElementById('reg_school').classList.add('border', 'border-red-500')
    }else{
        regSchoolErr.textContent = ''
        document.getElementById('reg_school').classList.remove( 'border-red-500')
    }

    if(regEmail === ''){
        regEmailErr.textContent = 'Please input your Email address '
        document.getElementById('reg_email').classList.add('border', 'border-red-500')
    }else{
        regEmailErr.textContent = ''
        document.getElementById('reg_email').classList.remove( 'border-red-500')
    }

    if(regPhone === ''){
        regPhoneErr.textContent = 'Please input your Phone Number '
        document.getElementById('reg_phone').classList.add('border', 'border-red-500')
    }else{
        regPhoneErr.textContent = ''
        document.getElementById('reg_phone').classList.remove('border-red-500')
    }


    if(
        regEmail !== ''&&
        regName !== ''&&
        regPhone!==''&&
        regSchool !== ''
    ){
        let studentData = {
          user_name: regName.toLowerCase(),
          user_school: regSchool.toLowerCase()
        }

        let student = JSON.parse(localStorage.getItem('students')) || []

        student.push(studentData)
        localStorage.setItem('students', JSON.stringify(student)) 
        
        alert('Registration Successful')
        document.getElementById('reg_form').reset()
        window.location.href = 'login.html'
    }
}



function register(event){
    validateRegForm()
}

function loginUser(){
    const loggedUser = document.getElementById('log_user').value
    const convertedUser = loggedUser.toLowerCase()
    const logUserErr = document.getElementById('log_user_err')
    const logSchool = document.getElementById('log_school').value
    const convertedSchool = logSchool.toLowerCase()
    const logSchoolErr = document.getElementById('log_school_err')

    if(loggedUser === ''){
       logUserErr.textContent = 'Please Enter Registered Name'
       document.getElementById('log_user').classList.add('border', 'border-red-500')
    }else{
        logUserErr.textContent = ''
       document.getElementById('log_user').classList.remove('border-red-500')
    }

    if(logSchool === ''){
        logSchoolErr.textContent = 'Please Enter Registered School'
       document.getElementById('log_school').classList.add('border', 'border-red-500')
    }else{
        logSchoolErr.textContent = ''
       document.getElementById('log_school').classList.remove('border-red-500')
    }
    
    

    if(loggedUser !== '' && logSchool !== ''){
        let studentsData = JSON.parse(localStorage.getItem('students')) || []
        let foundUser = studentsData.find(user => user.user_name === convertedUser &&  user.user_school === convertedSchool)
        let finUsers = JSON.parse(localStorage.getItem('finishedUsers'))
        if(finUsers !== null){
           let doneUSer = finUsers.find(user => user.name === convertedUser &&  user.school === convertedSchool)
        if(doneUSer){
            window.location.href = 'Analysis.html'
            document.getElementById('loginForm').reset()
        }else if(foundUser){
            localStorage.setItem('currentUser', JSON.stringify(foundUser))
            window.location.href = 'Quiz.html'
            document.getElementById('loginForm').reset()
        }else{
            alert('User not registered')
        }
        }else{
            if(foundUser){
                localStorage.setItem('currentUser', JSON.stringify(foundUser))
                window.location.href = 'Quiz.html'
                document.getElementById('loginForm').reset()
            }else{
                alert('User not registered')
            }
        }   
        

    
    }

    
    
}

function loginStudent(event){
    loginUser()
}

let timeInterval = null



const questions = [
    { question: "What is 2 + 2?", answer: "4", option:['1','4','6','9'] },
    { question: "Capital of France?", answer: "Paris", option:['Paris','FCT','New York', 'Abijan']},
    { question: "What keyword declares a constant?", answer: "const", option:['let','var','document','const'] },
    { question: "Result of 3 * 3?", answer: "9", option:['2','3','9','7']},
    { question: "What is the type of NaN?", answer: "number", option: ['string','number','null', 'undefined' ]},
]
 


let index = 0
let btnIndex = -1
let currentScore = 0
let previousScore = 0

let valScore = function(selected, correctAnswer){
    if(valScore.done) return;

    if(selected === correctAnswer){
        currentScore++
        valScore.done = true
    }
}




function disableButton(){
    document.getElementById('optionA').disabled = true
    document.getElementById('optionB').disabled = true
    document.getElementById('optionC').disabled = true
    document.getElementById('optionD').disabled = true
}
  
  function enableButton(){
    document.getElementById('optionA').disabled = false
    document.getElementById('optionB').disabled = false
    document.getElementById('optionC').disabled = false
    document.getElementById('optionD').disabled = false
}


function changeQuestion(){
  if(index >= questions.length){ 
    console.log(currentScore);
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log(currentUser);
    let finishedUserData = {
        name: currentUser.user_name,
        school: currentUser.user_school,
        score: currentScore
    }
    let finishedUsers = JSON.parse(localStorage.getItem('finishedUsers')) || []

    finishedUsers.push(finishedUserData)
    localStorage.setItem('finishedUsers', JSON.stringify(finishedUsers))


    window.location.href = 'Analysis.html'
    return
  };
  document.getElementById('questionDisplay').textContent = questions[index].question
  
    
  document.getElementById('optionA').textContent = questions[index].option[0]
  document.getElementById('optionB').textContent = questions[index].option[1]
  document.getElementById('optionC').textContent = questions[index].option[2]
  document.getElementById('optionD').textContent = questions[index].option[3]
  
  index++
  
  document.getElementById('optionA').classList.add('bg-white','hover:border-green-600' ,'hover:border','hover:bg-green-100')
  document.getElementById('optionB').classList.add('bg-white','hover:border-green-600' ,'hover:border','hover:bg-green-100')
  document.getElementById('optionC').classList.add('bg-white','hover:border-green-600' ,'hover:border','hover:bg-green-100')
  document.getElementById('optionD').classList.add('bg-white','hover:border-green-600' ,'hover:border','hover:bg-green-100')

  if(btnIndex >= questions.length) return;

  btnIndex++
  valScore.done = false
  
  enableButton()


}

let timeLeft = 2 * 60
function timer(){
    const minute = String(Math.floor(timeLeft / 60)).padStart(2, '0')
    const seconds = String(Math.floor(timeLeft % 60)).padStart(2, '0')
    document.getElementById('timeDis').textContent = `Time Left: ${minute}:${seconds}`

    if(timeLeft > 0){
        timeLeft--
    }else{
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))
        let finishedUserData = {
        name: currentUser.user_name,
        school: currentUser.user_school,
        score: currentScore
      }
      let finishedUsers = JSON.parse(localStorage.getItem('finishedUsers')) || []

      finishedUsers.push(finishedUserData)
      localStorage.setItem('finishedUsers', JSON.stringify(finishedUsers))
      window.location.href= 'Analysis.html'
      clearInterval(timeInterval)
      timeInterval = null
    }
}

timeInterval = setInterval(()=>{timer},1000)


function then(selected,input){
    enableButton()
    previousScore = 0
   document.getElementById('optionA').classList.add('bg-white','hover:border-green-600' ,'hover:border','hover:bg-green-100')
   document.getElementById('optionB').classList.add('bg-white','hover:border-green-600' ,'hover:border','hover:bg-green-100')
   document.getElementById('optionC').classList.add('bg-white','hover:border-green-600' ,'hover:border','hover:bg-green-100')
   document.getElementById('optionD').classList.add('bg-white','hover:border-green-600' ,'hover:border','hover:bg-green-100')

   const correctAnswer = questions[btnIndex].answer
   
    valScore(selected, correctAnswer)

   input.classList.add('bg-blue-100')
   input.classList.remove('bg-white', 'hover:border-green-600' ,'hover:border','hover:bg-green-100')
   input.disabled = true
}

function nextQuestion(){
    changeQuestion()
}

function beginQuiz(){
    if(beginQuiz.done) return;

    changeQuestion()
    timeInterval = setInterval(()=>{timer()},1000)
    document.getElementById('disNext').classList.remove('hidden')
    beginQuiz.done = true
}

// function studentAnalysis(){
//     let finUsers = JSON.parse(localStorage.getItem('finishedUsers'))
//     console.log(finUsers);
    
//     finUsers.forEach(user => {
//         const card = document.createElement('div')
//         card.className = 'grid w-[87%]  mx-auto p-5 bg-white shadow-2xl mt-15 md:grid lg:grid-cols-2 gap-5'
//         const analysisCont = document.getElementById('analysisCont')
//         let percentage = user.score/questions.length * 100

//         card.innerHTML = `
//             <div class="capitalize">School Name: ${user.school}</div>
//             <div class="capitalize">Candidate Name: ${user.name}</div>
//             <div class="border border-8 border-gray-900 rounded-full text-4xl p-5 h-72 w-72 flex items-center justify-center">${percentage}%</div>
//             <div class="flex items-center">Candidates Score: ${user.score} / ${questions.length}</div>
//         `
        
//         analysisCont.appendChild(card)
//     })

// }
// studentAnalysis()


function closeWinner(){
    document.getElementById('winCont').classList.replace('flex','hidden')
}





