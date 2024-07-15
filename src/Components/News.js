import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import CustomSpinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const { country, category, pageSize, apiKey } = this.props;
    const { page } = this.state;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  fetchMoreData = async () => {
    const { country, category, pageSize, apiKey } = this.props;
    const { page, articles } = this.state;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page + 1}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: articles.concat(parsedData.articles),
      page: page + 1,
    });
  };

  render() {
    return (
      <>
        <div className="container my-3">
          <h2 className="text-center" style={{ marginTop: '90px' }}>
            Top - Headlines {this.capitalizeFirstLetter(this.props.category)}
          </h2>

          {this.state.loading && <CustomSpinner />}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<CustomSpinner />}
          >
            <div className="row">
              {this.state.articles.map((element) => (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={element.description ? element.description.slice(0, 88) : ""}
                    urlToImage={element.urlToImage}
                    url={element.url}
                    author={element.author}
                    publishedAt={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}

export default News;
