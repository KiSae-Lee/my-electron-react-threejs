import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Viewport from './Viewport';
import { Provider } from 'react-redux';
import { store } from '../app/store';

const meta = {
    title: 'components/Viewport',
    component: Viewport,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [(story) => <Provider store={store}>{story()}</Provider>],
} satisfies Meta<typeof Viewport>;

// (Story) => <Provider store={store}>{Story()}</Provider>

export default meta;
type Story = StoryObj<typeof meta>;

const width = '800px';
const height = '800px';

export const Primary: Story = {
    args: {
        width: width,
        height: height,
        test: true,
    },
};
