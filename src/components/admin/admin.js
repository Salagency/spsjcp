import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instascan from 'instascan';
import moment from 'moment';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { CSVLink, CSVDownload } from "react-csv";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessGranted: false,
      data: null
    };

    // this.initCamera = this.initCamera.bind(this);
    // this.exportDB = this.exportDB.bind(this);
    this.getAllItems = this.getAllItems.bind(this);
    this.deleteAllData = this.deleteAllData.bind(this);
  }

  componentDidMount(props) {
    // this.initCamera();
  }

  getAllItems(callback) {
    let db;
    const openDBRequest = indexedDB.open('CarparkDB', 1);

    openDBRequest.onsuccess = (e) => {
      db = e.target.result;
      const transaction = db.transaction(['store'], 'readonly');
      // const trans = db.transaction('CarparkDB', IDBTransaction.READ_ONLY);
      const objectStore = transaction.objectStore('store');
      const items = [];

      transaction.oncomplete = (evt) => {
        callback(items);
      };

      const cursorRequest = objectStore.openCursor();

      cursorRequest.onerror = (error) => {
        console.log(error);
      };

      cursorRequest.onsuccess = (evt) => {
        const cursor = evt.target.result;
        if (cursor) {
          items.push(cursor.value);
          cursor.continue();
        }
      }
    };
  }

  deleteAllData() {
    let db;
    const openDBRequest = indexedDB.open('CarparkDB', 1);

    openDBRequest.onsuccess = (e) => {
      db = e.target.result;
      const transaction = db.transaction(['store'], 'readwrite');
      // const trans = db.transaction('CarparkDB', IDBTransaction.READ_ONLY);
      const objectStore = transaction.objectStore('store');
      const objectStoreRequest = objectStore.clear();

      objectStoreRequest.onsuccess = (event) => {
        alert('Database Demolished');
      };
    };
  }

  render() {
    const {
      accessGranted,
      data
    } = this.state;

    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              SPSJCP Admin
            </Typography>
          </Toolbar>
        </AppBar>

        <main>
          <div>
            <Grid container spacing={16} justify="center">
            {!accessGranted ?
              <Grid item xs={12} sm={4}>
                <br />
                <br />
                <Button href="/" variant="contained" size="large" color="primary">
                  Home
                </Button>
                <br />
                <br />
                <TextField
                  required
                  label="Password"
                  id="password"
                  onKeyUp={(e) => {
                    console.log(e.target.value);
                    if (e.target.value === 'BYdv7yEu') {
                      this.setState({ accessGranted: true });
                    }
                  }}
                />
              </Grid>
            :
            <div>
              <br />
              <br />
              <br />
              <Button href="/" variant="contained" size="large" color="primary">
                Home
              </Button>
              &nbsp;
              &nbsp;
              &nbsp;
              <Button variant="contained" size="large" color="secondary" onClick={() => {
                this.getAllItems((items) => {
                  const len = items.length;
                  this.setState({ data: items });
                  // for (var i = 0; i < len; i += 1) {
                  //   console.log(items[i]);
                  // }
                });
              }}>Export</Button>
              <br />
              <br />
              {data ?
                <CSVLink data={data}>Download Report</CSVLink>
              : null}
              <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              <Button variant="contained" size="large" color="secondary" onClick={() => {
                const confirmation = window.confirm('Are you sure you want to delete all the data?');
                if (confirmation) {
                  this.deleteAllData();
                }
                // this.getAllItems((items) => {
                //   const len = items.length;
                //   console.log(len);
                //   this.setState({ data: items });
                //   // for (var i = 0; i < len; i += 1) {
                //   //   console.log(items[i]);
                //   // }
                // });
              }}>Empty Database</Button>
            </div>
          }
            </Grid>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Admin;
