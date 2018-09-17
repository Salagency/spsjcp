import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instascan from 'instascan';
import moment from 'moment';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 700,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
    width: '100%',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    }
  }
});

class Scan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plate: '',
      ticketTime: '',
      scannedTime: '',
      hoursParked: 0
    };

    this.initCamera = this.initCamera.bind(this);
    this.setTimes = this.setTimes.bind(this);
    this.calculateTime = this.calculateTime.bind(this);
    this.handlePrintReceipt = this.handlePrintReceipt.bind(this);
  }

  componentDidMount(props) {
    this.initCamera();
  }

  handlePrintReceipt() {
    const { plate, ticketTime, scannedTime, hoursParked } = this.state;
    const ticketCreationDate = new Date(ticketTime).getDate();
    const ticketScannedDate = new Date(scannedTime).getDate();
    let totalDays = 0;
    let remaindingHours = 0;
    let newDayFee = 0;
    let totalDue = 0;


    if (hoursParked < 6) {
      totalDue = hoursParked * 6;
    } else if (hoursParked === 6) {
      totalDue = 35;
    } else if (hoursParked > 6 && ticketCreationDate < ticketScannedDate) {
      const timeSpentToday = moment().startOf('day').fromNow();
      if (timeSpentToday.indexOf('minutes') > -1) {
        totalDue = 6;
      } else {
        totalDays = ticketScannedDate - ticketCreationDate;
        remaindingHours = (moment().startOf('day').fromNow()).replace('hour ago', '').replace('hours ago', '').replace('minutes ago', '');
        remaindingHours = remaindingHours - 7;
        totalDue = remaindingHours * 6 > 35 ? 35 + (totalDays * 35) : remaindingHours * 6 + (totalDays * 35);
      }
    } else if (hoursParked > 6 && ticketCreationDate === ticketScannedDate) {
      totalDue = hoursParked * 6 > 35 ? 35 : hoursParked * 6;
    }

    const labelXml = `<?xml version="1.0" encoding="utf-8"?>
    <ContinuousLabel Version="8.0" Units="twips">
      <PaperOrientation>Portrait</PaperOrientation>
      <Id>Continuous</Id>
      <PaperName>30270 Continuous</PaperName>
      <LengthMode>Auto</LengthMode>
      <LabelLength>0</LabelLength>
      <RootCell>
        <Length>0</Length>
        <LengthMode>Auto</LengthMode>
        <BorderWidth>0</BorderWidth>
        <BorderStyle>Solid</BorderStyle>
        <BorderColor Alpha="255" Red="0" Green="0" Blue="0"/>
        <SubcellsOrientation>Vertical</SubcellsOrientation>
        <Subcells>
          <Cell>
            <TextObject>
              <Name>TEXT</Name>
              <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
              <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
              <LinkedObjectName></LinkedObjectName>
              <Rotation>Rotation0</Rotation>
              <IsMirrored>False</IsMirrored>
              <IsVariable>False</IsVariable>
              <HorizontalAlignment>Center</HorizontalAlignment>
              <VerticalAlignment>Middle</VerticalAlignment>
              <TextFitMode>None</TextFitMode>
              <UseFullFontHeight>True</UseFullFontHeight>
              <Verticalized>False</Verticalized>
              <StyledText>
                <Element>
                  <String>St Philip and St James Car Park</String>
                  <Attributes>
                    <Font Family="Calibri" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                  </Attributes>
                </Element>
              </StyledText>
            </TextObject>
            <ObjectMargin Left="0" Right="0" Top="0" Bottom="0"/>
            <Length>720</Length>
            <LengthMode>Auto</LengthMode>
            <BorderWidth>0</BorderWidth>
            <BorderStyle>Solid</BorderStyle>
            <BorderColor Alpha="255" Red="0" Green="0" Blue="0"/>
          </Cell>
          <Cell>
            <ShapeObject>
              <Name>SHAPE</Name>
              <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
              <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
              <LinkedObjectName></LinkedObjectName>
              <Rotation>Rotation0</Rotation>
              <IsMirrored>False</IsMirrored>
              <IsVariable>False</IsVariable>
              <ShapeType>HorizontalLine</ShapeType>
              <LineWidth>20</LineWidth>
              <LineAlignment>LeftOrTop</LineAlignment>
              <FillColor Alpha="0" Red="0" Green="0" Blue="0"/>
            </ShapeObject>
            <ObjectMargin Left="0" Right="0" Top="0" Bottom="0"/>
            <Length>441.6406</Length>
            <LengthMode>Fixed</LengthMode>
            <BorderWidth>0</BorderWidth>
            <BorderStyle>Solid</BorderStyle>
            <BorderColor Alpha="255" Red="0" Green="0" Blue="0"/>
          </Cell>
          <Cell>
            <TextObject>
              <Name>TEXT_1</Name>
              <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
              <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
              <LinkedObjectName></LinkedObjectName>
              <Rotation>Rotation0</Rotation>
              <IsMirrored>False</IsMirrored>
              <IsVariable>False</IsVariable>
              <HorizontalAlignment>Center</HorizontalAlignment>
              <VerticalAlignment>Middle</VerticalAlignment>
              <TextFitMode>ShrinkToFit</TextFitMode>
              <UseFullFontHeight>True</UseFullFontHeight>
              <Verticalized>False</Verticalized>
              <StyledText>
                <Element>
                  <String>PARKING RECEIPT</String>
                  <Attributes>
                    <Font Family="Calibri" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                  </Attributes>
                </Element>
              </StyledText>
            </TextObject>
            <ObjectMargin Left="0" Right="0" Top="0" Bottom="0"/>
            <Length>760</Length>
            <LengthMode>Auto</LengthMode>
            <BorderWidth>0</BorderWidth>
            <BorderStyle>Solid</BorderStyle>
            <BorderColor Alpha="255" Red="0" Green="0" Blue="0"/>
          </Cell>
          <Cell>
            <ShapeObject>
              <Name>SHAPE_1</Name>
              <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
              <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
              <LinkedObjectName></LinkedObjectName>
              <Rotation>Rotation0</Rotation>
              <IsMirrored>False</IsMirrored>
              <IsVariable>False</IsVariable>
              <ShapeType>HorizontalLine</ShapeType>
              <LineWidth>20</LineWidth>
              <LineAlignment>LeftOrTop</LineAlignment>
              <FillColor Alpha="0" Red="0" Green="0" Blue="0"/>
            </ShapeObject>
            <ObjectMargin Left="0" Right="0" Top="0" Bottom="0"/>
            <Length>462.6562</Length>
            <LengthMode>Fixed</LengthMode>
            <BorderWidth>0</BorderWidth>
            <BorderStyle>Solid</BorderStyle>
            <BorderColor Alpha="255" Red="0" Green="0" Blue="0"/>
          </Cell>
          <Cell>
            <TextObject>
              <Name>TEXT_4</Name>
              <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
              <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
              <LinkedObjectName></LinkedObjectName>
              <Rotation>Rotation0</Rotation>
              <IsMirrored>False</IsMirrored>
              <IsVariable>False</IsVariable>
              <HorizontalAlignment>Center</HorizontalAlignment>
              <VerticalAlignment>Middle</VerticalAlignment>
              <TextFitMode>ShrinkToFit</TextFitMode>
              <UseFullFontHeight>True</UseFullFontHeight>
              <Verticalized>False</Verticalized>
              <StyledText>
                <Element>
                  <String>PCA 9999</String>
                  <Attributes>
                    <Font Family="Calibri" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                  </Attributes>
                </Element>
              </StyledText>
            </TextObject>
            <ObjectMargin Left="0" Right="0" Top="0" Bottom="0"/>
            <Length>760</Length>
            <LengthMode>Auto</LengthMode>
            <BorderWidth>0</BorderWidth>
            <BorderStyle>Solid</BorderStyle>
            <BorderColor Alpha="255" Red="0" Green="0" Blue="0"/>
          </Cell>
          <Cell>
            <TextObject>
              <Name>TEXT_DATE</Name>
              <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
              <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
              <LinkedObjectName></LinkedObjectName>
              <Rotation>Rotation0</Rotation>
              <IsMirrored>False</IsMirrored>
              <IsVariable>False</IsVariable>
              <HorizontalAlignment>Left</HorizontalAlignment>
              <VerticalAlignment>Middle</VerticalAlignment>
              <TextFitMode>None</TextFitMode>
              <UseFullFontHeight>True</UseFullFontHeight>
              <Verticalized>False</Verticalized>
              <StyledText>
                <Element>
                  <String>Paid: $6.00</String>
                  <Attributes>
                    <Font Family="Calibri" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                  </Attributes>
                </Element>
              </StyledText>
            </TextObject>
            <ObjectMargin Left="0" Right="0" Top="0" Bottom="0"/>
            <Length>760</Length>
            <LengthMode>Auto</LengthMode>
            <BorderWidth>0</BorderWidth>
            <BorderStyle>Solid</BorderStyle>
            <BorderColor Alpha="255" Red="0" Green="0" Blue="0"/>
          </Cell>
          <Cell>
            <DateTimeObject>
              <Name>DATE-TIME_1</Name>
              <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
              <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
              <LinkedObjectName></LinkedObjectName>
              <Rotation>Rotation0</Rotation>
              <IsMirrored>False</IsMirrored>
              <IsVariable>False</IsVariable>
              <HorizontalAlignment>Left</HorizontalAlignment>
              <VerticalAlignment>Middle</VerticalAlignment>
              <TextFitMode>None</TextFitMode>
              <UseFullFontHeight>True</UseFullFontHeight>
              <Verticalized>False</Verticalized>
              <DateTimeFormat>DayAbbrMonthYear</DateTimeFormat>
              <Font Family="Calibri" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
              <PreText>Out: </PreText>
              <PostText></PostText>
              <IncludeTime>True</IncludeTime>
              <Use24HourFormat>False</Use24HourFormat>
            </DateTimeObject>
            <ObjectMargin Left="0" Right="0" Top="0" Bottom="0"/>
            <Length>720</Length>
            <LengthMode>Auto</LengthMode>
            <BorderWidth>0</BorderWidth>
            <BorderStyle>Solid</BorderStyle>
            <BorderColor Alpha="255" Red="0" Green="0" Blue="0"/>
          </Cell>
          <Cell>
            <TextObject>
              <Name>TEXT_2</Name>
              <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
              <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
              <LinkedObjectName></LinkedObjectName>
              <Rotation>Rotation0</Rotation>
              <IsMirrored>False</IsMirrored>
              <IsVariable>False</IsVariable>
              <HorizontalAlignment>Left</HorizontalAlignment>
              <VerticalAlignment>Middle</VerticalAlignment>
              <TextFitMode>None</TextFitMode>
              <UseFullFontHeight>True</UseFullFontHeight>
              <Verticalized>False</Verticalized>
              <StyledText>
                <Element>
                  <String>Paid: $6.00</String>
                  <Attributes>
                    <Font Family="Calibri" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                  </Attributes>
                </Element>
              </StyledText>
            </TextObject>
            <ObjectMargin Left="0" Right="0" Top="0" Bottom="0"/>
            <Length>760</Length>
            <LengthMode>Auto</LengthMode>
            <BorderWidth>0</BorderWidth>
            <BorderStyle>Solid</BorderStyle>
            <BorderColor Alpha="255" Red="0" Green="0" Blue="0"/>
          </Cell>
          <Cell>
            <ShapeObject>
              <Name>SHAPE_1_1</Name>
              <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
              <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
              <LinkedObjectName></LinkedObjectName>
              <Rotation>Rotation0</Rotation>
              <IsMirrored>False</IsMirrored>
              <IsVariable>False</IsVariable>
              <ShapeType>HorizontalLine</ShapeType>
              <LineWidth>20</LineWidth>
              <LineAlignment>LeftOrTop</LineAlignment>
              <FillColor Alpha="0" Red="0" Green="0" Blue="0"/>
            </ShapeObject>
            <ObjectMargin Left="0" Right="0" Top="0" Bottom="0"/>
            <Length>530.5469</Length>
            <LengthMode>Fixed</LengthMode>
            <BorderWidth>0</BorderWidth>
            <BorderStyle>Solid</BorderStyle>
            <BorderColor Alpha="255" Red="0" Green="0" Blue="0"/>
          </Cell>
          <Cell>
            <TextObject>
              <Name>TEXT_3</Name>
              <ForeColor Alpha="255" Red="127" Green="127" Blue="127"/>
              <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
              <LinkedObjectName></LinkedObjectName>
              <Rotation>Rotation0</Rotation>
              <IsMirrored>False</IsMirrored>
              <IsVariable>False</IsVariable>
              <HorizontalAlignment>Center</HorizontalAlignment>
              <VerticalAlignment>Middle</VerticalAlignment>
              <TextFitMode>ShrinkToFit</TextFitMode>
              <UseFullFontHeight>True</UseFullFontHeight>
              <Verticalized>False</Verticalized>
              <StyledText>
                <Element>
                  <String>THANK YOU AND DRIVE SAFELY!</String>
                  <Attributes>
                    <Font Family="Calibri" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                    <ForeColor Alpha="255" Red="127" Green="127" Blue="127"/>
                  </Attributes>
                </Element>
              </StyledText>
            </TextObject>
            <ObjectMargin Left="0" Right="0" Top="0" Bottom="0"/>
            <Length>300</Length>
            <LengthMode>Auto</LengthMode>
            <BorderWidth>0</BorderWidth>
            <BorderStyle>Solid</BorderStyle>
            <BorderColor Alpha="255" Red="0" Green="0" Blue="0"/>
          </Cell>
        </Subcells>
      </RootCell>
    </ContinuousLabel>`;

    const label = window.dymo.label.framework.openLabelXml(labelXml);
    label.setObjectText('TEXT_4', plate.toUpperCase());
    label.setObjectText('TEXT_DATE', `In: ${moment(scannedTime).format('MMM DD, YYYY')} ${moment(ticketTime).format('h:mm A')}`);
    label.setObjectText('TEXT_2', `Paid: $${totalDue}`);
    label.print('DYMO LabelWriter Wireless on DYMOLWW113A9A');
  }

  initCamera() {
    const self = this;
    let opts = {
      continuous: true,
      video: document.getElementById('preview'),
      mirror: false,
      captureImage: false,
      backgroundScan: true,
      refractoryPeriod: 5000,
      scanPeriod: 1
    };
    let scanner = new Instascan.Scanner(opts)
      scanner.addListener('scan', function (content) {
        self.setTimes(content);
        // document.getElementById('content').innerHTML = content;
      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          //0 is front, 1 is rear
          if(cameras[1]) scanner.start(cameras[1]);
          else scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
  }

  setTimes(content) {
    // Format ticket like this for testing
    // 'PLATE NUMBER,Date and time (see line below)'
    // 'PBM 3394,Tue Sep 04 2018 00:10:30 GMT-0400 (Eastern Daylight Time)';
    // let ticketTime = 'PBM 3394,Tue Sep 04 2018 00:10:30 GMT-0400 (Eastern Daylight Time)';
    let ticketTime = content;
    ticketTime = ticketTime.split(',');

    this.setState({
      plate: ticketTime[0],
      ticketTime: new Date(ticketTime[1]),
      scannedTime: new Date()
    }, () => {
      const { ticketTime, scannedTime } = this.state;
      // console.log(ticketTime);
      // console.log(scannedTime);
      this.calculateTime(ticketTime, scannedTime);
    });
  }

  calculateTime(dt1, dt2) {
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    this.setState({ hoursParked: Math.abs(Math.ceil(diff)) });
  }

  render() {
    const { classes } = this.props;
    const { plate, ticketTime, scannedTime, hoursParked } = this.state;
    const ticketCreationDate = new Date(ticketTime).getDate();
    const ticketScannedDate = new Date(scannedTime).getDate();
    let totalDays = 0;
    let remaindingHours = 0;
    let newDayFee = 0;
    let totalDue = 0;


    if (hoursParked < 6) {
      totalDue = hoursParked * 6;
    } else if (hoursParked === 6) {
      totalDue = 35;
    } else if (hoursParked > 6 && ticketCreationDate < ticketScannedDate) {
      const timeSpentToday = moment().startOf('day').fromNow();
      if (timeSpentToday.indexOf('minutes') > -1) {
        totalDue = 6;
      } else {
        totalDays = ticketScannedDate - ticketCreationDate;
        remaindingHours = (moment().startOf('day').fromNow()).replace('hour ago', '').replace('hours ago', '').replace('minutes ago', '');
        remaindingHours = remaindingHours - 7;
        totalDue = remaindingHours * 6 > 35 ? 35 + (totalDays * 35) : remaindingHours * 6 + (totalDays * 35);
      }
    } else if (hoursParked > 6 && ticketCreationDate === ticketScannedDate) {
      totalDue = hoursParked * 6 > 35 ? 35 : hoursParked * 6;
    }

    return (
      <React.Fragment>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Welcome to the St Philip and St James Carpark System
            </Typography>
          </Toolbar>
        </AppBar>

        <main>
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography variant="display2" align="center" color="textSecondary" gutterBottom>
                Scan Ticket
              </Typography>
              <div className="Scan">
                <Grid container spacing={16} justify="center">
                  <video id="preview"></video>
                </Grid>
                <Grid container spacing={16} justify="center">
                  <Paper className={classes.root}>
                    {hoursParked ?
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <CustomTableCell padding="dense">License</CustomTableCell>
                            <CustomTableCell padding="dense">Date</CustomTableCell>
                            <CustomTableCell padding="dense" numeric>Time In</CustomTableCell>
                            <CustomTableCell padding="dense" numeric>Time Out</CustomTableCell>
                            <CustomTableCell padding="dense" numeric>Total Hours</CustomTableCell>
                            <CustomTableCell padding="dense" numeric>Amount Due</CustomTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow className={classes.row}>
                            <CustomTableCell padding="dense" component="th" scope="row">
                              {plate}
                            </CustomTableCell>
                            <CustomTableCell padding="dense" component="th" scope="row">
                              {scannedTime ? <div>{moment(scannedTime).format('MMM Do YYYY')}</div> : null}
                            </CustomTableCell>
                            <CustomTableCell padding="dense" numeric>
                              {ticketTime ? <div>{moment(ticketTime).format('h:mm a')}</div> : null}
                            </CustomTableCell>
                            <CustomTableCell padding="dense" numeric>
                              {scannedTime ? <div>{moment(scannedTime).format('h:mm a')}</div> : null}
                            </CustomTableCell>
                            <CustomTableCell padding="dense" numeric>
                              {hoursParked}
                            </CustomTableCell>
                            <CustomTableCell padding="dense" numeric>
                              <b>{`$${totalDue}`}</b>
                            </CustomTableCell>
                          </TableRow>
                          <TableRow className={classes.row}>
                            <CustomTableCell colSpan={5} component="th" scope="row">
                              Rate: $6/hr<br />
                              Total hours: {hoursParked}<br />
                              {totalDays >= 1 ?
                                <div>
                                  Days: {`${totalDays}days ${remaindingHours}hours`}<br />
                                  Calculation: {`(${totalDays} days x $35) + (${remaindingHours} hours x $6) to a maximum of $35 per day`}<br />
                                </div>
                              :
                                <div>
                                  Calculation: {`(${hoursParked} hours x $6) to a maximum of $35 per day`}<br />
                                </div>
                              }
                              <b>TOTAL DUE: {`$${totalDue}`}</b>
                            </CustomTableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    : null}
                  </Paper>
                </Grid>
                <br />
                {hoursParked ?
                  <Grid container spacing={16} justify="center">
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handlePrintReceipt}
                      >
                        Print Receipt
                      </Button>
                    </Grid>
                  </Grid>
                : null}
                <br />
                <br />
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      href="/create"
                    >
                      Create Paper Ticket
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button href="/" variant="outlined" color="secondary">
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

Scan.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Scan);
