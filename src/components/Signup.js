import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = (props) => {

    // use navigate hook
    const navigate = useNavigate();

    const [cred, setCred] = useState({
        name : "",
        email : "",
        password : "",
        cpassword : ""
    })

    const handleChange = (e)=>{
        setCred({...cred,[e.target.name]:e.target.value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        if(cred.password === cred.cpassword){
                // making req to create user
            const response = await fetch(`http://localhost:3700/api/auth/createUser`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({name : cred.name, email : cred.email,password : cred.password}) // body data type must match "Content-Type" header
            }); 
            const json = await response.json()

            // if json.success === true
            if(json.success){
                // save auth token and redirect to homepage 
                localStorage.setItem("token",json.authToken);
                navigate("/notes");
                // show success alert
                props.displayAlert("Welcome to Cloud-Notes !","Success");
                // set is loggedin to true (to manipulate navbar)
                props.toggleIsLoggedIn();
            }else{
                props.displayAlert(json.error,"Danger");
            }
        }else{
            props.displayAlert("Password did not match !", "Danger")
        }
    }

  return (
    <>
   <div >
        <form onSubmit={handleSubmit} className=" gradient-custom-signup p-5" style={{height : "100%"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white" style={{"borderRadius": "1rem"}}>
          <div className="card-body p-5 text-center">

            <div className="mb-md-2 mt-md-2 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
              <p className="text-white-50 mb-5">Please enter your details !</p>

              <div className="form-outline form-white mb-4">
                <input type="text" id="userName" className="form-control form-control-lg" name='name' placeholder='Name' defaultValue={cred.name}  onChange={handleChange} minLength={3} required/>
              </div>

              <div className="form-outline form-white mb-4">
                <input type="email" id="userEmail" className="form-control form-control-lg" name = "email" placeholder='Email' defaultValue={cred.email} onChange={handleChange}/>
              </div>

              <div className="form-outline form-white mb-4">
                <input type="password" id="userPassword" className="form-control form-control-lg" name="password" placeholder='Password' defaultValue={cred.password} onChange={handleChange} minLength={5} required/>
              </div>

              <div className="form-outline form-white mb-4">
                <input type="password" id="confirmUserPassword" className="form-control form-control-lg" name="cpassword" placeholder='Confirm Password' defaultValue={cred.cpassword} onChange={handleChange} minLength={5} required/>
              </div>

             <button className="btn btn-outline-light btn-lg px-5" type="submit" >SignUp</button>

            </div>

            <p>Already a user ? <Link to="/login">Try loging in</Link></p>

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

export default Signup