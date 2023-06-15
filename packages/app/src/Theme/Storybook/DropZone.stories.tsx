import type { Meta, StoryObj } from "@storybook/react";

import "../../GlobalVariables";

import { DropZone } from "../DropZone";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Stability/DropZone",
  component: DropZone,
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "The text to display above the drop zone"
    },
    onDrop: {
      description: "The function to call when a file is dropped",
      action: "dropped"
    }
  }
} satisfies Meta<typeof DropZone>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    title: "Drop files here",
    onDrop: () => {}
  }
};
