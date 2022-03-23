import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import Button from '../Button'

import ReactMarkdown from 'react-markdown'
import md from './Button.md'

export default {
  title: 'atoms/Button',
  component: Button,
  parameters: {
    docs: {
      page: () => (
        <>
        <ReactMarkdown children={md} />
          {/* <Title />
          <Subtitle /> */}
          {/* <ReadMe /> */}
          {/* <ArgsTable story={PRIMARY_STORY} /> */}
          {/* <Stories /> */}
       </>
      )
    }
  }
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Contained = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Contained.args = {
  variant: 'contained',
  children: 'Button',
};


export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  children: 'Button',
};

export const Text = Template.bind({});
Text.args = {
  variant: 'text',
  children: 'Button',
};