import { mount, type MountingOptions } from '@vue/test-utils'
import { VueQueryPlugin } from '@tanstack/vue-query'

import { createTestQueryClient } from './query-client'
import type { Component } from 'vue'

export const mountWithPlugins = (
  component: Component,
  options: MountingOptions<Component> = {},
) => {
  const queryClient = createTestQueryClient()

  return mount(component, {
    ...options,

    global: {
      ...options.global,

      plugins: [[VueQueryPlugin, { queryClient }], ...(options.global?.plugins || [])],
    },
  })
}
