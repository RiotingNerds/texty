import React from 'react'


const ProfileForm = ({onClick, formData}) => {
  return (
    <div className="row">
      <form className="col m12">
        <div className="row">
          <div className="input-field col s6">
            <input id="first_name" type="text" className="validate" />
            <label for="first_name">First Name</label>
          </div>
          <div className="input-field col s6">
            <input id="last_name"  type="text" className="validate" />
            <label for="last_name">Last Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input id="first_name" type="text" className="validate" />
            <label for="first_name">Company</label>
          </div>
          <div className="input-field col s6">
            <input id="last_name"  ref={input=>{searchInput = input}}  type="text" className="validate" />
            <label for="last_name">Destination</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea"></textarea>
            <label for="textarea1">Testimonial</label>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <button className="waves-effect waves-light btn" onClick={()=>{onClick(searchInput.value)}}>Submit <i className="material-icons right">send</i> </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProfileForm