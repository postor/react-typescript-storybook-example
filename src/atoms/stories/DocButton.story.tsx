import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '../DocButton'

export default {
  title: 'atoms/测试自动生成文档',
  component: Button,
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) =><Button {...args} />

export const Contained = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Contained.args = {
  color:'red',
  children:'button'
};
