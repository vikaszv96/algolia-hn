import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import renderHTML from 'react-render-html';
import { getUser, getToken, logout } from './helpers';

import TimeDifference from "./utils/TimeDifference";
import Highlight from 'react-highlighter';

import Record from "./utils/RecordHistory";


const App = () => {
  const history = useHistory();
  var nexts = '>>', previous = '<<', targetValue;
  var un = getUser();
  var [state, setState] = useState({
    page: 0,
    search: "",
    typingTimeout: 0,
    load: true,
    filter: ["search", "story", 0],
    result: 0,
    processTime: 0,
    vals: [0,1,2,3,4,5]
  });

var { page, search, typingTimeout, load, filter, result, processTime, vals } = state;

var [posts, setPosts] = useState([]);
var urls;

var handleChange = name => e => {

    if (e.target.value == "popularity") {
      setState({
         ...state, filter: ["search_by_date", filter[1], filter[2]]
       });

        urls =
          "search~"+search+"~"+
          filter[1] +
          "~0~" +
          filter[2] + "~"
          + un;
    }
    if (e.target.value == "date") {
      setState({
      ...state, filter: ["search_by_date", filter[1], filter[2]]
      });

        urls =
          "search_by_date~"+search+"~"+
          filter[1] +
          "~0~" +
          filter[2] + "~"
          + un;
    }
    if (e.target.value == "stories") {
      setState({
        ...state, filter: [filter[0], "story", filter[2]]
      });

        urls =
          filter[0]+"~"+search+"~story~0~" +
          filter[2]+ "~"
          + un;
    }
    if (e.target.value == "comments") {
      setState({
        ...state, filter: [filter[0], "comment", filter[2]]
      });

        urls =
          filter[0]+"~"+search+"~comment~0~" +
          filter[2]+ "~"
          + un;
    }
    if (e.target.value == "all") {
      setState({ ...state,  filter: ["search", filter[1], 0] });

        urls =
          "search~"+search+"~"+
          filter[1] +
          "~0~" +
          0+ "~"
          + un;
    }
    if (e.target.value == "24h") {
      setState({
        ...state, filter: ["search_by_date", filter[1], 86400]
      });

        urls =
          "search_by_date~"+search+"~"+
          filter[1] +
          "~0~" +
          86400+ "~"
          + un;
    }
    if (e.target.value == "week") {
      setState({
         ...state, filter: [  "search_by_date", filter[1], 604800]
      });

                urls =
                  "search_by_date~"+search+"~"+
                  filter[1] +
                  "~0~" +
                  604800+ "~"
                  + un;
    }
    if (e.target.value == "month") {
      setState({
        ...state, filter: [ "search_by_date", filter[1], 2628000]
      });

        urls =
          "search_by_date~"+search+"~"+
          filter[1] +
          "~0~" +
          2628000+ "~"
          + un;
    }
    if (e.target.value == "year") {
      setState({
       ...state,  filter: [ "search_by_date", filter[1], 31535965]
      });

        urls =
          "search_by_date~"+search+"~"+
          filter[1] +
          "~0~" +
          31535965+ "~"
          + un;
    }

    console.log(urls);

    axios
        .get(`${process.env.REACT_APP_API}/posts/${urls}`)
      .then(function(response) {
        setState({
             ...state,
             result: response.data.datas.nbHits,
             processTime: response.data.datas.processingTimeMS
        });
        setPosts(response.data.datas.hits);
        console.log(response.data.datas.hits);
      })
      .catch(function(error) {
        console.log(error);
      });
  }


  const pageChange = name => event => {
      var pageNum;
      // setState({ ...state, [name]: event.target.value});
      if(event.target.value == -1)
      {
        pageNum = vals[0] + 6 - 1;
        targetValue = -1;
        // setState({
        //      ...state,
        //  vals: [ (vals[0] + 6), (vals[1] + 6), (vals[2] + 6), (vals[3] + 6), (vals[4] + 6), (vals[5] + 6)]
        // });

      }
    else if(event.target.value == -2 && vals[0] >=6)
      {
          pageNum = vals[0] - 6 - 1;
          targetValue = -2;
        // setState({
        //      ...state,
        //      vals: [ (vals[0] - 6), (vals[1] - 6), (vals[2] - 6), (vals[3] - 6), (vals[4] - 6), (vals[5] - 6)]
        // });

      }
      else {
        pageNum = event.target.value;
      }

        urls =
          filter[0]+"~"+
          search +"~"+
          filter[1] +"~"+
          pageNum +"~"+
          filter[2]+ "~"
          + un;

        axios
            .get(`${process.env.REACT_APP_API}/posts/${urls}`)
          .then(function(response) {
            setState({
                 ...state,
                 result: response.data.datas.nbHits,
                 processTime: response.data.datas.processingTimeMS
               })

                 if(targetValue == -1)
                 {
                   setState({
                        ...state,
                    vals: [ (vals[0] + 6), (vals[1] + 6), (vals[2] + 6), (vals[3] + 6), (vals[4] + 6), (vals[5] + 6)]
                   })
                 }

               else if(targetValue == -2 && vals[0] >=6)
                 {
                   setState({
                        ...state,
                        vals: [ (vals[0] - 6), (vals[1] - 6), (vals[2] - 6), (vals[3] - 6), (vals[4] - 6), (vals[5] - 6)]
                    })
                 }

            setPosts(response.data.datas.hits);
            console.log(response.data.datas.hits);
          })
          .catch(function(error) {
            console.log(error);
          });

  } //pageChange ends

    const onSearch = name => e => {

  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }

    setState({ ...state,
    search: e.target.value,
    typingTimeout: setTimeout(function() {

        urls =
          filter[0] + "~" +
          search + "~" +
          filter[1] + "~~" +
          filter[2] + "~" +
          un;
          // + "~" +

      axios
          .get(`${process.env.REACT_APP_API}/posts/${urls}`)
        .then(function(response) {
          setState({
               ...state,
               result: response.data.datas.nbHits,
               processTime: response.data.datas.processingTimeMS
          });
          setPosts(response.data.datas.hits);
          console.log(response.data.datas.hits);
        })
        .catch(function(error) {
          console.log(error);
        });
    }, 500)
  });
};

    const fetchPosts = () => {

      urls = "search~~story~0~0~"+un;

        axios
            .get(`${process.env.REACT_APP_API}/posts/${urls}`,
            )
            .then(response => {
              setState({
                   ...state,
                   result: response.data.datas.nbHits,
                   processTime: response.data.datas.processingTimeMS
              });
                setPosts(response.data.datas.hits);
            })
            .catch(error => alert(error));
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
          <div>
          <div className="fixed-top">
        <div className="bg-orange padding">
        <img className="text-logo" src={"https://hn.algolia.com/packs/media/images/logo-hn-search-a822432b.png"} width="50" height="50"/>
          <span className="text-xl text-white">{getUser()}</span>
          <span className="box" bg-white>
            <input
              type="text"
              className="input-width input-search"
              name="search"
              // value={search}
              placeholder = " 🔍 Search stories by title, url or author"
              onChange = {onSearch('search')}
              />
          </span>
          <span className="text-white ml-sm">
                 <span className="nav-item ml-auto pr-3 pt-3 pb-3">
                     <Link to="/historypage">📜 History Logs</Link>
                 </span>
         </span>
       <span className="text-white ml-sm">
          {!getUser() && (
              <span className="nav-item ml-auto pr-3 pt-3 pb-3">
                  <Link to="/login">🔑 Login</Link>
              </span>
          )}
      </span>
      <span className="text-white ml-sm">
          {getUser() && (
              <span
                  onClick={() => logout(() => history.push('/'))}
                  className="nav-item ml-auto pr-3 pt-3 pb-3"
                  style={{ cursor: 'pointer' }}
              >
                🔒 Logout
              </span>
          )}
          </span>

        </div>
        <div className="bg-white">
          <span className="filters">
            search{" "}
            <select onChange={handleChange('filter')}>
              <option value="stories">stories</option>
              <option value="comments">comments</option>
            </select>
          </span>
          <span className="filters">
            {" "}
            by{" "}
            <select onChange={handleChange('filter')}>
              <option value="popularity">popularity</option>
              <option value="date">date</option>
            </select>
          </span>
          <span className="filters">
            {" "}
            for{" "}
            <select onChange={handleChange('filter')}>
              <option value="all">All time</option>
              <option value="24h">Last 24h</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
          </span>
          <span>
            <p className="pull-right">
              {result} results ({processTime / 1000}{" "}
              seconds)
            </p>
          </span>
        </div>
      </div>

            <div className="content">
            <div className="data pl-sm">

              {posts.map((item, index) => (

                <a key={index} href={item.url} >
                  <p> <Highlight search= {search}>
                    <span className="heading"><strong>{item.title}</strong></span>
                        </Highlight>
                   <Highlight search={search}>
                  {item.story_title}
                   </Highlight>
                   </p>
                  <p className="text-xm">
                    {item.points} points | {item.author} | {TimeDifference(item.created_at)}| {item.num_comments} comments | (<Highlight search={search}>{item.url}</Highlight>)
                  </p>
                  <p>
                  <Highlight search={search}>
                  {item.comment_text}
                  </Highlight>
                  </p>
                  <hr />
                </a>
              ))}

              <center>
                <p className="footer">  <button
                    type="button"
                    className="btn"
                    value="-2"
                    onClick={pageChange('page')}
                  >
                   {previous}
                  </button>
                  <button
                    type="button"
                    className="btn"
                    value= {vals[0]}
                    onClick={pageChange('page')}
                  >
                    {vals[0]+1}
                  </button>
                  <button
                    type="button"
                    className="btn"
                    value={vals[1]}
                    onClick={pageChange('page')}
                  >
                    {vals[1]+1}
                  </button>
                  <button
                    type="button"
                    className="btn"
                    value= {vals[2]}
                    onClick={pageChange('page')}
                  >
                    {vals[2]+1}
                  </button>
                  <button
                    type="button"
                    className="btn"
                    value={vals[3]}
                    onClick={pageChange('page')}
                  >
                    {vals[3]+1}
                  </button>
                  <button
                    type="button"
                    className="btn"
                    value={vals[4]}
                    onClick={pageChange('page')}
                  >
                    {vals[4]+1}
                  </button>
                  <button
                    type="button"
                    className="btn"
                    value={vals[5]}
                    onClick={pageChange('page')}
                  >
                    {vals[5]+1}
                  </button>
                  <button
                    type="button"
                    className="btn"
                    value="-1"
                    onClick={pageChange('page')}
                  >
                   {nexts}
                  </button>
                </p>
              </center>
            </div>

            </div>
          </div>
        );
};

export default App;
