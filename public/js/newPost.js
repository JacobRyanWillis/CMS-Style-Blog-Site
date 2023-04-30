const newPostButton = document.getElementById("new-post-button");
const newPostForm = document.querySelector('#new-post-form');

async function createNewPost(event) {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content) {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
}

newPostButton.addEventListener("click", () => {
  window.location.href = "/api/dashboard/new-post";
});

newPostForm.addEventListener('submit', createNewPost);