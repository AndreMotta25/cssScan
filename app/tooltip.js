const tooltips = document.querySelectorAll("[data-tooltip]");
console.log(tooltips);
tooltips.forEach((tag) => {
  tag.addEventListener("mouseenter", () => {
    let texto = tag.dataset.tooltip;
    const span = document.createElement("span");
    span.classList.add("tooltip");
    span.textContent = texto;
    tag.appendChild(span);
  });
  tag.addEventListener("mouseleave", () => {
    const filho = tag.querySelector(".tooltip");
    filho.remove();
  });
});
