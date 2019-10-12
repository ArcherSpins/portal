import React, { Component } from 'react';
import styles from './Main.module.scss';
import Header from '../Header';

class MainApp extends Component {
  render() {
    return (
      <div className={styles.main}>
        <Header />
      </div>
    );
  }
}

export default MainApp;
