import Axios from "axios";

const instance = Axios.create({
    baseURL: 'https://dull-puce-parrot-toga.cyclic.app/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'
    
  }
    
  });

  export default instance;
