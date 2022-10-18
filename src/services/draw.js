export const drawCircle = (context, xOrigin, xEnd, yOrigin, yEnd) => {
  context.arc(
    xOrigin,
    yOrigin,
    getLength(xOrigin, yOrigin, xEnd, yEnd),
    0,
    2 * Math.PI,
    true
  );
  context.fill();
  context.stroke();
};

export const drawSquare = (context, xOrigin, xEnd, yOrigin, yEnd, angle) => {
  context.translate(getTranslateX(xOrigin, xEnd), getTranslateY(yOrigin, yEnd));
  context.rotate((angle * Math.PI) / 180);
  context.translate(
    -getTranslateX(xOrigin, xEnd),
    -getTranslateY(yOrigin, yEnd)
  );
  context.rect(
    xOrigin,
    yOrigin,
    getLength(xOrigin, yOrigin, xEnd, yEnd),
    getLength(xOrigin, yOrigin, xEnd, yEnd)
  );
  context.fill();
  context.stroke();
};

export const drawLine = (context, xOrigin, xEnd, yOrigin, yEnd) => {
  context.moveTo(xOrigin, yOrigin);
  context.lineTo(xEnd, yEnd);
  context.stroke();
};

const getTranslateX = (xOrigin, xEnd) => {
  return xOrigin + xEnd / 2;
};
const getTranslateY = (yOrigin, yEnd) => {
  return yOrigin + yEnd / 2;
};
const getLength = (xOrigin, yOrigin, xEnd, yEnd) => {
  const d =
    Math.pow(Math.abs(xEnd - xOrigin), 2) +
    Math.pow(Math.abs(yEnd - yOrigin), 2);
  return Math.round(Math.sqrt(d));
};
