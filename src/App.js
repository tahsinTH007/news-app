import React, { Component ,setState} from 'react';
import NavBar from './component/NavBar';
import News from './component/News';
import LoadingBar from 'react-top-loading-bar';
import {
  Route,
  Routes,
} from "react-router-dom";

export default class App extends Component {
  // apiKey = process.env.REACT_APP_NEWS_API
  state = {
    progress : 0
  }
  setProgress  = (progress) => {
    this.setState({progress : progress})
  }
  render() {
    return (
      <>
      <NavBar/>
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />    
      <Routes>
         <Route exact path="/" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="general" country = "us" category = "general"/>} />
         <Route exact path="/business" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="business" country = "us" category = "business"/>} />
         <Route exact path="/entertainment" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="entertainment" country = "us" category = "entertainment"/>} />
         <Route exact path="/health" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="health" country = "us" category = "health"/>} />
         <Route exact path="/science" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="science" country = "us" category = "science"/>} />
         <Route exact path="/sports" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="sports" country = "us" category = "sports"/>} />
         <Route exact path="/technology" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="technology" country = "us" category = "technology"/>} />
      </Routes>

      </>
    )
  }
}

