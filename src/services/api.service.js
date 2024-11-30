// import axios from "axios"
import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user";
        const data = {
            fullName: fullName,
            email: email,
            password: password,
            phone: phone

            // or you can code : { fullName, email, password, phone }
        }
        return axios.post(URL_BACKEND, data)
}

const updateUserAPI = (id, fullName, phone, avatar) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id : id,
        fullName: fullName,
        phone: phone,
        avatar: avatar

        // or you can code : { fullName, email, password, phone }
    }
    return axios.put(URL_BACKEND, data)
}

const deleteUserAPI = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`;
    return axios.delete(URL_BACKEND)
    

}

const getAllUserAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND)
}

const  UploadFileAPI = (file, folder) => {
    const URL_BACKEND = `/api/v1/file/upload`;
    let config = {
        headers: {
          "upload-type": folder,
          "Content-Type": "multipart/form-data"
        }
      }
      const bodyFormData = new FormData();
      bodyFormData.append("fileImg", file) // key, value truyen vao
    return axios.post(URL_BACKEND, bodyFormData, config)
}

// auth
const registerUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register";
        const data = {
            fullName: fullName,
            email: email,
            password: password,
            phone: phone

            // or you can code : { fullName, email, password, phone }
        }
        return axios.post(URL_BACKEND, data)
}

const loginUserAPI = (email,password) => {
    const URL_BACKEND = "/api/v1/auth/login";
        const data = {
            username: email, // backend : client
            password: password,
            delay : 2000 // tuy backend thiết kế, thêm vào để lỡ call api bị chậm trễ

            // or you can code : { fullName, email, password, phone }
        }
        return axios.post(URL_BACKEND, data)
}

const getAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account";
    return axios.get(URL_BACKEND)
}

const LogOutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout";
    return axios.post(URL_BACKEND)
}

// API books

const getAllBooksAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND)
}

const createBookAPI = ( thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = `/api/v1/book`;
    const data = {
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category
    }
    return axios.post(URL_BACKEND, data)
}

const updateBookAPI = (_id, thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = `/api/v1/book`
    const data = {
        _id : _id,
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category
    }

    return axios.put(URL_BACKEND,data)
}

const deleteBookAPI = (_id) => {
    const URL_BACKEND = `api/v1/book/${_id}`

    return axios.delete(URL_BACKEND)
}

export {
    createUserAPI,
    updateUserAPI,
    getAllUserAPI,
    deleteUserAPI,
    UploadFileAPI,
    registerUserAPI,
    loginUserAPI,
    getAccountAPI,
    LogOutAPI,
    // API Books
    getAllBooksAPI,
    createBookAPI,
    updateBookAPI,
    deleteBookAPI
}