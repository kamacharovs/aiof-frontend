import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { numberWithCommas } from '../Finance/Common';
import { GreenP, RedP } from '../../style/common';
import { AiofPaper, AiofLinearProgress } from '../../style/mui';
import { FI_PAGE_LOADED, FI_ADDED_TIME } from '../../constants/actionTypes';

const mapStateToProps = state => ({
    ...state.fi,
    appName: state.common.appName,
    inProgress: state.fi.inProgress,
    addedTime: state.fi.addedTime,
});

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({ type: FI_PAGE_LOADED }),
    onSubmit: addedTime =>
        dispatch({ type: FI_ADDED_TIME, payload: agent.Fi.addedTime(addedTime) })
});

class AddedTime extends React.Component {
    constructor() {
        super();

        this.state = {
            monthlyInvestment: 10000,
            totalAdditionalExpense: 422000,
        };

        this.classes = makeStyles((theme) => ({
            root: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            margin: {
                margin: theme.spacing(1),
            },
            withoutLabel: {
                marginTop: theme.spacing(3),
            },
            textField: {
                width: '25ch',
            },
        }));

        this.updateState = field => ev => {
            const state = this.state;
            const newState = Object.assign({}, state, { [field]: ev.target.value });
            this.setState(newState);
        };

        this.submitForm = ev => {
            ev.preventDefault();
            const addedTime = Object.assign({}, this.state);
            addedTime.monthlyInvestment = addedTime.monthlyInvestment ? Number(addedTime.monthlyInvestment) : null;
            addedTime.totalAdditionalExpense = addedTime.totalAdditionalExpense ? Number(addedTime.totalAdditionalExpense) : null;
            this.props.onSubmit(addedTime);
        };
    }

    componentDidMount() {
        this.props.onLoad();

        if (this.props.addedTime) {
            this.setState({
                monthlyInvestment: this.props.addedTime.monthlyInvestment,
                totalAdditionalExpense: this.props.addedTime.totalAdditionalExpense,
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{this.props.appName} | Added time</title>
                </Helmet>
                <Container maxWidth="sm">
                    <AiofPaper elevation={3}>
                        <form className={this.classes.root} noValidate autoComplete="off" onSubmit={this.submitForm}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <div className={this.classes.margin}>
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <AttachMoneyIcon />
                                            </Grid>
                                            <Grid item>
                                                <TextField label="Monthly investment"
                                                    value={this.state.monthlyInvestment}
                                                    onChange={this.updateState('monthlyInvestment')} />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid item xs={6}>
                                    <div className={this.classes.margin}>
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <AttachMoneyIcon />
                                            </Grid>
                                            <Grid item>
                                                <TextField label="Additional expense"
                                                    value={this.state.totalAdditionalExpense}
                                                    onChange={this.updateState('totalAdditionalExpense')} />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" className={this.classes.button} >
                                        Calculate
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </AiofPaper>

                    <AddedTimeResults addedTime={this.props.addedTime} inProgress={this.props.inProgress} />

                </Container>
            </React.Fragment>
        )
    }
}

const AddedTimeResults = props => {
    if (props.addedTime) {
        return (
            <React.Fragment>
                <AiofPaper elevation={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <b>Monthly investment</b>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <GreenP>${numberWithCommas(props.addedTime.monthlyInvestment)}</GreenP>
                        </Grid>

                        <Grid item xs={6}>
                            <b>Total expenses</b>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <GreenP>${numberWithCommas(props.addedTime.totalAdditionalExpense)}</GreenP>
                        </Grid>
                    </Grid>
                    <hr />
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <b>Interest</b>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <b>Years</b>
                        </Grid>
                    </Grid>
                    {
                        props.addedTime.years.map(year => {
                            return (
                                <Grid container spacing={1} key={year.interest} >
                                    <Grid item xs={6}>
                                        <GreenP>{year.interest}%</GreenP>
                                    </Grid>
                                    <Grid item xs={6} align="right">
                                        <RedP>{year.years}</RedP>
                                    </Grid>
                                </Grid>
                            );
                        })
                    }
                    <hr/>
                </AiofPaper>
            </React.Fragment>
        );
    }
    else if (props.inProgress) {
        return (
            <AiofLinearProgress />
        );
    }
    else {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddedTime);