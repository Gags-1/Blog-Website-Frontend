document.getElementById('create-post-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    fetch('https://blog-website-backend-riya.onrender.com/admin/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title: title, content: body })
    })
    .then(response => {
        if (response.ok) {
            window.location.href = 'admin_panel.html'; // Redirect to the admin panel after successful creation
        } else {
            throw new Error('Post creation failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
