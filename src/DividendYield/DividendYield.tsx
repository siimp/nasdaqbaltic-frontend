import * as React from 'react';
import { isUndefined } from 'util';
import DividendYieldRow from './DividendYieldRow/DividendYieldRow';

const API_HOST = 'https://nasdaqbaltic.siimp.ee/api';
// const API_HOST = 'http://localhost:8080';
const API_YEAR = API_HOST + '/dividend-yield?year=';
const API_FUTURE = API_HOST + '/dividend-yield/future';

export interface IDividendYieldProps {
    year?: number
}

export interface IDividendYieldState {
    data: any[]
}

class DividendYield extends React.PureComponent<IDividendYieldProps, IDividendYieldState> {

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
                {this.state.data.length === 0 ? (<p className="is-size-5">No future dividends are announced as of this moment.</p>) :
                    <table className="table is-bordered">
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Dividend Yield</th>
                                <th className="is-hidden-mobile">Dividend Amount</th>
                                <th className="is-hidden-mobile">Price at Ex-Dividend</th>
                                <th className="is-hidden-mobile">Ex-Dividend Date</th>
                                <th>Nasdaq</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map(el => (<DividendYieldRow
                                key={el.ticker + el.exDividendDate}
                                name={el.name}
                                totalDividendYield={el.totalDividendYield}
                                dividends={el.dividends}
                                isin={el.isin}
                                infoLink={'http://www.nasdaqbaltic.com/market/?pg=details&lang=en&instrument=' + el.isin} />))}
                        </tbody>
                    </table>
                }
                </div>
            </section>
        );
    }

    public componentDidMount() {
        this.fetchData();
    }

    public componentDidUpdate(prevProps: any, prevState: any) {
        if (this.props.year !== prevProps.year) {
            this.fetchData();
        }
    }

    private fetchData() {
        console.log("fetching data", this.getApiUrl())
        fetch(this.getApiUrl())
            .then(response => response.json())
            .then(jsonData => this.setState({ data: jsonData }));
    }

    private getApiUrl(): string {
        if (isUndefined(this.props.year)) {
            return API_FUTURE;
        }
        return API_YEAR + this.props.year;
    }
}

export default DividendYield;
