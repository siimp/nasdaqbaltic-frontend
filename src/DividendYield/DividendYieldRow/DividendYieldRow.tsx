import * as React from 'react';
import Moment from 'react-moment';


export interface IDividendYieldRowProps {
    name: string
    totalDividendYield: number
    dividends: IDividend[]
    isin: string
    infoLink: string
}

interface IDividend {
    dividendYield: number
    dividendAmount: number
    stockPriceAtExDividend: number
    exDividendDate: string
    capitalDecrease: boolean
}

class DividendYieldRow extends React.PureComponent<IDividendYieldRowProps, any> {

    constructor(props: IDividendYieldRowProps) {
        super(props);
    }

    public render() {
        return (
            this.props.dividends.map((dividend, index) => (
                <tr key={index}>
                    {index === 0 ? (<td rowSpan={this.props.dividends.length}>{this.props.name}</td>) : null} 
                    {index === 0 ? (<td rowSpan={this.props.dividends.length}>{this.props.totalDividendYield.toFixed(2)} %</td>) : null} 
                    <td className="is-hidden-mobile">{dividend.dividendAmount.toFixed(2)} € {dividend.capitalDecrease ? '(capital decrease)' : ''}</td>
                    <td className="is-hidden-mobile">{dividend.stockPriceAtExDividend.toFixed(2)} €</td>
                    <td className="is-hidden-mobile"><Moment format="DD.MM.YYYY">{dividend.exDividendDate}</Moment></td>
                    {index === 0 ? (<td rowSpan={this.props.dividends.length}>
                        <a href={this.props.infoLink} target="_blank" rel="noopener noreferrer">
                            <span className="is-hidden-mobile">{this.props.isin}</span>
                            <span className="is-hidden-desktop">info</span>
                        </a>
                    </td>) : null} 
                </tr>
            ))
        );
    }

}

export default DividendYieldRow;
