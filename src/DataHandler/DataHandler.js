import React, { Component } from 'react';
import LoadingComponent from './LoadingComponent';
import ErrorComponent from './ErrorComponent';

const DataHandler = Component => class extends Component {
  render() {
    if (this.props.data.error) {
      return (
        <ErrorComponent error={this.props.data.error} />
      );
    }

    if (this.props.data.loading) {
      return (
        <LoadingComponent />
      );
    }

    return (
      <Component {...this.props} />
    );
  }
};

DataHandler.propTypes = {};

DataHandler.defaultProps = {};

export default DataHandler;
