import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { AiofPaper, DefaultHrColor } from '../../style/mui';
import { FI_COAST_FIRE } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.fi,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.fi.inProgress,
    savings: state.savings,
});

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({ type: FI_COAST_FIRE, payload: agent.User.get() }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        display: 'flex',
    },
    textField: {
        marginTop: '-6px',
        paddingBottom: '3px',
        width: '50%',
    },
    margin: {
        margin: theme.spacing(1),
    },
    hr: {
        borderTop: '1px solid',
        marginTop: '0.25rem',
        color: DefaultHrColor,
        opacity: '90%'
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const CoastFireDescription = () => {
    return (
        <React.Fragment>
            <h5>What is <strong>Coast FIRE</strong>?</h5>
            <i>Financial Independence / Retire Early</i><br/><br/>
            <p>
            Contrary to popular belief, the term <strong>Coast FIRE</strong> does not refer to achieving financial independence or early retirement while living on the coast.
            <br/><br/>
            Rather, <strong>Coast FIRE</strong> is defined as having enough money invested at an early enough age that you no longer need to invest any more to achieve financial independence by age 65 (or whatever age you define as a retirement age).
            <br/><br/>
            For example, suppose we define financial independence as having 25 times your annual expenses saved up. So, if you spend $40,000 per year then you need $1 million to be financially independent.
            <br/><br/>
            Following a <strong>Coast FIRE</strong> approach, if you could save $182,000 by age 30 and simply not touch that money for 35 years, then it would eventually grow to $1 million by age 65 assuming a 5% annual rate of return after inflation.
            <br/><br/>
            This is a simple example of <strong>Coast FIRE</strong>. Once you hit $182k in investments by age 30, you can simply “coast” to financial independence over the next 35 years without contributing any more of your savings to investments 
            because you already have enough money invested and enough time on your side to let your investments grow to $1 million by age 65.
            <br/>
            </p>
        </React.Fragment>
    );
}


const SavingsRateInputs = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <div className={classes.margin}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <ArrowUpwardIcon />
                            </Grid>
                            <Grid item>
                                <TextField label="Initial interest rate"
                                    value={props.initialInterestRate}
                                    onChange={e => props.setInitialInterestRate(e.target.value)} />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item xs={4}>
                    <div className={classes.margin}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <ArrowUpwardIcon />
                            </Grid>
                            <Grid item>
                                <TextField label="Start age"
                                    value={props.startAge}
                                    onChange={e => props.setStartAge(e.target.value)} />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item xs={4}>
                    <div className={classes.margin}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <ArrowUpwardIcon />
                            </Grid>
                            <Grid item>
                                <TextField label="End age"
                                    value={props.endAge}
                                    onChange={e => props.setEndAge(e.target.value)} />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <div className={classes.margin}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AttachMoneyIcon />
                            </Grid>
                            <Grid item>
                                <TextField label="Current balance"
                                    value={props.currentBalance}
                                    onChange={e => props.setCurrentBalance(e.target.value)} />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const SavingsRateGenerator = props => {
    const classes = useStyles();

    const startAge = props.startAge ? Number(props.startAge) : 33
    const endAge = props.endAge ? Number(props.endAge) : 72

    let years = endAge - startAge
    let year = new Date().getFullYear()
    let [savingsRateList, setSavingsRateList] = useState([]);

    const onUpdateYearlyReturn = (index, yearlyReturn) => {
        const savingsRateListCopy = [...savingsRateList];
        savingsRateListCopy[index].yearlyReturn = yearlyReturn
        setSavingsRateList(savingsRateListCopy)
    }
    const onUpdateContribution = (index, contribution) => {
        const savingsRateListCopy = [...savingsRateList];
        savingsRateListCopy[index].contribution = contribution
        setSavingsRateList(savingsRateListCopy)
    }

    if (savingsRateList.length === 0) {
        const firstTenPercAge = startAge + Math.ceil(years * 0.1);
        const secondTenPercAge = firstTenPercAge + Math.ceil(years * 0.1);
        const thirdTenPercAge = secondTenPercAge + Math.ceil(years * 0.1);
        const nextFortyPercAge = thirdTenPercAge + Math.ceil(years * 0.4);
        const lastThirtyPercAge = nextFortyPercAge + Math.ceil(years * 0.3);

        for (var i = 0; i < years + 1; i++) {
            let sr = {}
            sr.age = startAge + i
            sr.year = year
            sr.yearlyReturn = 8

            if (startAge + i <= firstTenPercAge) {
                sr.contribution = 15000
            } else if (startAge + i <= secondTenPercAge) {
                sr.contribution = 30000
            } else if (startAge + i <= thirdTenPercAge) {
                sr.contribution = 70000
            } else if (startAge + i <= nextFortyPercAge) {
                sr.contribution = 0
            } else if (startAge + i <= lastThirtyPercAge) {
                sr.contribution = -100000
                sr.yearlyReturn = 6
            } else {
                sr.contribution = 0
            }

            year += 1
            savingsRateList.push(sr)
        }
    }

    useEffect(() => {

    }, []);

    return (
        <React.Fragment>
                <Grid container spacing={1} className={classes.container}>
                    <Grid item xs={3}>
                        <strong>Age</strong>
                    </Grid>

                    <Grid item xs={3}>
                        <strong>Year</strong>
                    </Grid>

                    <Grid item xs={3}>
                        <strong>Contribution</strong>
                    </Grid>

                    <Grid item xs={3}>
                        <strong>Yearly return</strong>
                    </Grid>
                </Grid>
                {
                    savingsRateList.map((sr, index) => {
                        return (
                            <Grid key={sr.age} container spacing={1} className={classes.container}>
                                <Grid item xs={3}>
                                    {sr.age}
                                </Grid>

                                <Grid item xs={3}>
                                    {sr.year}
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField className={classes.textField}
                                        value={sr.contribution}
                                        onChange={e => onUpdateContribution(index, e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField className={classes.textField}
                                        value={sr.yearlyReturn}
                                        onChange={e => onUpdateYearlyReturn(index, e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        );
                    })
                }
        </React.Fragment>
    );
}

const getSteps = () => {
    return ["Basic information", "Customize each year", "Submit"];
}
const getStepContent = (stepIndex) => {
    const classes = useStyles();
    
    const [startAge, setStartAge] = useState(33);
    const [endAge, setEndAge] = useState(72);
    const [initialInterestRate, setInitialInterestRate] = useState(2);
    const [currentBalance, setCurrentBalance] = useState(100000);

    switch (stepIndex) {
        case 0:
            return (
                <React.Fragment>
                    <CoastFireDescription />
                    <hr className={classes.hr} />
                    <SavingsRateInputs 
                        startAge={startAge} setStartAge={setStartAge}
                        endAge={endAge} setEndAge={setEndAge}
                        initialInterestRate={initialInterestRate} setInitialInterestRate={setInitialInterestRate}
                        currentBalance={currentBalance} setCurrentBalance={setCurrentBalance} />
                </React.Fragment>
            );
        case 1:
            return <SavingsRateGenerator
                        startAge={startAge}
                        endAge={endAge} />;
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Unknown stepIndex';
    }
}

const SavingsRateStepper = (props) => {
    const classes = useStyles();

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>{props.appName} | Coast FIRE savings</title>
            </Helmet>

            <Container maxWidth="md">
                <AiofPaper elevation={3}>
                    <div className={classes.root}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <hr className={classes.hr} />
                        <div>
                            {activeStep === steps.length ? (
                                <div>
                                    <Typography className={classes.instructions}>All steps completed</Typography>
                                    <Button onClick={handleReset}>Reset</Button>
                                </div>
                            ) : (
                                    <div>
                                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                        <div>
                                            <hr className={classes.hr} />
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                className={classes.backButton}
                                            >
                                                Back
                                        </Button>
                                            <Button variant="contained" color="primary" onClick={handleNext}>
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>

                </AiofPaper>
            </Container>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SavingsRateStepper);