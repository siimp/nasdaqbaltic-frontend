import * as React from 'react';
import HeaderNav from './HeaderNav/HeaderNav';

export interface IHeaderProps {
    tabChangedHandler: (tabName: string) => void
}

class Header extends React.PureComponent<IHeaderProps, any> {

    constructor(props: IHeaderProps) {
        super(props);
    }

    public render() {
        return (
            <section className="hero is-info is-small">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Nasdaq Baltic
                </h1>
                        <h2 className="subtitle">
                            Dividend Yields
                </h2>
                    </div>
                </div>
                <div className="hero-foot">
                    <HeaderNav tabChangedHandler={this.props.tabChangedHandler} />
                </div>
            </section>
        );
    }
}

export default Header;
