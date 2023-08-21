//เก็บ token / username => storage
export const authenicate=(response,next)=>{
    if(window !== "underfinded"){
        //เก็บข้อมุลลง session storage
        sessionStorage.setItem('token', JSON.stringify(response.data.token))
        sessionStorage.setItem('user', JSON.stringify(response.data.username))
    }
    next()
}

//ดึงข้อมูล token
export const getToken=()=>{
    if(window !== 'undefind'){
        if(sessionStorage.getItem('token')){
            return JSON.parse(sessionStorage.getItem('token'))
        }else{
            return false
        }
    }
}

//ดึงข้อมูล user
export const getUser=()=>{
    if(window !== 'undefind'){
        if(sessionStorage.getItem('user')){
            return JSON.parse(sessionStorage.getItem('user'))
        }else{
            return false
        }
    }
}

//logout
export const logout=(next)=>{
    if(window !== 'undefind'){
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
    }
    next()
}