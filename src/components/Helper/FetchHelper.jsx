export const Init  = (methodType)=>( {
  method: "GET",
  accept: "application/json",
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Include JWT token in the Authorization header
  },
});


export const GetPagedAddress =(controllerName, state)=>{

    let baseUrl = "http://localhost:5027/odata/"+controllerName+"?$count=true&"+state;
    return baseUrl;
}
