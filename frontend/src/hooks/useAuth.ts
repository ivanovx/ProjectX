import React from "react";
import AuthContext from "../modules/authContext";

const useAuth = () => React.useContext(AuthContext);

export default useAuth;