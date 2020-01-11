import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadTunes } from '../actions';

class TuneApp extends Component {
  componentDidMount() {
    this.props.loadTunes();
  }

  render() {
    return (
      <div>
        {this.props.tunes.map(tune => {
          return ' hello' + tune.title;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('state in app', state);
  return {
    tunes: state.tune.items
  };
};

const mapDispatchToProps = {
  loadTunes
};

export default connect(mapStateToProps, mapDispatchToProps)(TuneApp);
