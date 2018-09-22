import * as React from 'react';

export interface IDividendYieldRowProps {
    name: string
    dividendYield: number
    exDividendDate: string
    dividendAmount: number
    infoLink: string
}

class DividendYieldRow extends React.Component<IDividendYieldRowProps, any> {

    constructor(props: IDividendYieldRowProps) {
        super(props);
    }

    public render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.dividendYield.toFixed(2)} %</td>
                <td>{this.props.exDividendDate}</td>
                <td>{this.props.dividendAmount.toFixed(2)}</td>
                <td><a href={this.props.infoLink} target="_blank" rel="noopener noreferrer">more info</a></td>
            </tr>
        );
    }

}

export default DividendYieldRow;
