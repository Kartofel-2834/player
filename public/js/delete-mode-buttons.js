const DeleteTracksButton = {
  template: `<div class="trashlist_button">Delete</div>`
}

const DeleteModeOffButton = {
 template: '<div class="trashlist_button" id="backFromDeleteMode">Back</div>'
}

const DeleteModeButtons = {
  deleteButton: DeleteTracksButton,
  backButton: DeleteModeOffButton,
}

export default DeleteModeButtons
