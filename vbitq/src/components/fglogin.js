import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


firebase.initializeApp({
  apiKey:"AIzaSyDgqeo5Z3PWQX6EXp5UFUVGOAX6YDqx-kU",
  authDomain: "vbitquora-1553528954037.firebaseapp.com"
})

class Login extends Component {
  state={ isSignedIn : false}
  uiConfig = {
    signInFlow:"popup",
    signInOptions:[
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks:{
      signInSuccess:()=>false
    }
  }

  componentDidMount = ()=>{
    
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn:!!user})
      console.log("user",user)
    })
  }

  render() {
    return (
      <div className="Login">
      {this.state.isSignedIn ?(
        <span>
      <div>Signed in!</div>
      <button onClick={() => firebase.auth().signOut()}>Signout!</button>
      <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
      <img alt="profilepicture" src={firebase.auth().currentUser.photoURL} />
      </span>
       ) : (
        <StyledFirebaseAuth
        uiConfig={this.uiConfig}
        firebaseAuth={firebase.auth()}
        />
        ) }
       
      </div>
    );
  }
}

export default Login;