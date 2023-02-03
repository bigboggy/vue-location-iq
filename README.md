# VueLocationIQ

VueLocationIQ is a Vue component that enables users to search for locations and adds them to a list of existing places. The component uses the LocationIQ API to provide users with a list of autocomplete suggestions as they type.

## GitHub
[Link to GitHub repository](https://github.com/bigboggy/vue-location-iq)
## Features

- Uses the LocationIQ API to provide autocomplete suggestions.
- Keeps track of existing locations and allows users to add them to a list of selected places.
- Input handling and event handling for resetting, selecting, and error handling.
- Includes an ErrorMessage component for displaying errors.
- Includes a Dropdown component for displaying autocomplete suggestions.
- Includes a SelectedPlaces component for displaying a list of selected places.
- Includes a SearchFieldWrapper component for styling.

## Props

- `modelValue`: The value of the input field. (type: `String`, default: ``, required: `false`)
- `apiKey`: The LocationIQ API key. (type: `String`, required: `true`)
- `existingLocations`: The list of existing locations. (type: `Array` as PropType<Place[]>)
- `placeholder`: The placeholder for the input field. (type: `String`, default: `Search for a location`)
- `searchFieldClass`: The class for the SearchField component. (type: `String`)
- `dropDownClass`: The class for the Dropdown component. (type: `String`)
- `selectedElementsClass`: The class for the SelectedPlaces component. (type: `String`)
- `hideSelectedPlaces`: Hides the selected places list, if not needed. (type: `boolean`)

## Events

- `update:modelValue`: Triggered when the model value has been updated.
- `change`: Triggered when the input value has been changed.

## Usage

First, install the `VueLocationIQ` component.

```bash
npm i vue-location-iq
```
OR
```bash
yarn add vue-location-iq
```
Then, import it into your project.

```js
import { VueLocationIQ } from "vue-location-iq";
```

Finally, add the component to your template.

```html
<VueLocationIQ
  api-key="<YOUR_API_KEY>"
  :existing-locations="existingLocations"
  :placeholder="placeholder"
  search-field-class="search-field__input"
  drop-down-class="search-field__auto-suggest"
  selected-elements-class="selected-elements"
  v-model="<YOUR_REF>"
  @change="handleChange"
/>
```

## Example

```html
<script setup>
import { VueLocationIQ } from "vue-location-iq";
import "vue-location-iq/dist/style.css";
import { ref } from "vue";

const search = ref("");
</script>
<template>
    <VueLocationIQ
        api-key="<YOUR_API_KEY>"
        v-model="search"
    />
</template>
```

## Dev Setup

```bash
yarn install
```
`
copy .env.example to .env and provide the key
`

```bash
yarn dev
```
