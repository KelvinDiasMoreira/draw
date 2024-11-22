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

document.addEventListener("mousemove", (ev) => {
  for (let i = 0; i < rects.length; i++) {
    for (let j = 0; j < objectMarked.length; j++) {
      if (objectMarked[j].id === rects[i].id) {
        const centerX = rects[i].xPos + rects[i].width / 2;
        const centerY = rects[i].yPos + rects[i].height / 2;

        const centerWidth = rects[i].width * 0.1;
        const centerHeight = rects[i].height * 0.1;

        const centerStartX = centerX - centerWidth / 2;
        const centerEndX = centerX + centerWidth / 2;
        const centerStartY = centerY - centerHeight / 2;
        const centerEndY = centerY + centerHeight / 2;

        const isInCenterX =
          ev.clientX - 5 >= centerStartX && ev.clientX - 5 <= centerEndX;
        const isInCenterY =
          ev.clientY - 5 >= centerStartY && ev.clientY - 5 <= centerEndY;

        const rightEdgeStartX = rects[i].xPos + rects[i].width * 0.9;
        const rightEdgeEndX = rects[i].xPos + rects[i].width;
        const isNearRightEdgeX =
          ev.clientX - 5 >= rightEdgeStartX && ev.clientX - 5 <= rightEdgeEndX;

        const leftEdgeStartX = rects[i].xPos;
        const leftEdgeEndX = rects[i].xPos + rects[i].width * 0.1;
        const isNearLeftEdgeX =
          ev.clientX - 5 >= leftEdgeStartX && ev.clientX - 5 <= leftEdgeEndX;

        const topEdgeStartY = rects[i].yPos;
        const topEdgeEndY = rects[i].yPos + rects[i].height * 0.1;
        const isNearTopEdge =
          ev.clientY - 5 >= topEdgeStartY && ev.clientY - 5 <= topEdgeEndY;

        const bottomEdgeStartY = rects[i].yPos + rects[i].height * 0.9;
        const bottomEdgeEndY = rects[i].yPos + rects[i].height;
        const isNearBottomEdgeY =
          ev.clientY - 5 >= bottomEdgeStartY &&
          ev.clientY - 5 <= bottomEdgeEndY;

        const isInObjectY =
          ev.clientY - 5 >= rects[i].yPos &&
          ev.clientY - 5 <= rects[i].yPos + rects[i].height;

        const isInObjectX =
          ev.clientX - 5 >= rects[i].xPos &&
          ev.clientX - 5 <= rects[i].xPos + rects[i].width;

        if (isNearTopEdge && isInObjectY && isInObjectX) {
          console.log("Mouse está na parte de cima");
          document.addEventListener("mousedown", (eventUpRect) => {
            console.log(eventUpRect);
          });
        }

        if (isNearLeftEdgeX && isInObjectY && isInObjectX) {
          console.log("Mouse está no lado esquerdo");
        }

        if (isInCenterX && isInCenterY && isInObjectX) {
          console.log("Mouse está no meio");
        }

        if (isNearRightEdgeX && isInObjectY && isInObjectX) {
          console.log("Mouse está no lado direito");
        }
        if (isNearBottomEdgeY && isInObjectY && isInObjectX) {
          console.log("Mouse está na parte de baixo");
        }
      }
    }
  }
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
