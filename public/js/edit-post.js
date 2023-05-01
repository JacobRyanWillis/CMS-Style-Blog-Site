const editPostForm = document.querySelector("#edit-post-form");
const deletePostButton = document.querySelector("#delete-post-button");

const editPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#edit-post-title").value.trim();
  const content = document.querySelector("#edit-post-content").value.trim();
  const postId = editPostForm.dataset.postid;

  if (title && content) {
    const response = await fetch(`/api/post/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update post");
    }
  }
};

const deletePost = async () => {
  const postId = editPostForm.dataset.postid;

  const response = await fetch(`/api/post/${postId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete post");
  }
};

editPostForm.addEventListener("submit", editPost);
deletePostButton.addEventListener("click", deletePost);
