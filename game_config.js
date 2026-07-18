/* ================================================================
   GAME CONFIG — the "Play a game" runner at the bottom of the page.

   Everything about the mini-game you might want to tweak lives here.
   (The button's text lives with the rest of the page content, in
   config.js → `gameButton`; set that to "" to remove the game.)

   Every setting below is optional — delete a line (or this whole
   file) and the game falls back to its built-in defaults.
   ================================================================ */

window.GAME_CONFIG = {

  /* --- The runner ------------------------------------------------
     emoji : any emoji works — try "🦖", "🐢", "👶", "🍼"…
     image : a picture INSTEAD of the emoji, e.g. "images/runner.png"
             (png/jpg/webp/gif/svg; transparent background looks best).
             Leave "" to use the emoji.
     size  : height in pixels (the game canvas is 180px tall).
     flip  : true mirrors the art so it faces right — most emoji face
             left. Set to false if your image already faces right.  */
  player: {
    emoji: "",
    image: "images/ant.png",
    size: 80,
    flip: false,
  },

  /* --- The obstacles ---------------------------------------------
     A list to jump over — each entry is either an emoji or an image
     path (same formats as player.image). One is picked at random for
     every obstacle; sizes vary a little automatically.              */
  obstacles: ["🍼", "🧸", "🎁", "🧦"],

  /* --- The speed ---------------------------------------------------
     start : how fast obstacles approach at first (pixels per frame).
     max   : the speed the game ramps up to and then holds.
     ramp  : how much speed is added every frame — bigger = the game
             gets hard sooner. (4.5 / 9 / 0.0015 feel like the
             classic dino game.)                                     */
  speed: {
    start: 5,
    max: 12,
    ramp: 0.015,
  },

  /* --- The jump ---------------------------------------------------
     Take-off power — higher = jumps higher and hangs longer.        */
  jump: 8.5,

  /* --- The background ----------------------------------------------
     Fill color behind the game — any CSS color works ("#fdf6ec",
     "rgb(29,43,42)", "peachpuff", …). Leave "" for transparent (the
     page shows through).                                            */
  background: "white",
};
