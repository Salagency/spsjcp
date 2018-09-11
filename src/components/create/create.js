import React, { Component } from 'react';
// import moment from 'moment';
import './create.css';

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

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plate: ''
    };

    this.handleCreateTicket = this.handleCreateTicket.bind(this);
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
                  <String>St Philip and St James Car Park</String>
                  <Attributes>
                    <Font Family="Calibri" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
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
    label.print('DYMO LabelWriter Wireless on DYMOLWW113A9A');
    // setTimeout(() => {
    //   label.print('DYMO LabelWriter 400');
    // }, 2000);
    // window.dymo.print('DYMO LabelWriter 400', labelXml);
  }

  render() {
    return (
      <div className="App">
        {/* <header classNameName="App-header">
          <img src={logo} classNameName="App-logo" alt="logo" />
          <h1 classNameName="App-title">Welcome to React</h1>
        </header> */}
        {/* <p classNameName="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}

        <header className="masthead">
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="page-heading">
                  <a href="/">Home</a>
                </div>
                <div className="page-heading">
                  <h1>Enter Details</h1>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="control-group">
                <div className="form-group floating-label-form-group controls">
                  <label>License Plate</label>
                  <input
                    type="text"
                    className="form-control license-plate"
                    placeholder="License Plate"
                    maxLength="8"
                    id="licensePlate"
                    required
                    data-validation-required-message="Please enter License Plate #."
                    onKeyUp={(e) => {
                      this.setState({ plate: e.target.value })
                    }}
                  />
                  <p className="help-block text-danger" />
                </div>
              </div>
              <div className="control-group">
                <div className="form-group floating-label-form-group controls">
                  <label>Notes</label>
                  <textarea rows="5" className="form-control" placeholder="Notes" id="notes"></textarea>
                  <p className="help-block text-danger"></p>
                </div>
              </div>
              <br />
              <div id="success" />
              <div className="form-group">
                <button
                  className="btn btn-primary"
                  id="create"
                  onClick={this.handleCreateTicket}
                >Create</button>
              </div>
              <div className="form-group">
                <svg id="barcode" />
              </div>
            </div>
          </div>
        </div>

        <hr />
      </div>
    );
  }
}

export default Create;
