const DeleteTracksButton = {
  props: {
    click: Function,
    count: { type: Number, default: 0 }
  },
  template: `<div @click="click" class="trashlist_button">Delete ({{ count }})</div>`
}

const DeleteModeOffButton = {
  props: { click: Function },
  template: '<div @click="click" class="trashlist_button" id="backFromDeleteMode">Back</div>'
}

const DeleteModeButtons = {
  deleteButton: DeleteTracksButton,
  backButton: DeleteModeOffButton,
}

export default DeleteModeButtons
