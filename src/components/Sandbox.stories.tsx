import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Provider } from 'react-redux';
import { store } from '../app/store';
import Sandbox from './Sandbox';

const meta = {
    title: 'components/Sandbox',
    component: Sandbox,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [(story) => <Provider store={store}>{story()}</Provider>],
} satisfies Meta<typeof Sandbox>;

// (Story) => <Provider store={store}>{Story()}</Provider>

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
