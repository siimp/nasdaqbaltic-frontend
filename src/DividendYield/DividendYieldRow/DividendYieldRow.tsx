import * as React from 'react';
import Moment from 'react-moment';
import { isUndefined } from 'util';


export interface IDividendYieldRowProps {
    name: string
    totalDividendYield: number
    totalYesterdaysDividendYield?: number
    dividends: IDividend[]
    isin: string
    infoLink: string
}

interface IDividend {
    dividendYield: number
    dividendAmount: number
    stockPriceAtExDividend: number
    currentStockPrice?: number
    exDividendDate: string
    capitalDecrease: boolean
    dividendCost: number
}

class DividendYieldRow extends React.PureComponent<IDividendYieldRowProps, any> {

    private redText: React.CSSProperties = { color: 'red' }
    private greenText: React.CSSProperties = { color: 'forestgreen' }

    constructor(props: IDividendYieldRowProps) {
        super(props);
    }

    public render() {
        return (
            this.props.dividends.map((dividend, index) => (
                <tr key={index}>
                    {index === 0 ? (<td rowSpan={this.props.dividends.length}>{this.props.name}</td>) : null} 
                    {index === 0 ? (<td style={this.getYieldColor(this.props)} rowSpan={this.props.dividends.length}>{this.props.totalDividendYield.toFixed(2)} %</td>) : null} 

                    <td className="is-hidden-mobile">{dividend.dividendAmount.toFixed(2)} € {dividend.capitalDecrease ? '(capital decrease)' : ''}</td>
                    <td className="is-hidden-mobile">{this.getStockPrice(dividend)}</td>
                    <td className="is-hidden-mobile"><Moment format="DD.MM.YYYY">{dividend.exDividendDate}</Moment></td>
                    <td className="is-hidden-mobile">{(dividend.dividendCost/1000000.0).toFixed(2)}M €</td>
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

    private getYieldColor(props : IDividendYieldRowProps) : React.CSSProperties {
        if (isUndefined(props.totalYesterdaysDividendYield) || props.totalYesterdaysDividendYield === 0) {
            return {};
        } else if (props.totalDividendYield > props.totalYesterdaysDividendYield) {
            return this.greenText;
        } else if (props.totalDividendYield < props.totalYesterdaysDividendYield) {
            return this.redText;
        }
        return {};
    }

    private getStockPrice(dividend : IDividend) : string {
        if (!isUndefined(dividend.stockPriceAtExDividend)) {
            return dividend.stockPriceAtExDividend.toFixed(2) + ' €'
        } else if (!isUndefined(dividend.currentStockPrice)) {
            return dividend.currentStockPrice.toFixed(2) + ' €';
        }
        return '-';
    }

}

export default DividendYieldRow;
