import React from 'react';

import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const useStyles = makeStyles((theme) => ({
    alignLeft: {
      // TODO: adjust this value accordingly
      flex: 0.2
    }
  }));

export const AddEditDeleteTimeline = props => {
    const entity = props.entity;

    if (entity) {
        const classes = useStyles();

        return (
            <React.Fragment>
                <Paper>
                    <Grid
                        container
                        direction="column"
                        spacing={1}>
                        <Grid item xs>
                            <Typography variant="h1" sx={{ textAlign: "center" }}>
                                Manage your {entity}
                            </Typography>
                        </Grid>

                        <Grid item xs>
                            <Timeline position="alternate">
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineConnector />
                                        <TimelineDot color="primary">
                                            <AddIcon />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                                        <Typography variant="h6" component="span">
                                            Add
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                            Expand your financial data by adding a {entity}
                                        </Typography>
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineConnector />
                                        <TimelineDot color="primary">
                                            <EditIcon />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                                        <Typography variant="h6" component="span">
                                            Edit
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                            Manage your financial data by editing your {entity}
                                        </Typography>
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineConnector />
                                        <TimelineDot color="error">
                                            <DeleteIcon />
                                        </TimelineDot>
                                        <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                                    </TimelineSeparator>
                                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                                        <Typography variant="h6" component="span">
                                            Delete
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                            Clean up your financial data by deleting a no longer needed {entity}
                                        </Typography>
                                    </TimelineContent>
                                </TimelineItem>
                            </Timeline>
                        </Grid>
                    </Grid>
                </Paper>
            </React.Fragment>
        );
    } else {
        return null;
    }
}