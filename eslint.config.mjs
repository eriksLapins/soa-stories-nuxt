import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import plugin from '@stylistic/eslint-plugin';
import pluginVue from 'eslint-plugin-vue';

export default createConfigForNuxt({})
  .overrideRules({
    "@typescript-eslint/no-explicit-any": "off",
    "vue/no-v-html": "off"
  }).append(
    ...pluginVue.configs['flat/recommended'],
    ...pluginVue.configs['flat/strongly-recommended'],
    {
      plugins: {
        stylistic: plugin,
        vue: pluginVue,
      },
      rules: {
        'stylistic/indent': ['error', 2],
        'stylistic/block-spacing': 'warn',
        'stylistic/semi': 'warn',
        'vue/multi-word-component-names': 'off',
        'vue/max-attributes-per-line': ['warn', {
          singleline: 1,
          multiline: 1
        }],
        'vue/html-indent': ['warn', 2]
      },
      ignores: [
        'env.d.ts',
      ]
    });