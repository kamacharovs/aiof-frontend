import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { AssetPaper, LiabilityPaper } from '../Common/Papers';
import { SquarePaper } from '../../style/mui';
import { H1Alt6 } from '../../style/common';
import { FINANCE, ASSETS } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.inProgress,
    inProgressAssets: state.inProgressAssets,
});

const mapDispatchToProps = dispatch => ({
    onFinance: () =>
        dispatch({ type: FINANCE, payload: agent.User.get() }),
    onAssets: () =>
        dispatch({ type: ASSETS, payload: agent.Asset.all() }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    }
}));

const SnapshotView = props => {
    if (props.currentUser) {
        const classes = useStyles();

        useEffect(() => {
            if (!props.finance) {
                props.onFinance();
            }
        }, []);

        const assets = props.assets ? props.assets : [];
        const assetsSum = assets.map(a => a.value)
            .reduce((sum, current) => sum + current, 0);

        const liabilities = props.liabilities ? props.liabilities : [];
        const liabilitiesSum = liabilities.map(a => a.value)
            .reduce((sum, current) => sum + current, 0);
        const liabilitiesMonthlyPaymentSum = liabilities.map(a => a.monthlyPayment)
            .reduce((sum, current) => sum + current, 0);

        return (
            <SquarePaper variant="outlined" square>
                <Grid container spacing={1} className={classes.root}>
                    <Grid item xs>
                        <Grid item xs>
                            <H1Alt6>Overview</H1Alt6>
                        </Grid>

                        <Grid item xs>
                            <AssetPaper
                                inProgress={props.inProgress}
                                title={"Assets"}
                                totalAssetValue={assetsSum} />
                        </Grid>
                        <Grid item xs>
                            <LiabilityPaper
                                inProgress={props.inProgress}
                                title={"Liabilities"}
                                totalValue={liabilitiesSum}
                                totalMonthlyPayment={liabilitiesMonthlyPaymentSum} />
                        </Grid>
                    </Grid>
                </Grid>
            </SquarePaper>
        );
    } else {
        return null;
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SnapshotView);