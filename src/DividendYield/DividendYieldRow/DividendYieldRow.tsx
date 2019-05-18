import * as React from 'react';
import Moment from 'react-moment';
import { isUndefined } from 'util';
import DividendUtil from '../../util/DividendUtil';


export interface IDividendYieldRowProps {
    name: string
    totalDividendYield: number
    totalYesterdaysDividendYield?: number
    dividends: IDividend[]
    isin: string
    infoLink: string
    detailedInfoModalSetter: any
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
                    {index === 0 ? (<td style={this.getYieldColor(this.props)} rowSpan={this.props.dividends.length}>{DividendUtil.toFixedNumber(this.props.totalDividendYield)} %</td>) : null} 

                    <td className="is-hidden-touch">{DividendUtil.toFixedNumber(dividend.dividendAmount)} € {dividend.capitalDecrease ? '(capital decrease)' : ''}</td>
                    <td className="is-hidden-touch">{this.getStockPrice(dividend)}</td>
                    <td className="is-hidden-touch"><Moment format="DD.MM.YYYY">{dividend.exDividendDate}</Moment></td>
                    <td className="is-hidden-touch">{DividendUtil.getDividendCost(dividend)}M €</td>
                    {index === 0 ? (
                        <td rowSpan={this.props.dividends.length} className="has-text-centered">
                        <a className="is-hidden-touch" href={this.props.infoLink} target="_blank" rel="noopener noreferrer">{this.props.isin}</a>
                        <button className="is-hidden-desktop button" onClick={this.showDetailedInfoModal(this.props.dividends, this.props.infoLink, this.props.isin, this.props.name)}>show</button>
                        </td>
                    ) : null} 
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
            return DividendUtil.toFixedNumber(dividend.stockPriceAtExDividend) + ' €'
        } else if (!isUndefined(dividend.currentStockPrice)) {
            return DividendUtil.toFixedNumber(dividend.currentStockPrice) + ' €';
        }
        return '-';
    }

    private showDetailedInfoModal(dividends: any, infoLink: string, isin: string, name: string) : any {
        return () => { 
            this.props.detailedInfoModalSetter(dividends, infoLink, isin, name);
        }
    }

}

export default DividendYieldRow;
