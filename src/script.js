import Rectangle from "./rectangle.js";
const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
const scale = window.devicePixelRatio;
canvas.width = canvas.clientWidth * scale;
canvas.height = canvas.clientHeight * scale;
ctx.scale(scale, scale);

const rects = [
  new Rectangle({
    id: 1,
    xPos: 250,
    yPos: 100,
  }),
  new Rectangle({
    id: 2,
    xPos: 100,
    yPos: 100,
  }),
  new Rectangle({
    id: 3,
    xPos: 400,
    yPos: 100,
  }),
];

let objectMarked = [];

document.addEventListener("keydown", (ev) => {
  if (ev.key === "Delete" && objectMarked.length) {
    for (let i = 0; i < objectMarked.length; i++) {
      const index = rects.indexOf(objectMarked[i]);
      if (index !== -1) {
        rects.splice(index, 1);
      }
      objectMarked = [];
    }
  }
  render();
});

document.addEventListener("click", (event) => {
  objectMarked = [];

  for (let i = 0; i < rects.length; i++) {
    const { clicked } = rects[i].verifyIfClickedInRect(
      event.clientX - 5,
      event.clientY - 5
    );
    if (clicked) objectMarked.push(rects[i]);
  }
  render();
});

const render = () => {
  ctx.clearRect(0, 0, canvas.width / scale, canvas.height / scale);

  for (let i = 0; i < rects.length; i++) {
    if (objectMarked.find((rec) => rec.id === rects[i].id)) {
      rects[i].draw(ctx, true);
    }
    rects[i].draw(ctx);
  }

  if (objectMarked.length) {
    for (let i = 0; i < objectMarked.length; i++) {
      objectMarked[i].drawOption(ctx);
    }
  }
};

const loop = () => {
  render();
  requestAnimationFrame(loop);
};

loop();
