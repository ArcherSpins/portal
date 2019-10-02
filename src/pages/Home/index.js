// @flow
import React, { Component, type AbstractComponent } from 'react';
import { connect } from 'react-redux';
import './Home.module.scss';


// OwnProps refers to the props that were passed down by the parent.
type OwnProps = {||};

// Props created from OwnProps plus the props passed in by mapStateToProps and mapDispatchToProps
type Props = {|
  ...OwnProps
|};


export class Home extends Component<Props> {
  render() {
    return (
      <div className="home">
        Hello World!
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default (connect(mapStateToProps, mapDispatchToProps)(Home): AbstractComponent<OwnProps>);
