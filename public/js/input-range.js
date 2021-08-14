const InputTypeRange = {
  props: {
    min: { type: Number, default: 0 },
    progress: { type: Number, default: 0 },
    value: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    input: { type: Function, default: null },
    change: { type: Function, default: null },
    mousedown: { type: Function, default: null },
    mouseup: { type: Function, default: null },
    classes: { type: Array, default: [] },
  },

  computed: {
    cssClasses(){
      return ['grid_layout_inner', 'range_input_inner'].concat( this.classes )
    }
  },

  template: `
    <div :class="cssClasses">
      <div :style="{ width: progress + '%' }" class="range_progress_fiction grid_layout_element"></div>
      <input type="range"
        @input="input"
        @mouseup="mouseup"
        @mousedown="mousedown"
        @change="change"
        class="grid_layout_element"
        :min="min"
        :value="value"
        :max="max"
      >
    </div>
  `
}

export default InputTypeRange
