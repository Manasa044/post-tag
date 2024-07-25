// Dictionary to store tags and their associated posts
let tagPostDictionary = {};
// Array to store all posts
let allPosts = [];

// Function to add a new post linked to one or more tags
function addPost() {
    const postId = document.getElementById('post-id').value.trim();
    const tags = document.getElementById('post-tags').value.trim().split(',');

    if (postId === "" || tags.length === 0) {
        alert("Please provide a valid Post ID and at least one Tag.");
        return;
    }

    tags.forEach(tag => {
        tag = tag.trim();
        if (tag) {
            if (!tagPostDictionary[tag]) {
                tagPostDictionary[tag] = [];
            }
            tagPostDictionary[tag].push(postId);
        }
    });

    // Add the post to the allPosts array
    allPosts.push(postId);

    alert("Post added successfully!");
    document.getElementById('post-id').value = '';
    document.getElementById('post-tags').value = '';

    // Update the list of all posts
    updateAllPosts();
}

// Function to retrieve all posts associated with a given tag
function retrievePosts() {
    const tag = document.getElementById('tag').value.trim();
    const resultsDiv = document.getElementById('results');

    if (tag === "") {
        alert("Please provide a valid Tag.");
        return;
    }

    if (tagPostDictionary[tag]) {
        const posts = tagPostDictionary[tag].join('<br>');
        resultsDiv.innerHTML = `<strong>Posts associated with "${tag}":</strong><br> ${posts}`;
    } else {
        resultsDiv.innerHTML = `<strong>No posts associated with "${tag}".</strong>`;
    }
}

// Function to update the list of all posts
function updateAllPosts() {
    const allPostsDiv = document.getElementById('all-posts');

    if (allPosts.length > 0) {
        allPostsDiv.innerHTML = `<strong>All Posts:</strong> <br>${allPosts.join('<br>')}`;
    } else {
        allPostsDiv.innerHTML = `<strong>No posts available.</strong>`;
    }
}

// Function to show the specified section and hide others
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Function to handle showing the "View All Posts" section
function showAllPosts() {
    updateAllPosts();
    showSection('view-all-posts');
}

// Automatically show the "Add Post" section on page load
window.onload = () => showSection('add-post');
