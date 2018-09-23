import * as React from 'react';
import DividendYield from './DividendYield/DividendYield';
import Header from './Header/Header';

export interface IAppState {
  year?: number
}

class App extends React.Component<any, IAppState> {

  constructor(props: any) {
    super(props);
    this.state = {};
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  public handleTabChange(tabName: string) {
    const value = parseInt(tabName, 10);
    if (isNaN(value)) {
      this.setState({ year: undefined });
    } else {
      this.setState({ year: value });
    }
  }

  public render() {
    return (
      <div>
        <Header tabChangedHandler={this.handleTabChange} />
        <DividendYield year={this.state.year} />
      </div>
    );
  }
}

export default App;
