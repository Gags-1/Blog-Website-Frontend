document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts');

    fetch('https://blog-website-backend-riya.onrender.com/posts')
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');

                const publishedDate = new Date(post.created_at).toLocaleString();


                postElement.innerHTML = `
                    <div class="post-content">
                        <h2 class="post-title">${post.title}</h2>
                        <div class="post-date">${publishedDate}</div>
                        <p class="post-content">${post.content}</p>
                    </div>
                `;

                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.getElementById("admin-login-btn").addEventListener('click', function(e){
    window.location.href = 'admin_panel.html';
})