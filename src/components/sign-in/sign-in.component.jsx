import React from "react";
import "./sign-in.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signInWithGoogle } from "../../firebase/firebase.utils.js";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({email: "", password: ""});
  }

  handleChange = event => {
    const {value, name} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return(
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          {/*<input name="email" type="email" value={this.state.email} required  onChange={this.handleChange} />
          <label>Email</label>
          <input name="password" type="password" value={this.state.password} required onChange={this.handleChange} />
          <label>Password</label> */}
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            required
            handleChange={this.handleChange}
            label="email" />
          <FormInput
            name="password"
            type="password"
            value={this.state.value}
            handleChange={this.handleChange}
            label="password" />

          {/* <input type="submit" value="Submit Form" /> */}
          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
          </div>
        </form>
      </div>
    );
  }
};

export default SignIn;