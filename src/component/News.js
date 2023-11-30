import React, { Component } from 'react';
import NewsIteams from './NewsIteams';
import Spiner from './Spiner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultPorops = {
      country:"us",
      pageSize: 6,
      category: 'general'
      
    }

    static propTypes = {
       country: PropTypes.string,
       pageSize: PropTypes.number,
       category: PropTypes.string
       
    }
     capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props);
    this.state = {
        articles : [],
        lodding : true,
        page : 1,
        totalResults : 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsTiger`
  }

  async updateNews(){
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=85d2a43d39084580abc074b1eaf84842&page=${this.state.page}&pageSize=${this.state.pageSize}`
    this.setState({loading : true})
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({articles:parsedData.articles, 
     totalResults : parsedData.totalResults,
     loading : false
   })
   this.props.setProgress(100)
  }
  async componentDidMount(){
     this.updateNews()
  }

  // handlePrevClick = async() => {

  //   this.setState({
  //     page:this.state.page -1 
  //   })
  //   this.updateNews()
  // }
  // handleNextClick = async () => {
  //     this.setState({
  //       page: this.state.page + 1
  //     })
  //     this.updateNews();
  //    }

 fetchMoreData = async() => {
       this.setState({page : this.state.page + 1})
       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=85d2a43d39084580abc074b1eaf84842&page=${this.state.page}&pageSize=${this.state.pageSize}`
       let data = await fetch(url)
       let parsedData = await data.json()
       this.setState({
        articles : this.state.articles.concat(parsedData.articles), 
        totalResults : parsedData.totalResults
      })
    }

 
  
  render(){

    return (
      <>
         
            <h2> NewsTiger - Top Headline on {this.capitalizeFirstLetter(this.props.category)}</h2>
            {this.state.loading && <Spiner/>}
            <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spiner/>}>
            <div className="container">
            <div className="row">
            {this.state.articles.map((element)=>{
              return <div className="col-md-4"  key={element.url}>
                        <NewsIteams title={element.title ? element.title.slice(0,45):" "} 
                        description = {element.description ? element.description.slice(0, 88):" "} imageUrl = {element.urlToImage}
                         newsUrl = {element.url} author = {element.author} date = {element.publishedAt}/>
                     </div>
            })}

            </div>
            </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between ">
                <button disabled = {this.state.page <=1} type="button" className="btn btn-dark"
                 onClick={this.handlePrevClick}> &larr; Previous</button>
                <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} 
                  type="button" className="btn btn-dark"
                 onClick={this.handleNextClick}>Next &rarr;</button>
            </div> */}
         
      </>
    )
   }
  }

         


export default News