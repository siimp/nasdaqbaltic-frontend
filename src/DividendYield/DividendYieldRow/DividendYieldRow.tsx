import * as React from 'react';
import Moment from 'react-moment';

export interface IDividendYieldRowProps {
    name: string
    dividendYield: number
    exDividendDate: string
    stockPriceAtExDividend: number
    dividendAmount: number
    isin: string
    infoLink: string
}

class DividendYieldRow extends React.PureComponent<IDividendYieldRowProps, any> {

    constructor(props: IDividendYieldRowProps) {
        super(props);
    }

    public render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.dividendYield.toFixed(2)} %</td>
                <td className="is-hidden-mobile">{this.props.dividendAmount.toFixed(2)} €</td>
                <td className="is-hidden-mobile">{this.props.stockPriceAtExDividend.toFixed(2)} €</td>
                <td className="is-hidden-mobile"><Moment format="DD.MM.YYYY">{this.props.exDividendDate}</Moment></td>
                <td>
                    <a href={this.props.infoLink} target="_blank" rel="noopener noreferrer">
                    <span className="is-hidden-mobile">{this.props.isin}</span>
                    <span className="is-hidden-desktop">info</span>
                    </a></td>
            </tr>
        );
    }

}

export default DividendYieldRow;
