import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

let { getAccessTokenSilently } = useAuth0()
let token = getAccessTokenSilently()

axios.defaults.headers.common = { 'Authorization': 'Bearer ' + token }

export default axios;