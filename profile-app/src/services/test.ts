import axios from "axios";


export function getTheImages() {
    return axios.get('https://dummyjson.com/products/1');
}