import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory, withRouter } from 'react-router-dom';
import renderHTML from 'react-render-html';
import { getUser, getToken, logout } from './helpers';

import TimeDifference from "./utils/TimeDifference";
import Highlight from 'react-highlighter';

import Record from "./utils/RecordHistory";


const HistoryPage = props => {
  const history = useHistory();
  var un = getUser();

var [posts, setPosts] = useState([]);
var urls;

    const fetchPosts = () => {

        axios
            .get(`${process.env.REACT_APP_API}/historyCall/${un}`,
            )
            .then(response => {
              // alert("success history");
                setPosts(response.data.datas);
            })
            .catch(error => alert("error history = "+ error));
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
              />
          </span>
          <span className="text-white ml-sm">
                 <span className="nav-item ml-auto pr-3 pt-3 pb-3">
                     <Link to="/historypage"> History Logs</Link>
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

      </div>

            <div className="content">
            <div className="data pl-sm">
            <button type="button" class="btn btn-secondary pull-right"><Link to="/"><h5><u>Back to main dashboard</u></h5></Link></button>
            <table class="table table-striped">
     <thead>
     <tr>
     <th scope="col">#</th>
     <th scope="col">Word</th>
     <th scope="col">Time</th>
     </tr>
     </thead>
     <tbody>
             {posts.map((item, index) => (

    <tr>
      <th scope="row">{index+1}</th>
      <td>{item.word}</td>
      <td>{item.time}</td>
    </tr>
)
)}
</tbody>
</table>


            </div>
            </div>

          </div>
        );
};

export default withRouter(HistoryPage);
