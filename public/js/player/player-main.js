import PlayerInners from '/file?path=js/player/player-inners.js'

const Player = {
  props: {
    track: { type: Object, default: null },
    playbuttonclick: { type: Function, default: null },
    previousbuttonclick: { type: Function, default: null },
    nextbuttonclick: { type: Function, default: null },
    timelinecontrol_on: { type: Function, default: null },
    timelinecontrol_off: { type: Function, default: null },
    changecurrenttime: { type: Function, default: null },
    repeatbuttonclick: { type: Function, default: null },
    randombuttonclick: { type: Function, default: null },
    volumerangeinput: { type: Function, default: null },
    mutebuttonclick: { type: Function, default: null },
  },

  components: {
    "player-track-info": PlayerInners.trackInfo,
    "player-main-button-inner": PlayerInners.mainButtonInner,
    "player-secondary-button-inner": PlayerInners.secondaryButtonInner,
  },

  template: `
    <div class="player space_between align">
      <player-track-info :track="track"></player-track-info>

      <player-main-button-inner
        :track="track"
        :previousbuttonclick="previousbuttonclick"
        :playbuttonclick="playbuttonclick"
        :nextbuttonclick="nextbuttonclick"
        :timelinecontrol_on="timelinecontrol_on"
        :timelinecontrol_off="timelinecontrol_off"
        :changecurrenttime="changecurrenttime"
      ></player-main-button-inner>

      <player-secondary-button-inner
        :track="track"
        :repeatbuttonclick="repeatbuttonclick"
        :randombuttonclick="randombuttonclick"
        :volumerangeinput="volumerangeinput"
        :mutebuttonclick="mutebuttonclick"
      ></player-secondary-button-inner>
    </div>
  `
}

export default Player
