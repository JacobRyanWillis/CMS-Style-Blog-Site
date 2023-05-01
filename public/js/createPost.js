const newPostForm = document.getElementById("new-post-form");

const createNewPost = async (event) => {
    console.log("its working");
    event.preventDefault();
  
    const title = document.querySelector("#post-title").value.trim();
    const content = document.querySelector("#post-content").value.trim();
  
    if (title && content) {
      const response = await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to create post");
      }
    }
  };
  
newPostForm.addEventListener("submit", createNewPost);