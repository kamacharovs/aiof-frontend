import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { SquarePaper, AiofCircularProgress, DefaultDarkTeal } from '../../../style/mui';

import AddGoals from './Add';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.finance.inProgress,
    goals: state.finance.goals
});

const mapDispatchToProps = dispatch => ({
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

const GoalOverview = props => {
    return (
        <React.Fragment>
            <SquarePaper variant="outlined" square>
                <div style={{ color: DefaultDarkTeal }}>
                    <h2><strong>Goals</strong></h2>
                </div>
                <p>
                    Setting short-term, mid-term, and long-term financial goals is an important step toward becoming financially secure. 
                    If you aren’t working toward anything specific, you’re likely to spend more than you should. 
                    You’ll then come up short when you need money for unexpected bills, not to mention when you want to retire. 
                    You might get stuck in a vicious cycle of credit card debt and feel like you never have enough cash to get 
                    properly insured, leaving you more vulnerable than you need to be to handle some of life’s major risks
                </p>
            </SquarePaper>
        </React.Fragment>
    );
}

const CurrentGoals = props => {
    if (props.goals) {
        return (
            <React.Fragment>
                <SquarePaper variant="outlined" square>
                    There are goals here
                </SquarePaper>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <SquarePaper variant="outlined" square>
                    You don't have any current goals. Try setting new ones below
                    <AiofCircularProgress />
                </SquarePaper>
            </React.Fragment>
        );
    }
}

const GoalMainView = props => {
    const classes = useStyles();

    return (
        <React.Fragment>            
            <Helmet>
                <title>{props.appName} | Finance | Goals</title>
            </Helmet>

            <Container maxWidth="xl">
                <Grid container spacing={1} className={classes.root}>
                    <Grid item xs>
                        <GoalOverview />
                    </Grid>
                </Grid>

                <Grid container spacing={1} className={classes.root}>
                    <Grid item xs>
                        <CurrentGoals goals={props.goals} />
                    </Grid>
                </Grid>

                <Grid container spacing={1} className={classes.root}>
                    <Grid item xs>
                        <AddGoals />
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalMainView);