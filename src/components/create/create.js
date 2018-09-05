import React, { Component } from 'react';
import moment from 'moment';
import './create.css';

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
    const d = new Date();
    // const timeStamp = moment(d).format('h:mma');
    const timeStamp = new Date();
    const barcodeData = plate + ',' + timeStamp;
    const labelXml = `<?xml version="1.0" encoding="utf-8"?>
    <DieCutLabel Version="8.0" Units="twips" MediaType="Default">
      <PaperOrientation>Landscape</PaperOrientation>
      <Id>Address</Id>
      <PaperName>30252 Address</PaperName>
      <DrawCommands>
        <RoundRectangle X="0" Y="0" Width="1581" Height="5040" Rx="270" Ry="270"/>
      </DrawCommands>
      <ObjectInfo>
        <BarcodeObject>
          <Name>BARCODE</Name>
          <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
          <BackColor Alpha="255" Red="255" Green="255" Blue="255"/>
          <LinkedObjectName></LinkedObjectName>
          <Rotation>Rotation0</Rotation>
          <IsMirrored>False</IsMirrored>
          <IsVariable>False</IsVariable>
          <Text>PBA 1234, 4:49PM</Text>
          <Type>QRCode</Type>
          <Size>Large</Size>
          <TextPosition>None</TextPosition>
          <TextFont Family="Helvetica" Size="10" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
          <CheckSumFont Family="Helvetica" Size="10" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
          <TextEmbedding>None</TextEmbedding>
          <ECLevel>0</ECLevel>
          <HorizontalAlignment>Center</HorizontalAlignment>
          <QuietZonesPadding Left="0" Right="0" Top="0" Bottom="0"/>
        </BarcodeObject>
        <Bounds X="331.2" Y="103.6937" Width="1547.791" Height="1297.309"/>
      </ObjectInfo>
      <ObjectInfo>
        <DateTimeObject>
          <Name>DATE-TIME</Name>
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
          <Font Family="Helvetica" Size="10" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
          <PreText></PreText>
          <PostText></PostText>
          <IncludeTime>True</IncludeTime>
          <Use24HourFormat>False</Use24HourFormat>
        </DateTimeObject>
        <Bounds X="1871.981" Y="906.55" Width="2851.619" Height="282.6562"/>
      </ObjectInfo>
      <ObjectInfo>
        <TextObject>
          <Name>TEXT</Name>
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
              <String>St Philip &amp; St James Car Park</String>
              <Attributes>
                <Font Family="Helvetica" Size="11" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
              </Attributes>
            </Element>
          </StyledText>
        </TextObject>
        <Bounds X="1879.403" Y="152.9906" Width="2995.681" Height="645.8594"/>
      </ObjectInfo>
      <ObjectInfo>
        <TextObject>
          <Name>TEXT_1</Name>
          <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
          <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
          <LinkedObjectName></LinkedObjectName>
          <Rotation>Rotation0</Rotation>
          <IsMirrored>False</IsMirrored>
          <IsVariable>False</IsVariable>
          <HorizontalAlignment>Left</HorizontalAlignment>
          <VerticalAlignment>Middle</VerticalAlignment>
          <TextFitMode>ShrinkToFit</TextFitMode>
          <UseFullFontHeight>True</UseFullFontHeight>
          <Verticalized>False</Verticalized>
          <StyledText>
            <Element>
              <String>PBA 1234</String>
              <Attributes>
                <Font Family="Helvetica" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
              </Attributes>
            </Element>
          </StyledText>
        </TextObject>
        <Bounds X="1881.278" Y="533.928" Width="1381.641" Height="493.9844"/>
      </ObjectInfo>
    </DieCutLabel>`;

    console.log(barcodeData);
    const label = window.dymo.label.framework.openLabelXml(labelXml);
    label.setObjectText('BARCODE', barcodeData.toUpperCase());
    label.setObjectText('TEXT_1', plate.toUpperCase());
    label.print('DYMO LabelWriter 400');
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
