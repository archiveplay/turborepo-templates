import { describe, it, expect } from 'vitest'

import App from '../App.vue'
import { mountWithPlugins } from './mount'

describe('App', () => {
  it('mounts renders properly', () => {
    const wrapper = mountWithPlugins(App)
    expect(wrapper.text()).toContain('You did it!')
  })
})
