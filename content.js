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

// Check for changes in the stored phrases
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (let key in changes) {
        if (key === 'filteredPhrases') {
            hidePosts(changes[key].newValue);
        }
    }
});

// Fetch and apply the stored phrases initially
chrome.storage.sync.get('filteredPhrases', function(data) {
    if (data.filteredPhrases) {
        hidePosts(data.filteredPhrases);
    }
});
