import React from 'react' 
// import NoteContext from "../context/notes/noteContext";

const About= ()=> {
  // const a = useContext(NoteContext);
 
  return (
    <div className='aboutBgImg'>
      <div className="container p-3">
      <h1 className="mt-3 mb-4" style = {{color : 'white'}}>About Us</h1>
      <p style = {{color : 'white',fontSize:"1em"}}>Cloud-Notes is an online place for everyone to store and manage their notes.</p>
      <p style = {{color : 'white',fontSize:"1em"}}> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit vel rem explicabo possimus voluptatem nam, dolorem asperiores accusamus. Accusantium totam id suscipit voluptatem. Sed maxime nihil praesentium libero earum nemo fugiat recusandae impedit ducimus saepe natus fuga beatae eveniet dolorem excepturi enim aperiam, distinctio reiciendis velit architecto repudiandae corrupti asperiores?</p>
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