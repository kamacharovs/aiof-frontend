import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import agent from '../agent';
import FinanceList from './FinanceList';
import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants/actionTypes';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const VerticalTabs = styled(Tabs)`
  display: flex;
`;

const VerticalTabList = styled(TabList)`
  display: flex;
  flex-direction: column;
`;

const EditProfileSettings = props => {
  if (props.isUser) {
    return (
      <Link
        to="/settings"
        className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a"></i> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

const ProfileFinanceList = props => {
  return (
    <FinanceList
      assets={props.profile.assets}
      goals={props.profile.goals}
      liabilities={props.profile.liabilities} />
  );
};

const mapStateToProps = state => ({
  ...state.profile,
  currentUser: state.common.currentUser,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED })
});

class Profile extends React.Component {

  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.UserProfile.get(this.props.currentUser.username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const profile = this.props.profile;
    const currentUser = this.props.currentUser;

    if (!profile) {
      return null;
    }

    var profileMaritalStatus = "";

    if (profile.profile
      && profile.profile.maritalStatus)
    {
      profileMaritalStatus = profile.profile.maritalStatus;
    }

    return (
      <div className="profile-page">

        <div className="user-info">
          <Container>
            <Row>
              <Col xs="12">

                <h4>{profile.lastName}, {profile.firstName}</h4>
                <p>{profile.email}</p>

                <EditProfileSettings isUser={profile} />

              </Col>
            </Row>
          </Container>
        </div>
        <div className="container page">
          <Tabs>
            <TabList>
              <Tab>Profile</Tab>
              <Tab>Finances</Tab>
              <Tab>Notifications</Tab>
            </TabList>

            <TabPanel>
              <h1>Profile</h1>
              <p className="text-muted">
                Tell us about yourself so we can improve the financial advice we provide
              </p>
              <br/>
              <h2>About Me</h2>
              <br/>
              <Row>
                <Col sm="6">
                  Marital Status: 
                </Col>
                <Col sm="6">
                  <b>{profileMaritalStatus}</b>
                </Col>
              </Row>
              
              <hr />       
            </TabPanel>
            <TabPanel>
              <ProfileFinanceList profile={profile} />
            </TabPanel>
            <TabPanel>
              <h2>Any content 1</h2>
            </TabPanel>
          </Tabs>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
