import React from 'react' 
// import NoteContext from "../context/notes/noteContext";

const About= ()=> {
  // const a = useContext(NoteContext);
 
  return (
    <div className='aboutBgImg'>
      <div className="container p-3">
      <h1 className="mt-3 mb-4" style = {{color : 'white'}}>About Us</h1>
      <p style = {{color : 'white',fontSize:"1em"}}>Edu Discover is a goto platform for </p>
      <p style = {{color : 'white',fontSize:"1em"}}> {`Welcome to *Edu Discover*—your trusted partner in making informed and confident career choices. In a world filled with endless opportunities, selecting the right path can feel overwhelming. That’s where we come in.

At *Edu Discover*, we believe that your career should align with your passions, skills, and personality. Our platform combines science-backed assessments with industry insights to help students and professionals alike discover careers they’ll thrive in. Whether you’re in school, college, or looking for a change, we offer personalized guidance tailored just for you.`}</p>
      <p className = "mt-5"style = {{color : 'white',fontSize:"1em"}}>Developer - Aditya Dagar</p>
      {/* <!-- Facebook icon --> */}
      <a href="https://www.facebook.com/adiidagarrr/" target={'_blank'} rel="noreferrer"><i className="fab fa-facebook-f border rounded p-1 me-3" style = {{color : 'white'}} ></i></a>

      {/* LINKEDIN ICON  */}
      <a href="https://www.linkedin.com/in/aditya-dagar-5a215a1ba/" target={'_blank'} rel="noreferrer"><i className="fab fa-linkedin-in border rounded p-1 me-3" style = {{color : 'white'}}></i></a>
      
      {/* GITHUB ICON  */}
      <a href="https://github.com/adiidagr" target={'_blank'} rel="noreferrer"><i className="fab fa-github border rounded p-1 me-3" style = {{color : 'white'}}></i></a>

      {/* TWITTER ICON  */}
      <a href="https://twitter.com/Adityadagr" target={'_blank'} rel="noreferrer"><i className="fab fa-twitter border rounded p-1 me-3" style = {{color : 'white'}}></i></a>


      </div>

    </div>
  )
}

export default About