export default HomePage
import React, { useEffect, useState } from 'react';
import './homePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);

  const options = [
    "All", "Discrete Math", "Operating System", "DBMS", "Algorithms", "Calculus",
    "Probability", "Theory of Computation", "Linear Algebra", "Computer Networks",
    "Compiler Design", "JavaScript", "AI", "ML", "Trigonometry"
  ];

  useEffect(() => {
    axios.get('http://localhost:4000/api/allVideo')
      .then(res => {
        console.log(res.data.videos);
        setData(res.data.videos);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>
      
      {/* Top Subject Filter Bar */}
      <div className="homePage_options">
        {options.map((item, index) => (
          <div key={index} className="homePage_option">
            {item}
          </div>
        ))}
      </div>

      {/* Video List Section */}
      <div className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutLink"}>
        {data?.map((item) => (
          <Link to={`/watch/${item._id}`} className="youtube_Video" key={item._id}>
            <img src={item.thumbnail} alt={item.title} className="video-thumbnail" />
            <div className="video-details">
              <div className="video-title">{item.title}</div>
              <div className="video-uploader">{item.uploader}</div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};


