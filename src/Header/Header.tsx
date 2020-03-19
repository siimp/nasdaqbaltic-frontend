import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import HeaderNav from './HeaderNav/HeaderNav';


export interface IHeaderProps {
    tabChangedHandler: (tabName: string) => void
}

export interface IHeaderState {
    showHelpModal?: boolean;
    showNavMenu?: boolean;
}

class Header extends React.PureComponent<IHeaderProps, IHeaderState> {

    constructor(props: IHeaderProps, state: IHeaderState) {
        super(props);
        this.state = { showHelpModal: false };
        this.openHelpModal = this.openHelpModal.bind(this);
        this.closeHelpModal = this.closeHelpModal.bind(this);
        this.toggleNavMenu = this.toggleNavMenu.bind(this);
    }

    public render() {
        return (
            <section className="hero is-info is-small">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-mobile">
                            <div className="column">
                                <h1 className="title">Dividend Yields</h1>
                                <h2 className="subtitle">Baltic market only</h2>
                            </div>
                            <div>
                                <nav className="navbar">
                                    <div className="container">
                                        <a role="button" className={"navbar-burger burger" + (this.state.showNavMenu ? "is-active" : "")} data-target="navMenu"
                                            aria-label="menu" aria-expanded="false" onClick={this.toggleNavMenu}>
                                            <span aria-hidden="true" />
                                            <span aria-hidden="true" />
                                            <span aria-hidden="true" />
                                        </a>
                                        <div className={"navbar-menu" + (this.state.showNavMenu ? "is-active" : "")}>
                                            <div id="navMenu" className="navbar-end">
                                                <a className="navbar-item" onClick={this.openHelpModal}>
                                                    <FontAwesomeIcon icon={faQuestionCircle} />&nbsp; Help
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                            </div>     
                        </div>  
                    </div>             
                </div>
                <div className="hero-foot">
                    <HeaderNav tabChangedHandler={this.props.tabChangedHandler} />
                </div>
                <div className={"modal " + (this.state.showHelpModal ? "is-active" : "")}>
                    <div className="modal-background" />
                    <div className="modal-content">
                        <h1 className="has-text-weight-bold is-size-4">Dividend yield calculation</h1>
                        <hr />
                        <p>
                            Dividend yield is calculated by dividing dividend amount by stock price at ex-dividend date and
                            multiplied by 100%.
                        </p>
                        <br />
                        <p>
                            For future dividend yield calculation current stock price is used.
                        </p>
                        <br />
                        <br />
                        <h1 className="has-text-weight-bold is-size-4">Dividend cost</h1>
                        <hr />
                        <p>
                            Dividend cost is calculated by multiplying dividend amount with total number of securities.
                        </p>
                    </div>
                    <button className="modal-close is-large" onClick={this.closeHelpModal} aria-label="close" />
                </div>
            </section>
        );
    }

    public openHelpModal() {
        this.setState({ showHelpModal: true });
    }

    public closeHelpModal() {
        this.setState({ showHelpModal: false });
    }

    public toggleNavMenu() {
        this.setState({ showNavMenu: !this.state.showNavMenu });
    }
}

export default Header;
