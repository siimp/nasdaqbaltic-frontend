import * as React from 'react';

class Header extends React.Component {
    public render() {
        return (
            <section className="hero is-info">
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
            </section>
        );
    }
}

export default Header;
