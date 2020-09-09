import React from 'react';
import Container from 'react-bootstrap/Container';
import { FooterNavbar, CoolLink } from '../style/common';

const HomeView = props => {
    return (
        <p>© {new Date().getFullYear()} {props.appName} All rights reserved</p>
    );
}

const LoggedOutView = props => {
    if (!props.currentUser) {
        return (
            <div className="text-right">
                <CoolLink to="/" className="nav-link">Terms & Conditions</CoolLink>
                <CoolLink to="/" className="nav-link">Privay Policy</CoolLink>
            </div>
        );
    }
    return null;
};

const LoggedInView = props => {
    if (props.currentUser) {
        return (
            <div className="text-right">
                <CoolLink to="/" className="nav-link">Terms & Conditions</CoolLink>
                <CoolLink to="/" className="nav-link">Privay Policy</CoolLink>
            </div>
        );
    }
    return null;
};


class Footer extends React.Component {
    render() {
        return (
            <FooterNavbar bg="light" variant="light" expand="sm" fixed="bottom" >
                <Container>

                    <HomeView appName={this.props.appName.toLowerCase()} />

                    <LoggedOutView currentUser={this.props.currentUser} />

                    <LoggedInView currentUser={this.props.currentUser} />

                </Container>
            </FooterNavbar>
        );
    }
}

export default Footer;