import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Viewport from './Viewport';

const meta = {
    title: 'components/Viewport',
    component: Viewport,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Viewport>;

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
    decorators: [(story) => <div style={{ border: '1px solid red', width: width, height: height }}>{story()}</div>],
};
