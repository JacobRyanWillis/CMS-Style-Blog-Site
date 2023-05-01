const addCommentForm = document.querySelector("#add-comment-form");

const addComment = async (event) => {
    event.preventDefault();
  
    const comment_text = document.querySelector("#comment-content").value.trim();
    const post_id = addCommentForm.dataset.post_id;
  
    if (comment_text) {
      const response = await fetch(`/api/comment/`, {
        method: "POST",
        body: JSON.stringify({ comment_text, post_id }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert("Failed to add comment");
      }
    }
  };
  
addCommentForm.addEventListener("submit", addComment);
