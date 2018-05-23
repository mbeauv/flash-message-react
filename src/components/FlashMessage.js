// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { clearFlash } from 'flash-message-redux';
import type { FlashMessage } from 'flash-message-redux';
import { FlashMessagePanel } from './FlashMessagePanel';

type Props = {
  flashMessage: FlashMessage,
  clearFlash: void => void,
};

const EmptyFlash = styled.div;

class FlashMessageComponentClass extends Component<Props> {
  renderFlash = ({ level, message }) => (
    <FlashMessagePanel level={level} message={message} onDismiss={() => this.props.clearFlash()} />
  );

  render = () => (this.props.flashMessage ?
    this.renderFlash(this.props.flashMessage) : <EmptyFlash />)
}

function mapStateToProps(state) {
  return {
    flashMessage: state.flashMessage.flashMessage,
  };
}

export const FlashMessageComponent =
  connect(mapStateToProps, { clearFlash })(FlashMessageComponentClass);
