import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Banner from './Banner';
import MainView from './MainView';
import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../../constants/actionTypes';


const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: HOME_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
});

const Home = props => {
  useEffect(() => () => {
    console.log("unmount")
    props.onUnload();
  }, []);

  return (
    <React.Fragment>
        <Helmet>
          <title>{props.appName} | Home</title>
        </Helmet>

        <Banner token={props.token} appName={props.appName} />
        
        <MainView />
      </React.Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
