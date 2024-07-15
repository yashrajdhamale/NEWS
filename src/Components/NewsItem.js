import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewsItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    urlToImage: PropTypes.string,
    url: PropTypes.string,
    author: PropTypes.string,
    publishedAt: PropTypes.string,
    source: PropTypes.string,
  };

  render() {
    let { title, description, urlToImage, url, publishedAt, author, source } = this.props;
    let date = new Date(publishedAt).toGMTString();

    return (
      <div>
        <div className="card" style={{ width: "100%" }}>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '80%', zIndex: '1' }}>
            {source}
          </span>
          <img
            style={{ height: "auto", width: "100%" }}
            src={!urlToImage ? "https://media.npr.org/include/images/facebook-default-wide-s1400-c100.jpg" : urlToImage}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className='card-text'><small className='text-muted'>By {!author ? "Unknown" : author} on {date}</small></p>
            <a rel="noreferrer" href={url} className="btn btn-sm btn-dark" target='_blank'>Read More</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
