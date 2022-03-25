import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '../MyButton'

import ReactMarkdown from 'react-markdown'
import md from './Button.md'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/default.css'


export default {
  title: 'atoms/测试自动生成参数表',
  component: Button,
  parameters: {
    docs: {
      page: () => (<div className='markdown-body'>
        <ReactMarkdown children={md} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} />
      </div>)
    },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) =><Button {...args} />

export const Contained = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Contained.args = {
  variant: 'contained',
  children: '自动配置control有效',
};


export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  children: '自动配置control有效',
};

export const Text = Template.bind({});
Text.args = {
  variant: 'text',
  children: '自动配置control有效',
};