import React from 'react';
import propTypes from 'prop-types';
import StyledCardSection from './card-section.style';
import {
  TEXT_TYPE_PRIMARY,
  TEXT_TYPE_SECONDARY,
  TEXT_TYPE_TERTIARY
} from '../card.const';

const CardSection = ({
  alignment,
  positionType,
  theme,
  primary,
  secondary,
  tertiary
}) => {
  return (
    <div>
      {
        primary && (
          <StyledCardSection
            alignment={ alignment }
            data-element={ `${positionType}-${TEXT_TYPE_PRIMARY}` }
            positionType={ positionType }
            primary
            theme={ theme }
          >
            { primary }
          </StyledCardSection>
        )
      }
      {
        secondary && (
          <StyledCardSection
            alignment={ alignment }
            data-element={ `${positionType}-${TEXT_TYPE_SECONDARY}` }
            positionType={ positionType }
            secondary
            theme={ theme }
          >
            { primary }
          </StyledCardSection>
        )
      }
      {
        tertiary && (
          <StyledCardSection
            alignment={ alignment }
            data-element={ `${positionType}-${TEXT_TYPE_TERTIARY}` }
            positionType={ positionType }
            tertiary
            theme={ theme }
          >
            { primary }
          </StyledCardSection>
        )
      }
    </div>
  );
};

CardSection.propTypes = {
  alignment: propTypes.string,
  positionType: propTypes.string,
  theme: propTypes.object,
  primary: propTypes.string,
  secondary: propTypes.string,
  tertiary: propTypes.string
};

export default CardSection;