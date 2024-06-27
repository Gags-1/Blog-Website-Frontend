function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    fetch('https://blog-website-backend-riya.onrender.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        const token = data.access_token;

        // Store the token in localStorage
        localStorage.setItem('token', token);

        // Redirect to admin panel
        window.location.href = 'admin_panel.html';
    })
    .catch(error => {
        alert('Invalid username or password');
    });
}


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
                        <button class="delete-btn" data-id="${post.id}">Delete</button>
                    </div>
                `;

                postsContainer.appendChild(postElement);
            });


            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', deletePost);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});


function deletePost(event) {
    const postId = event.target.getAttribute('data-id');
    if (confirm('Are you sure you want to delete this post?')) {
        fetch(`https://blog-website-backend-riya.onrender.com/admin/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (response.ok) {
                location.reload(); // Reload the page to reflect changes
            } else {
                throw new Error('Delete failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

document.getElementById("create-post-btn").addEventListener('click', function(e){
    window.location.href = 'create_post.html';
})