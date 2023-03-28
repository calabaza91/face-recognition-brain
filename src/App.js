import React, {Component} from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }})
  }

  calculateFaceLocation = (data) => {
    // console.log('calculateFaceLocation', data)
    let image = document.getElementById('inputimage');
    let width = Number(image.width);
    let height = Number(image.height);
    return {
      leftCol: data.left_col * width,
      topRow: data.top_row * height,
      rightCol: width - (data.right_col * width),
      bottomRow: height - (data.bottom_row * height)
    };
  }

  displayFaceBox = (box) => {
    console.log('displayFaceBox', box);
    this.setState({box: box});
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  onImageSubmit = () => {
    this.setState({imageUrl: this.state.input})

    fetch('http://localhost:3000/imageUrl', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response){
        fetch('http://localhost:3000/image', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count}))
        })
        .catch(console.log) 
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
      // console.log('response', response)
    })
    .catch(error => console.log('error', error));
}

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route});
  }

  render(){
    const {isSignedIn, imageUrl, route, box, user} = this.state;
    // console.log('current state', this.state)
    return (
      <div className="App">
        <ParticlesBg color="#ffffff" num={33} type="cobweb" bg={true}/>
        <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange}/>
        { route === 'home'
          ? <div>
              <Logo />
              <Rank name={user.name} entries={user.entries}/>
              <ImageLinkForm onInputChange = {this.onInputChange} onImageSubmit = {this.onImageSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : (
              route === 'signin'
              ? <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
              : ( 
                route === 'register'
                ? <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
                : <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
          ))
        }
      </div>
    );
  }
}

export default App;
