<script setup>
import { LANG_NAMES } from '../collections/langs'

// One text box per site language ({ th, en, … }), as in the design's TH/EN
// title fields.
const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  langs: { type: Array, required: true },
  multiline: { type: Boolean, default: false },
  label: { type: String, default: '' },
  invalid: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])

function set(lang, value) {
  emit('update:modelValue', { ...props.modelValue, [lang]: value })
}
</script>

<template>
  <div class="sk-loc">
    <label v-for="l in langs" :key="l" class="sk-loc-row">
      <span class="sk-loc-tag">{{ LANG_NAMES[l] || l }}</span>
      <textarea
        v-if="multiline"
        class="sk-input"
        rows="2"
        :value="modelValue?.[l] ?? ''"
        :aria-label="`${label} (${LANG_NAMES[l] || l})`"
        :aria-invalid="invalid && !(modelValue?.[l] ?? '').trim() ? 'true' : undefined"
        @input="set(l, $event.target.value)"
      ></textarea>
      <input
        v-else
        class="sk-input"
        :value="modelValue?.[l] ?? ''"
        :aria-label="`${label} (${LANG_NAMES[l] || l})`"
        :aria-invalid="invalid && !(modelValue?.[l] ?? '').trim() ? 'true' : undefined"
        @input="set(l, $event.target.value)"
      />
    </label>
  </div>
</template>
