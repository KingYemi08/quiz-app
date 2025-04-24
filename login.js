function loginUser(){
    const logUser = document.getElementById('log_user').value
    const logUserErr = document.getElementById('log_user_err')
    const logSchool = document.getElementById('log_school').value
    const logSchoolErr = document.getElementById('log_school_err')
    console.log(logUser, logSchool);

    if(logUser === ''){
       logUserErr.textContent = 'Please Enter Registered Name'
    }else{
        logUserErr.textContent = ''
    }

    if(logSchool === ''){
        logSchoolErr.textContent = 'Please Enter Registered School'
    }else{
        logSchoolErr.textContent = ''
    }
    
    let studentsData = JSON.parse(localStorage.getItem('students')) || []
    let foundStudent = studentsData.find((student)=>{
        console.log(student.name, student.school);
        student.name == logUser && student.school == logSchool
    })

    if(foundStudent){
        console.log('found');
    }else{
        console.log('not found');
    }


    // if(logUser !== '' && logSchool !== ''){
       
    // }
    
}



document.getElementById('login').onclick = function(event){
    event.preventDefault()

    loginUser()
}