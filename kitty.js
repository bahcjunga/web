document.body.addEventListener("mousedown", () => {
  document.body.style.cursor = "grabbing";
});

document.body.addEventListener("mouseup", () => {
  document.body.style.cursor = "default"; // 기본 커서로 복귀
});