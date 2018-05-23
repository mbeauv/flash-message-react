// @flow

import React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import FontAwesome from 'react-fontawesome';

type FlashMessageProps = {
  level: string,
  message: string,
  onDismiss: void => void,
};

const flashLevel = props => props.theme.flash[props.level];

const backgroundColor = props =>
  flashLevel(props).backgroundColor || lighten(0.4, flashLevel(props).mainColor);

const borderColor = props => flashLevel(props).borderColor || flashLevel(props).mainColor;

const textColor = props => flashLevel(props).textColor || flashLevel(props).mainColor;

const levelIconName = (level : string) : string => {
  switch (level) {
    case 'info': return 'exclamation-circle';
    case 'warning': return 'exclamation-circle';
    case 'error': return 'times-circle';
    default: return 'times-circle';
  }
};

const iconStyle = props => ({ color: textColor(props), textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' });

const FlashIcon = styled(FontAwesome).attrs({
  name: props => levelIconName(props.level),
  style: props => iconStyle(props),
})``;

const DismissIcon = styled(FontAwesome).attrs({
  name: 'times-circle',
  style: { color: 'gray', textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' },
})``;

const FlashContent = styled.p`
  flex: 1;
  padding: 0;
  margin: 0 1em;
  align-self: center;
  font-weight: bold;
  color: ${props => textColor(props)};
`;

const FlashMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  padding: 0.75em 1em;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color:  ${props => borderColor(props)};
  background-color: ${props => backgroundColor(props)};
`;

export const FlashMessagePanel = ({ level, message, onDismiss } : FlashMessageProps) => (
  <FlashMessageContainer level={level} size='2x'>
    <FlashIcon level={level} />
    <FlashContent level={level}>{message}</FlashContent>
    <DismissIcon onClick={() => onDismiss()} />
  </FlashMessageContainer>
);
