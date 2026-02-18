import makeRequest from "../httpClient";


export const fetchSearchCoin = (input:string)=>
makeRequest({  // Используем функцию-обертку
    method: "get",                              // Указываем метод
    url: "https://api.coingecko.com/api/v3/search?query="+input,  // Указываем путь
  })
export const fetchDetailCoin = (input:string)=>
makeRequest({  // Используем функцию-обертку
   method: "get",                              // Указываем метод
    url: "https://api.coingecko.com/api/v3/coins/"+input,  // Указываем путь
  })
export const fetchCategoryCoin = (input:string,page:number)=>
makeRequest({  // Используем функцию-обертку
    method: "get",                              // Указываем метод
    url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page="+page+"&category="+input,  // Указываем путь
  })
export const getCategoryList = ()=>
makeRequest({
  method:"get",
  url: "https://api.coingecko.com/api/v3/coins/categories/list"
})