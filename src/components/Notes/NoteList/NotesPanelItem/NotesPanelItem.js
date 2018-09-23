import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Moment from 'react-moment';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
});

class NotesPanelItem extends Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}><Moment format="DD MMMM, YYYY">{this.props.entry.time_stamp}</Moment></Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
            {this.props.entry.note}
            </Typography>
          </ExpansionPanelDetails>
          <Divider />
        </ExpansionPanel>
      </div>
    );
  }
}

NotesPanelItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotesPanelItem);