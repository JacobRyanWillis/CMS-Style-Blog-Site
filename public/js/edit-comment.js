// Get the Edit button elements
const editCommentBtns = document.querySelectorAll('.edit-comment-btn');

// Add a click event listener to each Edit button
editCommentBtns.forEach(btn => {
  btn.addEventListener('click', async (event) => {
    const commentId = event.target.getAttribute('data-comment_id');
    const commentText = event.target.previousElementSibling.previousElementSibling.innerText.trim();
    // Create a new input field
    const input = document.createElement('input');
    input.type = 'text';
    input.value = commentText;

    // Replace the comment text with the input field
    event.target.previousElementSibling.previousElementSibling.replaceWith(input);

    // Create a new Save button
    const saveBtn = document.createElement('button');
    saveBtn.innerText = 'Save';

    // Replace the Edit button with the Save button
    event.target.replaceWith(saveBtn);

    // Add a click event listener to the Save button
    saveBtn.addEventListener('click', async () => {
      const updatedCommentText = input.value;
      // Send an AJAX request to update the comment
      const response = await fetch(`/api/comment/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify({ comment_text: updatedCommentText }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Reload the page to show the updated comment
        location.reload();
      } else {
        alert('Failed to update comment');
      }
    });
  });
});
