// // COUNTER APP WITHOUT HOOKS
// import React, { Component } from 'react';
// class App extends Component {
//   // a state for counter app
  
//   state = {
    
//     count: 0
//   };
// // a method to increament the count
// increament = () => {
//   this.setState({
//     count: this.state.count+1
//   });
// };
//   render() {
//     return(
//       <div>
//       <h2>Counter App</h2>
//       <button onClick={this.increament}>Clicked {this.state.count} times</button>
//       </div>
//     )
//   }
// }
// export default App;


// // COUNTER APP USING HOOKS (FUNCTION COMPONENT)
// // a function component
// import React, { Component, useState } from 'react';

// const App = () => {
// const [count, setCount] = useState(0);

// const increament = () => {
//   setCount(count + 1);
// };
// return(
//   <div>
//   <h2>Counter App</h2>
//   <button onClick={increament}>Clicked {count} times</button>
//   </div>
// )
// }
// export default App;


// // COUNTER APP  (LIFECYCLE METHOD IN CLASS COMPONENT)
// import React, { Component } from 'react';
// class App extends Component {
//   // a state for counter app
  
//   state = {
    
//     count: 0
//   };
// // a method to increament the count
// increament = () => {
//   this.setState({
//     count: this.state.count+1
//   });
// };
// // when the increament component mounts, this runs and the title changes
// componentDidMount(){
//   document.title = `Clicked ${this.state.count} times`
// }
// // w
// componentDidUpdate(){
//   document.title = `Clicked ${this.state.count} times`
// }
//   render() {
//     return(
//       <div>
//       <h2>Counter App</h2>
//       <button onClick={this.increament}>Clicked {this.state.count} times</button>
//       </div>
//     )
//   }
// }
// export default App;


// // COUNTER APP USING HOOKS (FUNCTION COMPONENT)
// // a function component
// import React, { Component, useState, useEffect } from 'react';

// const App = () => {
// const [count, setCount, setEffect] = useState(0);

// const increament = () => {
//   setCount(count + 1);
  
// };

// // useEffect is a function that takes another function as an argument
// // It runs every time there is a change in state
// useEffect(() => {
//   document.title = `Clicked ${count} times`
// });

// return(
//   <div>
//   <h2>Counter App</h2>
//   <button onClick={increament}>Clicked {count} times</button>
//   </div>
// )
// }
// export default App;


import React, { Component, useState, useEffect } from 'react';

const App = () => {
  // Creating a state with the hook useState
  const [news, setNews] = useState([]);
  // Another state for the search query
  const [search, setSearch] = useState('');
  // state to set the defaul url before search occures
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react')
  // loading state
  const [loading, setLoading] = useState(false)
  //  Now the API call to fetch the news
  const fetchNews = () => {
    // while fetching the news, loading is true
    setLoading(true)
    fetch(url)
      .then(result => result.json())
      .then(data => (setNews(data.hits), setLoading(false)))
      .catch(error => console.log(error)); //to catch error
  };
  useEffect(
    () => {
    fetchNews(); //first argument of the useEffect
  },
  [url], //second argument (an element of an array ) to ensure useEffect runs only when search button is clicked
  

  );

  const handleChange = (e) => {
setSearch(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setUrl(`http://hn.algolia.com/api/v1/search?query=${search}`)
  };
  
const showLoading = () => loading ? <h2 style={{color: 'green'}}>Loading...</h2> : ""
      {/* when the button is clicked, it runs the handleSubmit which will set the url based on search query */}
const searchForm = () =>  <form onSubmit={handleSubmit}>
        <input type="text" value={search} onChange={handleChange}/>
      <button>Search</button>
      </form>
      const showNews = () =>  news.map((n, i) =>(
        <p key={i}>{n.title}</p>
        ))
  return(
    <div>
      <h2>News</h2>
      {showLoading()}
     {searchForm()}
     {showNews()}
    </div>
    
  );
}
//BY DEFAULT, THE PAGE RUNS fetchNews WHICH MAKES THE API CALL USING function url
// WHEN THE SEARCH INPUT CHANGES, THE handleChange IS RUN WHICH WILL RUN setSearch THAT IS LITERALLY JUST LIKE DEFAULT
// THEN WHEN THE BUTTON IS CLICKED, IT RUNS RUNS THE handleSubmit WHICH WILL FIRST PREVENT THE DEFAULT BEFORE SETTING THE URL BASED ON USER INPUT

export default App;