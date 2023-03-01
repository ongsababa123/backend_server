import Axios from "axios";

const instance = Axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'
    
  }
    
  });

  export default instance;
