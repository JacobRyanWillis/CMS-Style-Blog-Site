const newPostButton = document.getElementById("new-post-button");

newPostButton.addEventListener("click", () => {
  window.location.href = "/api/dashboard/new-post";
});
