import type { Meta, StoryObj } from '@storybook/react'
import { Scrollbar } from '../src/components/ui/scrollbar'

const meta: Meta<typeof Scrollbar> = {
  title: 'UI/Scrollbar',
  component: Scrollbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    showArrows: {
      control: { type: 'boolean' },
    },
    autoHide: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    direction: 'horizontal',
    showArrows: false,
    autoHide: false,
  },
  render: (args) => (
    <div style={{ width: '400px', height: '100px', border: '1px solid #ccc' }}>
      <Scrollbar {...args}>
        <div style={{ display: 'flex', width: '800px', gap: '10px' }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              style={{
                minWidth: '100px',
                height: '80px',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
              }}
            >
              Item {i + 1}
            </div>
          ))}
        </div>
      </Scrollbar>
    </div>
  ),
}

export const WithArrows: Story = {
  args: {
    direction: 'horizontal',
    showArrows: true,
    autoHide: false,
  },
  render: (args) => (
    <div style={{ width: '400px', height: '100px', border: '1px solid #ccc' }}>
      <Scrollbar {...args}>
        <div style={{ display: 'flex', width: '800px', gap: '10px' }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              style={{
                minWidth: '100px',
                height: '80px',
                backgroundColor: '#e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
              }}
            >
              Item {i + 1}
            </div>
          ))}
        </div>
      </Scrollbar>
    </div>
  ),
}

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    showArrows: false,
    autoHide: true,
  },
  render: (args) => (
    <div style={{ width: '200px', height: '300px', border: '1px solid #ccc' }}>
      <Scrollbar {...args}>
        <div style={{ height: '600px' }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              style={{
                height: '50px',
                backgroundColor: i % 2 === 0 ? '#f0f0f0' : '#e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '5px',
                borderRadius: '4px',
              }}
            >
              Item {i + 1}
            </div>
          ))}
        </div>
      </Scrollbar>
    </div>
  ),
}
