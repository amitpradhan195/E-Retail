import axiosInstance from './axios'

const requests = {
    postRegister:"/users/signup"
};

export const postRegister= async()=>{
    try{
        const req=await axiosInstance.post(requests.postRegister);
        return req.data;
    }
    catch(e){
        throw(e)
    }
}

export default requests;