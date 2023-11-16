function hidePosts(forbiddenPhrases) {
    const posts = document.querySelectorAll('.Post');

    posts.forEach(post => {
        const postText = post.innerText.toLowerCase();
        forbiddenPhrases.forEach(phrase => {
            if (postText.includes(phrase.toLowerCase())) {
                post.style.display = 'none'; // Hides the post
            }
        });
    });
}

// Create an observer instance linked to the hidePosts function
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            // Check each new node to see if it's a post
            mutation.addedNodes.forEach(function(newNode) {
                if (newNode.classList && newNode.classList.contains('Post')) {
                    // Fetch the stored phrases and apply them to the new posts
                    chrome.storage.sync.get('filteredPhrases', function(data) {
                        if (data.filteredPhrases) {
                            hidePosts(data.filteredPhrases);
                        }
                    });
                }
            });
        }
    });
});

// Start observing
const config = { childList: true, subtree: true };
const targetNode = document.body; // You might need to adjust this to a more specific container if possible
observer.observe(targetNode, config);

// Fetch and apply the stored phrases initially
chrome.storage.sync.get('filteredPhrases', function(data) {
    if (data.filteredPhrases) {
        hidePosts(data.filteredPhrases);
    }
});
