import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'

const Login = (props) => {


    const [cred, setCred] = useState({
        email : "",
        password : ""
    })
 
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setCred({...cred,[e.target.name]:e.target.value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const reqBody = {email : cred.email,password : cred.password};
        console.log(reqBody);
        // making req to 
        const response = await fetch(`http://localhost:3700/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody) // body data type must match "Content-Type" header
        });
        const json = await response.json()
        console.log(json);
        // if json.success === true
        if(json.success){
            // store auth Token in local storage to use later ...and redirect
            localStorage.setItem("token",json.authToken);
            // redirecting using useNavigate() hook from react-router-dom
            navigate("/quiz");
            props.displayAlert("Welcome back !", "Success");
            // set is loggedin to true (to manipulate navbar)
            props.toggleIsLoggedIn();
            

        }else{
            // tell them invalid credentials
            props.displayAlert("Invalid credentials !","Danger");
        }
    }



  return (
    <>
   <div>
        <form onSubmit={handleSubmit} className="vh-100 gradient-custom-login p-5">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white" style={{"borderRadius": "1rem"}}>
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your email and password !</p>

              <div className="form-outline form-white mb-4">
                <input type="email" id="typeEmailX" className="form-control form-control-lg" name= "email" placeholder='Email' onChange={handleChange} defaultValue={cred.email} required/>
              </div>

              <div className="form-outline form-white mb-4">
                <input type="password" id="typePasswordX" className="form-control form-control-lg" name="password" placeholder='Password'  onChange={handleChange} defaultValue={cred.password} minLength={5} required/>
              </div>

             <button className="btn btn-outline-light btn-lg px-5" type="submit" >Login</button>

            </div>

            <p>Not a user ? <Link to="/signup">Sign Up now</Link></p>

          </div>
        </div>
      </div>
    </div>
  </div>
</form>
    </div>
    </>
  )
}

export default Login