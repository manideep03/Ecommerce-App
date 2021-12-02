import axios from "../http-common";
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api';


class ProductDataService {

    getAll(){
        return axios.get(API_URL+"/getAll");
    }


    addToCart(id,qt){
        return axios.get(API_URL+`/addToCart/${id}/${qt}`,{ headers: authHeader()});
    }

    getByid(){
        return axios.get(API_URL+"/getCart",{ headers: authHeader()});
    }

    addOrder() {
       return  axios.get(API_URL + "/addOrder", {headers: authHeader()});
  
    }

    getOrders(){
        return axios.get(API_URL+"/getOrders",{ headers: authHeader()});
    }

    addProduct(data){
        return axios.post(API_URL + "/addProduct",data,{ headers: authHeader()});
    }

    deleteCart(id){
        return axios.delete(API_URL+`/deleteCart/${id}`,{ headers: authHeader()} )
    }

}

export default new ProductDataService();