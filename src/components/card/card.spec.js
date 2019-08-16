import React from 'react';
import { mount, shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import Card from './card.component';
import {
  POSITION_FOOTER,
  POSITION_HEADER,
  POSITION_MIDDLE,
  TEXT_TYPE_PRIMARY,
  TEXT_TYPE_SECONDARY,
  TEXT_TYPE_TERTIARY
} from './card.const';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import smallTheme from '../../style/themes/small';
import mediumTheme from '../../style/themes/medium';
import largeTheme from '../../style/themes/large';
import 'jest-styled-components';

const defaultThemes = [
  ['small', smallTheme],
  // ['medium', mediumTheme],
  // ['large', largeTheme]
];

describe('Card', () => {
  describe('default themes', () => {
    describe.each(defaultThemes)('when the Card is rendered', (name, theme) => {
      describe(`${name} theme`, () => {
        describe('when width is not passed as a prop', () => {
          const wrapper = shallow(
            <Card
              theme={ theme }
            />
          );
          const elem = wrapper.find('[data-element="card"]');
          it('width fills containing element', () => {
            expect(elem).not.toHaveStyleRule('width');
          });
        });

        describe('when width is passed as a percentage value', () => {
          const widthPct = '50%';
          const wrapper = TestRenderer.create(
            <Card
              cardWidth={ widthPct }
              theme={ theme }
            />
          ).toJSON();

          it(`Card has style rule of width: ${widthPct}`, () => {
            assertStyleMatch({
              width: widthPct
            }, wrapper);
          });
        });

        describe('when width is passed as a pixel value', () => {
          const widthPx = '500px';
          const wrapper = TestRenderer.create(
            <Card
              cardWidth={ widthPx }
              theme={ theme }
            />
          ).toJSON();

          it(`Card has style rule of width: ${widthPx}`, () => {
            assertStyleMatch({
              width: widthPx
            }, wrapper);
          });
        });

        describe('when a header is not passed as a prop', () => {
          const wrapper = mount(
            <Card
              theme={ theme }
            />
          );

          it('does not renders a header', () => {
            const elem = wrapper.find(`.${POSITION_HEADER}`);
            expect(elem.exists()).toEqual(false);
          });
        });

        describe('when a header is passed as a prop', () => {
          const headerProps = ['header is passed as a prop', 'this is a subtitle', '/path/to/icon.svg'];
          const wrapper = mount(
            <Card
              header={ headerProps }
              theme={ theme }
            />
          );
          const elem = wrapper.find(`.${POSITION_HEADER}`);

          it('renders a header', () => {
            expect(elem.exists()).toEqual(true);
          });
        });

        describe('when a description is not passed as a prop', () => {
          const wrapper = mount(
            <Card
              theme={ theme }
            />
          );

          it('does not render a description', () => {
            const elem = wrapper.find(`.${POSITION_MIDDLE}`);
            expect(elem.exists()).toEqual(false);
          });
        });

        describe('when description is passed as a prop', () => {
          const descProps = [{
            primary: 'primary description text',
            secondary: 'secondary description text',
            tertiary: 'tertiary description text'
          }];
          const wrapper = mount(
            <Card
              theme={ theme }
              middle={ descProps }
            />
          );
          const elem = wrapper.find(`.${POSITION_MIDDLE}`);

          it('renders a description', () => {
            expect(elem.exists()).toEqual(true);
          });
        });

        describe('when footer is not passed as a prop', () => {
          const wrapper = mount(
            <Card
              theme={ theme }
            />
          );

          it('does not render a footer', () => {
            const elem = wrapper.find(`.${POSITION_FOOTER}`);
            expect(elem.exists()).toEqual(false);
          });
        });

        describe('when footer is passed as a prop', () => {
          const footerText = 'footer is passed as a prop';
          const wrapper = mount(
            <Card
              theme={ theme }
              footer={ footerText }
            />
          );
          const elem = wrapper.find(`.${POSITION_FOOTER}`);

          it('renders a footer', () => {
            expect(elem.exists()).toEqual(true);
          });
        });
      });
    });
  });

  // IAN move these into each section test above
  xdescribe('default themes', () => {
    describe.each(defaultThemes)('when the Card is rendered', (name, theme) => {
      describe(`${name} theme`, () => {
        describe('when border is disabled and there is no footer', () => {
          it(`matches the expected styles for a default ${name} Card`, () => {
            const testElem = TestRenderer.create(
              <Card
                border={ false }
                description='border is disabled and there is no footer'
                theme={ theme }
              />
            ).toJSON();
            assertStyleMatch({
              backgroundColor: theme.colors.white,
              boxShadow: theme.shadows.cards,
              marginBottom: '32px',
              position: 'relative',
              transition: 'all 0.3s ease-in-out',
              border: 'none'
            }, testElem);
          });
        });

        describe('when border is enabled and there is no footer', () => {
          it(`matches the expected styles for a default ${name} Card`, () => {
            const testElem = TestRenderer.create(
              <Card
                border
                description='border is enabled and there is no footer'
                theme={ theme }
              />
            ).toJSON();
            assertStyleMatch({
              backgroundColor: theme.colors.white,
              boxShadow: '0 3px 3px 0 rgba(0,20,29,0.2),0 2px 4px 0 rgba(0,20,29,0.15)',
              marginBottom: '32px',
              position: 'relative',
              transition: 'all 0.3s ease-in-out',
              border: `1px solid ${theme.colors.border}`
            }, testElem);
          });
        });
      });
    });
  });
});
