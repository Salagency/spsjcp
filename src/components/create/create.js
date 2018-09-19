import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MaskedInput from 'react-maskedinput'
// import nodemailer from 'nodemailer';
import { withStyles } from '@material-ui/core/styles';

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
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
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
  }
});

// Spend
// Printer 120.95
// 2 Rolls of paper $5.95 X 2
// Tablet $169.59
// Case - pending
// Stand - pending

// notes
// Add text in small print which says "Keep this ticket on your person. Do not leave in your vehicle at any time"
// Need to hand scenarios:
// ticket is damaged
// ticket is lost
// car stays longer than one day
// Write to local storage if no power
// Either send email or save to data base

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plate: '',
      note: '',
      timeStamp: '',
      db: null
    };

    this.handleCreateTicket = this.handleCreateTicket.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveData = this.handleSaveData.bind(this);
    this.addItem = this.addItem.bind(this);
    this.textMaskCustom = this.textMaskCustom.bind(this);
    this.handleSendEmail = this.handleSendEmail.bind(this);
    this.sendFeedback = this.sendFeedback.bind(this);
  }

  handleCreateTicket() {
    const { plate } = this.state;
    // const d = new Date();
    // const timeStamp = moment(d).format('h:mma');
    const timeStamp = new Date();
    const barcodeData = plate + ',' + timeStamp;
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
                  <String>St Philip and St James Car Park
    </String>
                  <Attributes>
                    <Font Family="Calibri" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                  </Attributes>
                </Element>
                <Element>
                  <String>OPENING HOURS
    </String>
                  <Attributes>
                    <Font Family="Calibri" Size="10" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                  </Attributes>
                </Element>
                <Element>
                  <String>Mon - Fri 7:00am - 4:00pm
    Sat 7:00am - 1:00pm</String>
                  <Attributes>
                    <Font Family="Calibri" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                  </Attributes>
                </Element>
              </StyledText>
            </TextObject>
            <ObjectMargin Left="0" Right="0" Top="0" Bottom="0"/>
            <Length>521.6</Length>
            <LengthMode>Auto</LengthMode>
            <BorderWidth>0</BorderWidth>
            <BorderStyle>Solid</BorderStyle>
            <BorderColor Alpha="255" Red="0" Green="0" Blue="0"/>
          </Cell>
          <Cell>
            <BarcodeObject>
              <Name>BARCODE</Name>
              <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
              <BackColor Alpha="255" Red="255" Green="255" Blue="255"/>
              <LinkedObjectName></LinkedObjectName>
              <Rotation>Rotation0</Rotation>
              <IsMirrored>False</IsMirrored>
              <IsVariable>False</IsVariable>
              <Text>PCA 9999</Text>
              <Type>QRCode</Type>
              <Size>Large</Size>
              <TextPosition>None</TextPosition>
              <TextFont Family="Helvetica" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
              <CheckSumFont Family="Helvetica" Size="10" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
              <TextEmbedding>None</TextEmbedding>
              <ECLevel>0</ECLevel>
              <HorizontalAlignment>Center</HorizontalAlignment>
              <QuietZonesPadding Left="0" Right="0" Top="0" Bottom="0"/>
            </BarcodeObject>
            <ObjectMargin Left="0" Right="0" Top="0" Bottom="0"/>
            <Length>1205.972</Length>
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
              <TextFitMode>None</TextFitMode>
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
            <Length>700</Length>
            <LengthMode>Auto</LengthMode>
            <BorderWidth>0</BorderWidth>
            <BorderStyle>Solid</BorderStyle>
            <BorderColor Alpha="255" Red="0" Green="0" Blue="0"/>
          </Cell>
          <Cell>
            <DateTimeObject>
              <Name>DATE-TIME</Name>
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
              <DateTimeFormat>DayAbbrMonthYear</DateTimeFormat>
              <Font Family="Calibri" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
              <PreText></PreText>
              <PostText></PostText>
              <IncludeTime>True</IncludeTime>
              <Use24HourFormat>False</Use24HourFormat>
            </DateTimeObject>
            <ObjectMargin Left="0" Right="0" Top="0" Bottom="0"/>
            <Length>817.0312</Length>
            <LengthMode>Fixed</LengthMode>
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
              <HorizontalAlignment>Center</HorizontalAlignment>
              <VerticalAlignment>Middle</VerticalAlignment>
              <TextFitMode>None</TextFitMode>
              <UseFullFontHeight>True</UseFullFontHeight>
              <Verticalized>False</Verticalized>
              <StyledText>
                <Element>
                  <String>Keep this ticket on your person.
    Do not leave in your vehicle at any time.
    Not Transferable.</String>
                  <Attributes>
                    <Font Family="Calibri" Size="7" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                  </Attributes>
                </Element>
              </StyledText>
            </TextObject>
            <ObjectMargin Left="0" Right="0" Top="0" Bottom="0"/>
            <Length>680</Length>
            <LengthMode>Auto</LengthMode>
            <BorderWidth>0</BorderWidth>
            <BorderStyle>Solid</BorderStyle>
            <BorderColor Alpha="255" Red="0" Green="0" Blue="0"/>
          </Cell>
        </Subcells>
      </RootCell>
    </ContinuousLabel>`;

    console.log(barcodeData);
    const label = window.dymo.label.framework.openLabelXml(labelXml);
    label.setObjectText('BARCODE', barcodeData.toUpperCase());
    label.setObjectText('TEXT_1', plate.toUpperCase());
    // label.print('DYMO LabelWriter Wireless on DYMOLWW113A9A');
    // this.handleSendEmail();
    this.setState({ timeStamp }, () =>{
      this.handleSaveData();
    })
  }

  handleSaveData() {
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }

    let db;
    const openRequest = indexedDB.open('CarparkDB', 1);

    openRequest.onupgradeneeded = (e) => {
      const db = e.target.result;
      console.log('running onupgradeneeded');
      if (!db.objectStoreNames.contains('store')) {
        const storeOS = db.createObjectStore('store', {keyPath: 'plate'});
      }
    };
    openRequest.onsuccess = (e) => {
      console.log('running onsuccess');
      db = e.target.result;
      this.setState({ db }, () => {
        this.addItem();
      })
    };
    openRequest.onerror = (e) => {
      console.log('onerror!');
      console.dir(e);
    };
  }

  addItem() {
    const { db, plate, note, timeStamp } = this.state;
    const transaction = db.transaction(['store'], 'readwrite');
    const store = transaction.objectStore('store');
    const item = {
      plate: plate,
      description: note,
      created: timeStamp
    };

   const request = store.add(item);

   request.onerror = (e) => {
      console.log('Error', e.target.error.name);
    };
    request.onsuccess = (e) => {
      console.log('Woot! Did it');
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  textMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
      <MaskedInput
        {...other}
        ref={inputRef}
        mask="AAA 1111"
        name="expiry"
        placeholder="PBA 1234"
        onChange={this._onChange}
      />
    );
  }

  handleSendEmail (event) {
    this.sendFeedback(
      'template_Gfzei7m8',
      'spsjcp@gmail.com',
      'spsjcp@gmail.com',
      'Test email content')

    this.setState({
      formSubmitted: true
    })
  }

  sendFeedback (templateId, senderEmail, receiverEmail, feedback) {
    window.emailjs.send(
      'gmail',
      templateId,
      {
        receiverEmail,
        senderEmail,
        feedback
      })
      .then(res => {
        console.log(res);
        this.setState({ formEmailSent: true })
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error('Failed to send feedback. Error: ', err))
  }

  render() {
    const { classes } = this.props;
    const { plate } = this.state;

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
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography variant="display2" align="center" color="textSecondary" gutterBottom>
                Enter License Plate
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      label="License Plate"
                      className={classes.formControl}
                      id="licensePlate"
                      value={plate}
                      InputProps={{
                        inputComponent: this.textMaskCustom,
                      }}
                      onKeyUp={(e) => {
                        this.setState({ plate: e.target.value })
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={16} justify="center">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="multiline-static"
                      label="Additonal Notes"
                      className={classes.formControl}
                      multiline
                      rows="4"
                      placeholder="e.g. White Mazda 323"
                      margin="normal"
                      onKeyUp={(e) => {
                        this.setState({ note: e.target.value })
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleCreateTicket}
                      disabled={plate.length === 0}
                    >
                      Print
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      href="/scan"
                    >
                      Scan
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

Create.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Create);
