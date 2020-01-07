import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import Landing from './landing';

// const App = () => (
//   <div>
//     <header>
//       <h1>Dietsana, yum!</h1>
//       <GreetingContainer />
//     </header>
//   </div>
// );

// export default App;

////////////////////////////////////////
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      landing: true
    };
  };

  // need to create logic to
  // this.setState({ landing: false }) 
  // if user signs up or logs in

  render() {
    if (!!this.state.landing) {
      return (
        <div>
          <Landing />
          <GreetingContainer />
        </div>
      )
    } else {
      return (
        <GreetingContainer />
      )
    }
  }
}

export default App;