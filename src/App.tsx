import * as React from 'react';
import DividendYield from './DividendYield/DividendYield';
import Header from './Header/Header';

class App extends React.Component {
  public render() {
    return (
      <div>
        <Header />
        <DividendYield year="2017" />
      </div>
    );
  }
}

export default App;
