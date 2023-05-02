// Get the Delete button elements
const deleteCommentBtns = document.querySelectorAll('.delete-comment-btn');

// Add a click event listener to each Delete button
deleteCommentBtns.forEach(btn => {
  btn.addEventListener('click', async (event) => {
    const commentId = event.target.getAttribute('data-comment_id');

    // Send an AJAX request to delete the comment
    const response = await fetch(`/api/comment/${commentId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Reload the page to show the updated comments
      location.reload();
    } else {
      alert('Failed to delete comment');
    }
  });
});
