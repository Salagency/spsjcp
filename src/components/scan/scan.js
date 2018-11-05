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
import TextField from '@material-ui/core/TextField';
import MaskedInput from 'react-maskedinput'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Keyboard from 'react-simple-keyboard';
import 'simple-keyboard/build/css/index.css';

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
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
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
      searchTerm: '',
      plate: '',
      input: '',
      inputName: 'searchTerm',
      layoutName: 'default',
      ticketTime: '',
      scannedTime: '',
      timeStamp: '',
      hoursParked: 0,
      totalDays: 0,
      remaindingHours: 0,
      totalDue: 0,
      ticketPaid: false,
      searchFeedback: ''
    };

    this.initCamera = this.initCamera.bind(this);
    this.setTimes = this.setTimes.bind(this);
    this.calculateTime = this.calculateTime.bind(this);
    this.handlePrintReceipt = this.handlePrintReceipt.bind(this);
    this.textMaskCustom = this.textMaskCustom.bind(this);
    this.searchPlates = this.searchPlates.bind(this);
    this.updatePaymentRecord = this.updatePaymentRecord.bind(this);
    this.calculateFare = this.calculateFare.bind(this);
    this.onChangeAll = this.onChangeAll.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.handleShiftButton = this.handleShiftButton.bind(this);
    this.setActiveInput = this.setActiveInput.bind(this);
    this.notify = this.notify.bind(this);
  }

  componentDidMount(props) {
    this.initCamera();
  }

  onChangeAll = (input) => {
    this.setState({
      input: input
    }, () => {
      // console.log("Inputs changed", input);
      this.setState({
        searchTerm: this.state.input['searchTerm'] ?  this.state.input['searchTerm'].toUpperCase() : ''
      });
    });
  }

  onKeyPress = (button) => {
    // console.log(this.keyboard);
    // console.log("Button pressed", button);
    if(button === "{lock}" || button === "{shift}")
      this.handleShiftButton();
  }

  handleShiftButton = () => {
    let layoutName = this.state.layoutName;
    let shiftToggle = layoutName === "default" ? "shift" : "default";

    this.setState({
      layoutName: shiftToggle
    });
  }

  setActiveInput = (event) => {
    // console.log("onfocus");
    let inputId = event.target.id;

    this.setState({
      inputName: inputId
    });
  }

  handlePrintReceipt() {
    const { plate, ticketTime, totalDue } = this.state;

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
              <DateTimeFormat>DayAbbrMonthLongYear</DateTimeFormat>
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
    label.setObjectText('TEXT_DATE', `In: ${moment(ticketTime).format('DD-MMM-YYYY')} ${moment(ticketTime).format('h:mm A')}`);
    label.setObjectText('TEXT_2', `Paid: $${totalDue}`);
    // label.print('DYMO LabelWriter Wireless on DYMOLWW113A9A');
    label.print('DYMO LabelWriter 400');
    this.setState({ ticketPaid: false }, () => {

    });
  }

  notify(msg, type) {
    toast[type](msg);
  }

  initCamera() {
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
      scanner.addListener('scan', (ticketTime) => {
        // Format ticket like this for testing
        // 'PLATE NUMBER,Date and time (see line below)'
        // 'PBM 3394,Tue Sep 04 2018 00:10:30 GMT-0400 (Eastern Daylight Time)';
        // let ticketTime = 'PBM 3394,Tue Sep 04 2018 00:10:30 GMT-0400 (Eastern Daylight Time)';
        window.scrollTo(0,document.body.scrollHeight);
        ticketTime = ticketTime.split(',');
        this.setTimes(ticketTime[0], new Date(ticketTime[1]));
      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          //0 is front, 1 is rear
          if(cameras[1]) scanner.start(cameras[1]);
          else scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
          this.notify('No Camera Found', 'error');
        }
      }).catch(function (e) {
        console.error(e);
      });
  }

  setTimes(plate, ticketTime) {
    console.log(ticketTime);
    this.setState({
      timeStamp: new Date(ticketTime),
      plate,
      ticketTime,
      scannedTime: new Date()
    }, () => {
      const { ticketTime, scannedTime } = this.state;
      this.calculateTime(ticketTime, scannedTime);
    });
  }

  calculateTime(dt1, dt2) {
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    this.setState({ hoursParked: Math.abs(Math.ceil(diff)) }, () => {
      this.calculateFare();
    });
  }

  textMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
      <MaskedInput
        {...other}
        ref={inputRef}
        mask="AAA 1111"
        name="expiry"
        placeholder="PBA 1234"
      />
    );
  }

  searchPlates() {
    let db;
    const { searchTerm } = this.state;
    const openDBRequest = indexedDB.open('CarparkDB', 1);
    openDBRequest.onsuccess = (e) => {
      db = e.target.result;
      const transaction = db.transaction(['store'], 'readwrite');
      const objectStore = transaction.objectStore('store');
      const openRequest = objectStore.openCursor();
      openRequest.onsuccess = (e) => {
        const cursor = e.target.result;
        console.log(cursor);
        if (cursor) {
          // console.log(searchTerm);
          // console.log(cursor.value.plate);
          if (cursor.value.plate.indexOf(searchTerm) !== -1) {
            console.log("We found a row with value: " + JSON.stringify(cursor.value));
            if (!cursor.value.paid) {
              this.setState({
                searchResult: cursor.value,
                timeStamp: cursor.value.timeStamp,
                plate: cursor.value.plate }, () => {
                 this.setTimes(cursor.value.plate, new Date(cursor.value.created));
               });
            } else {
              this.setState({
                ticketPaid: true,
                searchFeedback: 'No unpaid results found'
              }, () => {
                this.notify(`No unpaid tickets found!`, 'error');
              });
            }
          }
          cursor.continue();
        }
      }
    }
  }

  calculateFare() {
    const { ticketTime, scannedTime, hoursParked } = this.state;
    const creationDate = new Date(ticketTime);
    const scannednDate = new Date(scannedTime);
    const ticketCreationDate = new Date(ticketTime).getDate();
    const ticketCreationMonth = new Date(ticketTime).getMonth();
    const ticketScannedDate = new Date(scannedTime).getDate();
    const ticketScannedMonth = new Date(scannedTime).getMonth();
    let totalDays = 0;
    let remaindingHours = 0;
    let totalDue = 0;


    if (hoursParked < 6) {
      totalDue = hoursParked * 6;
    } else if (hoursParked === 6) {
      totalDue = 35;
    } else if (hoursParked > 6 && ticketCreationMonth <= ticketScannedMonth) {
      const timeSpentToday = moment().startOf('day').fromNow();
      const diff = new moment.duration(scannednDate - creationDate);
      totalDays = Math.floor(diff.asDays());

      if (timeSpentToday.indexOf('minutes') > -1) {
        totalDue = 6 + (totalDays * 35);
        console.log(totalDue);
      } else {
        remaindingHours = (moment().startOf('day').fromNow()).replace('hour ago', '').replace('hours ago', '').replace('minutes ago', '');
        remaindingHours = remaindingHours - 7;
        totalDue = remaindingHours * 6 > 35 ? 35 + (totalDays * 35) : remaindingHours * 6 + (totalDays * 35);

        console.log(totalDue);
      }
    } else if (hoursParked > 6 && ticketCreationDate === ticketScannedDate) {
      totalDue = hoursParked * 6 > 35 ? 35 : hoursParked * 6;
    }

    // console.log(hoursParked > 6);
    // console.log(ticketCreationMonth);
    // console.log(ticketScannedMonth);
    // console.log(ticketCreationDate);
    // console.log(ticketScannedDate);
    // console.log(ticketCreationDate < ticketScannedDate);
    // console.log(hoursParked);
    // console.log(totalDue);

    let db;
    const { timeStamp } = this.state;
    const openDBRequest = indexedDB.open('CarparkDB', 1);
    openDBRequest.onsuccess = (e) => {
      db = e.target.result;
      const transaction = db.transaction(['store'], 'readwrite');
      const objectStore = transaction.objectStore('store');
      const openRequest = objectStore.openCursor();
      openRequest.onsuccess = (e) => {
        // console.log('asdf');
        const cursor = e.target.result;
        if (cursor) {
          // console.log(timeStamp);
          // console.log(cursor.value.timeStamp);
          // console.log(timeStamp.toString() === cursor.value.timeStamp.toString());
          // console.log(cursor.value.plate);

          if (cursor.value.timeStamp.toString() === timeStamp.toString()) {
            console.log("Found IT: " + JSON.stringify(cursor.value));
            if (cursor.value.paid) {
              this.setState({
                ticketPaid: true,
                searchFeedback: 'No unpaid results found'
              }, () => {
                this.notify(`No unpaid tickets found!`, 'error');
              });
            }
          }
          cursor.continue();
        } else {
          // this.notify(`No results found`, 'error');
        }
      }

      openRequest.onerror = (e) => {
        this.notify(`No results found`, 'error');
        console.dir(e);
      };
    }

    openDBRequest.onerror = (e) => {
      this.notify(`Database Connection Error`, 'error');
      console.dir(e);
    };

    this.setState({
      totalDays,
      remaindingHours,
      totalDue
    });
  }

  updatePaymentRecord() {
    let db;
    const { timeStamp, plate, totalDue, scannedTime } = this.state;
    const openDBRequest = indexedDB.open('CarparkDB', 1);
    openDBRequest.onsuccess = (e) => {
      db = e.target.result;
      const transaction = db.transaction(['store'], 'readwrite');
      const objectStore = transaction.objectStore('store');
      const openRequest = objectStore.openCursor();
      openRequest.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          console.log(timeStamp);
          console.log(cursor.value.timeStamp);

          console.log(timeStamp.toString() === cursor.value.timeStamp.toString());
          // console.log(cursor.value.plate);
          if (cursor.value.timeStamp.toString() === timeStamp.toString()) {
            console.log("Found IT: " + JSON.stringify(cursor.value));
            console.log(cursor.value);

            if (!cursor.value.paid) {
              cursor.value.totalDue = totalDue;
              cursor.value.scannedTime = scannedTime;
              cursor.value.paid = true;
              // Put this updated object back into the database.
              const requestUpdate = objectStore.put(cursor.value);
               requestUpdate.onerror = (e) => {
                 console.log('Error', e.target.error.name);
               };
               requestUpdate.onsuccess = (e) => {
                 console.log('record updated');
                 this.handlePrintReceipt();
               };
            } else {
              this.setState({ ticketPaid: true });
            }
          }
          cursor.continue();
        }
      }
    }
  }

  render() {
    const { classes } = this.props;
    const {
      searchTerm,
      plate,
      ticketTime,
      scannedTime,
      hoursParked,
      totalDays,
      remaindingHours,
      totalDue,
      ticketPaid,
      searchFeedback
    } = this.state;

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
                  <p>OR</p>
                </Grid>
                <Grid container spacing={16} justify="center">
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      label="License Plate"
                      className={classes.formControl}
                      id="searchTerm"
                      value={searchTerm}
                      onFocus={this.setActiveInput}
                      InputProps={{
                        inputComponent: this.textMaskCustom,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <p>
                      <i>**If doing a manual search. Please enter a full license plate number for an accurate result**</i>
                    </p>
                  </Grid>
                </Grid>
                {searchTerm.length > 0 ?
                  <Grid container spacing={16} justify="center">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        this.searchPlates();
                      }}
                    >
                      Search
                    </Button>
                  </Grid>
                : null}
                <Grid container spacing={16} justify="center">
                  <Paper className={classes.root}>
                    {hoursParked && !ticketPaid ?
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <CustomTableCell padding="dense">License</CustomTableCell>
                            <CustomTableCell padding="dense">Time In</CustomTableCell>
                            <CustomTableCell padding="dense">Time Out</CustomTableCell>
                            <CustomTableCell padding="dense" numeric>Total Hours</CustomTableCell>
                            <CustomTableCell padding="dense" numeric>Amount Due</CustomTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow className={classes.row}>
                            <CustomTableCell padding="dense" component="th" scope="row">
                              {plate}
                            </CustomTableCell>
                            <CustomTableCell padding="dense">
                              {ticketTime ? <div>{moment(ticketTime).format('MMM Do YYYY')}</div> : null}
                              <br />
                              {ticketTime ? <div>{moment(ticketTime).format('h:mm a')}</div> : null}
                            </CustomTableCell>
                            <CustomTableCell padding="dense">
                              {scannedTime ? <div>{moment(scannedTime).format('MMM Do YYYY')}</div> : null}
                              <br />
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
                {hoursParked && !ticketPaid ?
                  <Grid container spacing={16} justify="center">
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.updatePaymentRecord}
                      >
                        Print Receipt
                      </Button>
                    </Grid>
                  </Grid>
                : null}
                {ticketPaid ?
                  <Grid container spacing={16} justify="center">
                    <Grid item>
                      <p>{searchFeedback}</p>
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
        <ToastContainer />
        <Keyboard
          ref={r => this.keyboard = r}
          inputName={this.state.inputName}
          onChangeAll={inputs => this.onChangeAll(inputs)}
          layoutName={this.state.layoutName}
        />
      </React.Fragment>
    );
  }
}

Scan.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Scan);
