import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { cloneDeep } from 'lodash';
import notes from './documentation';
import { ConfigurableItems, ConfigurableItemRow } from '.';
import getDocGenInfo from '../../utils/helpers/docgen-info';

const ConfigurableItemsWrapper = () => (<ConfigurableItems />);
ConfigurableItemsWrapper.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /configurable-items\.component/
);

ConfigurableItemRow.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /configurable-item-row\.component/
);

const defaultConfigurableItemsData = [
  {
    enabled: true,
    locked: true,
    name: 'test 1',
    key: '1'
  },
  {
    enabled: true,
    locked: false,
    name: 'test 2',
    key: '2'
  },
  {
    enabled: false,
    locked: false,
    name: 'test 3',
    key: '3'
  }
];
const store = new Store(
  {
    configurableItemsData: cloneDeep(defaultConfigurableItemsData)
  }
);
const handleDrag = (draggedIndex, hoveredIndex) => {
  const configurableItemsData = store.get('configurableItemsData');
  const draggedItem = configurableItemsData[draggedIndex];

  configurableItemsData[draggedIndex] = configurableItemsData[hoveredIndex];
  configurableItemsData[hoveredIndex] = draggedItem;

  store.set('configurableItemsData', configurableItemsData);
  action('dragged')();
};
const handleChange = (rowIndex) => {
  const configurableItemsData = store.get('configurableItemsData');
  configurableItemsData[rowIndex].enabled = !configurableItemsData[rowIndex].enabled;
  store.set({ configurableItemsData });
  action('changed')();
};
const handleSave = (event) => {
  event.persist();

  action('saved')();
};
const handleReset = () => {
  store.set({ configurableItemsData: cloneDeep(defaultConfigurableItemsData) });
  action('reset')();
};
const rows = data => data.map((column, rowIndex) => {
  return (
    <ConfigurableItemRow
      enabled={ column.enabled }
      key={ column.key }
      locked={ column.locked }
      name={ column.name }
      rowIndex={ rowIndex }
      onChange={ () => handleChange(rowIndex) }
    />
  );
});

storiesOf('Configurable Items', module)
  .add('default', () => {
    return (
      <ConfigurableItemsWrapper
        onDrag={ handleDrag }
        onCancel={ action('canceled') }
        onReset={ handleReset }
        onSave={ handleSave }
      >
        <State store={ store }>
          {state => [
            rows(state.configurableItemsData)
          ]}
        </State>
      </ConfigurableItemsWrapper>
    );
  },
  {
    notes: { markdown: notes },
    info: {
      propTablesExclude: [State]
    }
  });
