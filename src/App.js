import React from 'react';
import './App.css';
import { Container } from 'reactstrap';
import Home from './pages/Home';
import Header from './components/Header';
import Admin from './pages/Home/Admin'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom'
class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      topics:[],
      modules:[],
      lessons:[],
      questions:[],
      resources:[],
      current_user:[],
      authToken:"",
    }
    this.getTopics();
    this.getModules();
    this.getLessons();
    this.getQuestions();
    this.getResources();
  }
  componentDidMount(){
    this.getTopics();
    this.getModules();
    this.getLessons();
    this.getQuestions();
    this.getResources();
  }
  async getTopics(){
    let response = await fetch('http://localhost:3000/topics');
    if(response.status === 200){
      let data = await response.json();
      this.setState({topics:data})
    }
  }
  async getModules(){
    let response = await fetch('http://localhost:3000/code_modules');
    let data = await response.json();
    if (response.status === 200) {
      this.setState({modules:data})
    }
  }
  async getLessons(){
    let response = await fetch('http://localhost:3000/lessons')
    let data = await response.json();
    if(response.status === 200){
      this.setState({lessons:data})
    }
  }
  async getQuestions(){
    let response = await fetch('http://localhost:3000/questions')
    let data = await response.json();
    if(response.status === 200) {
      this.setState({questions:data})
    }
  }
  async getResources(){
    let response = await fetch('http://localhost:3000/resources')
    let data = await response.json();
    if (response.status === 200) {
      this.setState({resources:data})
    }
  }

  loadUserData = (email,passw) => {
      fetch('http://localhost:3000/users/sign_in.json', {
          body: JSON.stringify({
              user:{
                  email:email,
                  password:passw
              }
          }),
          headers: {
              "Content-type":"application/json"
          },
          method:"POST"
      }).then((response)=> {
          console.log("res",response)
          if(response.ok){
              localStorage.setItem('authToken', response.headers.get("Authorization"));
              return response
          }
      }).then((userJson)=> console.log("userJson",userJson))
  }
  componentWillMount(){
    
    if (localStorage.getItem('authToken') !== null) {
        let token = localStorage.getItem('authToken')
        let splitToken = token.split(' ')
        let realToken = splitToken[1]
        this.setState({authToken:realToken})
    }

  }

  // setToken = () => {
  //     fetch('http://localhost:3000/users/sign_in.json', 
  //     ).then(response => {
  
  //       if (response.status === 200) {
  //         return response.json();
  //       }
  //     }).then(topicArr => {
  //       this.setState({topics:topicArr});
  //     });
  //   };

  // getTopics = () => {
  //   fetch('http://localhost:3000/topics').then(response => {

  //     if (response.status === 200) {
  //       return response.json();
  //     }
  //   }).then(topicArr => {
  //     this.setState({topics:topicArr});
  //   });
  // };

  // getModules = () => {
  //   fetch('http://localhost:3000/code_modules').then(response => {
  //     if (response.status === 200) {
  //       return response.json();
  //     }
  //   }).then(modulesArr => {
  //     this.setState({modules:modulesArr});
  //   })
  // }

  // getLessons = () => {
  //   fetch('http://localhost:3000/lessons').then(response => {
  //     if (response.status === 200) {
  //       return response.json();
  //     }
  //   }).then(lessonArr => {
  //     this.setState({lessons:lessonArr})
  //   })
  // }

  // getQuestions = () => {
  //   fetch('http://localhost:3000/questions').then(response => {
  //     if (response.status === 200) {
  //       return response.json();
  //     }
  //   }).then(questionsArr => {
  //     this.setState({questions:questionsArr})
  //   })
  // }

  // getResources = () => {
  //   fetch('http://localhost:3000/resources').then(response => {
  //     if (response.status === 200) {
  //       return response.json();
  //     }
  //   }).then(resourceArr => {
  //     this.setState({resources:resourceArr})
  //   })
  // }
  // isLogged(){
  //   let {current_user} = this.state
  //   console.log("current",current_user)
  //   if (current_user.length > 0) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }
  // isAdmin(){
  //   let {current_user } = this.state 
  //   if (this.isLogged()) {
  //     if (current_user[0].admin) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   }
  // }

  render(){
  // \6yY\Gu6d#
  const current_user = {"id":1,"email":"artortega.25@gmail.com","last_q": 5}
  const loggedIn = false
  const {topics, modules, lessons, questions, resources} = this.state;
  let isAdmin = false
  // console.log("user",this.state.current_user)
  // console.log("topics",this.state.topics)
  // console.log("modules",this.state.modules)
  // console.log("lessons",this.state.lessons)
  // console.log("questions",this.state.questions)


  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      {/* Show branding and signed in user */}
      <Header current_user={current_user}/>
      {/* show home page */}
      <Container>
        {!isAdmin &&
          <Home loadUserData = {this.loadUserData} current_user={current_user} modules={modules} lessons={lessons} loggedIn={loggedIn} questions={questions} resources={resources} topics = {topics}/>
        }
        {/* Displays Footer */}
        {isAdmin && 
          <Admin/>
        }
      </Container>
    </>
  );
  }
}
export default App;
