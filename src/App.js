import React from 'react';
// import logo from './logo.svg';
import './App.css';

import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
/* const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
); */

// function App() {
class App extends React.Component {
  /* constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }; */

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
    /* this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      // this.setState({currentUser: user});
      createUserProfileDocument(user);

      console.log(user);
    }); */
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          // console.log(snapShot.data());
          /// this.setState({
          ///   currentUser: {
          ///     id: snapShot.id,
          ///     ...snapShot.data()
          ///   }
          /// }/*, () => {
          ///   console.log(this.state);
          /// }*/);
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } // else {
        /// this.setState({currentUser: userAuth});
        setCurrentUser(userAuth);
        // }
    });
  };

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  };

  /* return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path="/hats" component={HatsPage} />
      </Switch>
    </div>
  ); */
  // from functional to class
  render() {
    return(
      <div>
        {/* <Header currentUser={this.state.currentUser} /> */}
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  };
};

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
