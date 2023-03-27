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

class App extends Component {
  constructor() {
    super();
    this.state = {
        input: '',
        imageUrl: '',
        box: {},
        route: 'signIn',
        isSignedIn: false,
        user: {
          id: '',
          name: '',
          email: '',
          entries: 0,
          joined: '',
        }
    }
  }

  // componentDidMount(){
  //   fetch('http://localhost:3000')
  //     .then(response => response.json())
  //     .then(console.log)
  // }

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
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    let image = document.getElementById('inputimage');
    let width = Number(image.width);
    let height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }


  // const PAT = 'ca7a69586c4e4bdabaf06489908b680e';
  onImageSubmit = () => {
    this.setState({imageUrl: this.state.input})
    const photo = this.state.input;

    const USER_ID = "clarifai";
    const PAT = "ca7a69586c4e4bdabaf06489908b680e";
    const APP_ID = "main";
    const MODEL_ID = "face-detection";
    // const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";    
    const IMAGE_URL = photo;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    //to specify version: MODEL_ID + "/versions/" + MODEL_VERSION_ID 

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        if(response){
          fetch('http://localhost:3000/image', {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === 'signOut'){
      this.setState({isSignedIn: false})
    } 
    else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
    const {isSignedIn, imageUrl, route, box, user} = this.state;
    return (
      <div className="App">
        <ParticlesBg
          color="#ffffff"
          num={33}
          type="cobweb"
          bg={true}
        />
        <Navigation
          isSignedIn = {isSignedIn}
          onRouteChange = {this.onRouteChange} 
        />
        { route === 'home'
          ? <div>
            <Logo />
            <Rank 
              name={user.name}
              entries={user.entries}
            />
            <ImageLinkForm
              onInputChange = {this.onInputChange}
              onImageSubmit = {this.onImageSubmit}
            />
            <FaceRecognition 
              box={box}
              imageUrl={imageUrl}
            />
          </div>
          : (
            route === 'signIn'
            ?<SignIn 
              loadUser = {this.loadUser}
              onRouteChange = {this.onRouteChange}
            />
            : <Register
              loadUser = {this.loadUser}
              onRouteChange={this.onRouteChange}
            />
            )
        }
      </div>
    );
  }
}

export default App;
