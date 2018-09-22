import * as React from 'react';
import DividendYieldRow from './DividendYieldRow/DividendYieldRow';

const API = 'http://localhost:8080/dividend-yield?year=';

export interface IDividendYieldProps {
    year: string
}

export interface IDividendYieldState {
    data: any[]
}

class DividendYield extends React.Component<IDividendYieldProps, IDividendYieldState> {

    constructor(props: IDividendYieldProps) {
        super(props);
        this.state = {
            data: []
        }
    }

    public render() {
        return (
            <section className="section">
                <div className="container">
                    <p className="subtitle">{this.props.year}</p>
                    <table className="table is-bordered">
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Dividend yield</th>
                                <th>Ex-dividend date</th>
                                <th>Dividend amount</th>
                                <th/>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map(el => ( <DividendYieldRow 
                            key={el.ticker+el.exDividendDate} 
                            name={el.name}
                            dividendYield={el.dividendYield}
                            exDividendDate={el.exDividendDate}
                            dividendAmount={el.dividendAmount}
                            infoLink={'http://www.nasdaqbaltic.com/market/?pg=details&instrument='+ el.isin} /> )) }
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }

    public componentDidMount() {
        fetch(API + this.props.year)
        .then(response => response.json())
        .then(jsonData => this.setState({data: jsonData}));
    }
}

export default DividendYield;
