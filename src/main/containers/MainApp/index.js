import React, { Component } from 'react';
import { Navbar } from 'ui-kit';

class MainApp extends Component {
  render() {
    return (
      <>
        <header><Navbar /></header>
        <aside>Sidebar</aside>
      </>
    );
  }
}

export default MainApp;
