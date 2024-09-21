import React from 'react'

function Alert(props) {

  return (
    props.alert && <div style={{height : "8vh"}}>
        <div className={`alert alert-${props.alert.type.toLowerCase()} alert-dismissible fade show`} role="alert">
            <strong>{`${props.alert.message}`}</strong> 
        </div>
    </div>
  )
}


export default Alert