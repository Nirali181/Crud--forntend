import { CommonRequest } from "./CommonRequest"

export const API_URL = "http://localhost:8009"

// Get User
export const GetAllUsersAPI = async(header,search,selectedOption,sortValue)=>{
    console.log("search data",search)
    return await CommonRequest(
        "GET",
        `${API_URL}/user/getusers/?search=${search}&gender=${selectedOption}&sort=${sortValue}`,
        "",
        header
    )
}

// Add User
export const registerAPI = async(data,header)=>{
    return await CommonRequest(
        "POST",
        `${API_URL}/user/adduser`,
        data,
        header
    )
}

// get single user
export const getSingleUserAPI = async(id,header)=>{
    return await CommonRequest(
        "GET",
        `${API_URL}/user/getsingleuser/${id}`,
        "",
        header
    )
}

// Edit single user
export const EditSingleUserAPI = async(id,data,header)=>{
    data.forEach((sssssss)=>{
        console.log("sssssss",sssssss)
    })
    return await CommonRequest(
        "PUT",
        `${API_URL}/user/editsingleuser/${id}`,
        data,
        header
    )
}

// delete user
export const DeleteUserAPI = async(id,header)=>{
    console.log("sddwd",id)
    return await CommonRequest(
        "DELETE",
        `${API_URL}/user/deleteuser/${id}`,
        "",
        header
    )
}

// change status
export const EditStatusAPI = async(id,data,header)=>{
    return await CommonRequest(
        "PUT",
        `${API_URL}/user/changestatus/${id}`,
        data,
        header
    )
}

// export csv

export const exportToCSVAPI = async(header)=>{
    return await CommonRequest(
        "GET",
        `${API_URL}/user/exportcsv`,
        "",
        header
    )
}