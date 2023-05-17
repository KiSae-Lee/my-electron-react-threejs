import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { Meta, StoryObj } from '@storybook/react';
import Counter from './Counter';

const meta = {
    title: 'components/example/Counter',
    component: Counter,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { title: 'myCounter' } };
