const members = document.querySelectorAll(".team-member");
const tooltip = document.querySelector(".member-tooltip");

members.forEach((member) => {
  member.addEventListener("mouseenter", (e) => {
    const name = member.getAttribute("data-name");
    tooltip.textContent = name;
    const rect = member.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.pageXOffset + rect.width / 2}px`;
    tooltip.style.top = `${rect.top + window.pageYOffset - rect.height / 2}px`;
    tooltip.style.opacity = 1;
  });

  member.addEventListener("mouseleave", () => {
    tooltip.style.opacity = 0;
  });
});


