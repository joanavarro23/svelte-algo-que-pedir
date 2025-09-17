import type { HTMLInputAttributes } from 'svelte/elements'

export type InputType = 'checkbox' | 'email' | 'file' | 'number' | 'password' | 'text'

export interface PropsInput extends HTMLInputAttributes {
  nombre_label: string,
  type: InputType,
  id: string,
  value?: string
}