import React, { Component } from 'react';
import Instascan from 'instascan';
import moment from 'moment';
import './scan.css';

class Scan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticketTime: '',
      scannedTime: '',
      hoursParked: 0
    };

    this.initCamera = this.initCamera.bind(this);
    this.setTimes = this.setTimes.bind(this);
    this.calculateTime = this.calculateTime.bind(this);
  }

  componentDidMount(props) {
    this.initCamera();
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
        document.getElementById('content').innerHTML = content;
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
    let ticketTime = 'PBM 3394,Tue Sep 04 2018 00:10:30 GMT-0400 (Eastern Daylight Time)';
    ticketTime = ticketTime.split(',');

    this.setState({
      ticketTime: new Date(ticketTime[1]),
      scannedTime: new Date()
    }, () => {
      const { ticketTime, scannedTime } = this.state;
      console.log(ticketTime);
      console.log(scannedTime);
      this.calculateTime(ticketTime, scannedTime);
    });
  }

  calculateTime(dt1, dt2) {
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    this.setState({ hoursParked: Math.abs(Math.ceil(diff)) });
  }

  render() {
    const { ticketTime, scannedTime, hoursParked } = this.state;
    return (
      <div className="Scan">
        <a href="/">Home</a>
        <video id="preview"></video>
        <div id="content"></div>
        {scannedTime ? <div>Date: {moment(scannedTime).format('MMMM Do YYYY')}</div> : null}
        {ticketTime ? <div>Time In: {moment(ticketTime).format('h:mm:ss a')}</div> : null}
        {scannedTime ? <div>Time Out: {moment(scannedTime).format('h:mm:ss a')}</div> : null}
        <div>Hours Parked: {hoursParked}</div>
        {/* Need to handle cars that are parked longer than 24 hours */}
        <div>Total Due: {hoursParked * 6 > 35 ? '$35' : `$${hoursParked * 6}`}</div>
      </div>
    );
  }
}

export default Scan;
