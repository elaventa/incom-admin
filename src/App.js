 
import { BrowserRouter as Router, Switch, Route ,Link, Redirect} from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Authverifier from "./API/Authverifier";

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const [isAdmin, setisAdmin] = useState("not-verified");
  useEffect(() => {
    const fetchData = async () => {
      const { isAdmin: message } = await Authverifier();
      console.log(message);
      setisAdmin(message);
    };
    fetchData();
  }, []);
  
  

  if(isAdmin === 'not-verified'){
    return <div className="loader"></div>
  }

  return (
    
    <Route
      {...rest}
      render={(props) =>
        isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
function App() {
  console.log({API_ENDPOINT: process.env.REACT_APP_API_URI, G_CLIENT: process.env.REACT_APP_GOOGLE_CLIENT_ID})
  return (
    <Router>
      <Route exact path="/" render={(props) => <Login {...props} />} />
      <AuthenticatedRoute path="/dashboard" component={Dashboard} />
      {/* <Route path="/dashboard" component={Dashboard} /> */}
    </Router>
  );
}

export default App;