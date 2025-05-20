const token = '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';  // Step 1 में बनाया टोकन यहाँ डालें
const owner = 'rdsteam18';            // आपका GitHub यूजरनेम
const repo = 'Anime';                    // आपका रिपोजिटरी नाम
const branch = 'main';                            // आपका ब्रांच नाम (जैसे main या master)
const path = 'movies.json';                       // JSON फाइल का नाम/पाथ

document.getElementById('movieForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // फॉर्म से डाटा लेना
    const formData = new FormData(e.target);
    const newMovie = {
        id: parseInt(formData.get('id')),
        title: formData.get('title'),
        year: parseInt(formData.get('year')),
        rating: parseInt(formData.get('rating')),
        poster: formData.get('poster'),
        detailUrl: formData.get('detailUrl')
    };

    try {
        // Step 3.1: GitHub से वर्तमान movies.json फाइल की कंटेंट और SHA लें
        const getFileResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`, {
            headers: {
                Authorization: `token ${token}`
            }
        });

        if (!getFileResponse.ok) throw new Error('GitHub से फाइल पढ़ने में समस्या हुई');

        const fileData = await getFileResponse.json();
        const content = atob(fileData.content);  // base64 डिकोड करें
        const sha = fileData.sha;

        // Step 3.2: JSON को पार्स करें, नई मूवी जोड़ें, फिर JSON स्ट्रिंग में बदलें
        const movies = JSON.parse(content);
        movies.push(newMovie);
        const updatedContent = JSON.stringify(movies, null, 4);

        // Step 3.3: GitHub API को PUT रिक्वेस्ट भेजें फाइल अपडेट करने के लिए
        const updateResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            method: 'PUT',
            headers: {
                Authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `नई मूवी जोड़ी: ${newMovie.title}`,
                content: btoa(unescape(encodeURIComponent(updatedContent))),
                sha: sha,
                branch: branch
            })
        });

        if (!updateResponse.ok) throw new Error('GitHub पर फाइल अपडेट करने में समस्या हुई');

        alert('movies.json सफलतापूर्वक अपडेट हो गया!');
        e.target.reset();

    } catch (error) {
        alert('त्रुटि: ' + error.message);
        console.error(error);
    }
});

        document.getElementById('movieForm').addEventListener('input', function(e) {
            // Update preview in real-time
            updatePreview();
        });

        function updatePreview() {
            const form = document.getElementById('movieForm');
            const previewSection = document.getElementById('previewSection');
            
            // Get form values
            const id = form.id.value || '12345';
            const title = form.title.value || 'Movie Title';
            const year = form.year.value || '2023';
            const rating = form.rating.value || '85';
            const poster = form.poster.value;
            const detailUrl = form.detailUrl.value || '#';
            
            // Update preview elements
            document.getElementById('previewTitle').textContent = title;
            document.getElementById('previewYear').textContent = year;
            document.getElementById('previewRating').textContent = rating + '%';
            document.getElementById('previewId').textContent = 'ID: ' + id;
            document.getElementById('previewLink').href = detailUrl;
            
            // Update poster preview if URL is provided
            const posterPreview = document.getElementById('posterPreview');
            if (poster) {
                posterPreview.innerHTML = `<img src="${poster}" alt="${title} poster" class="w-full h-full object-cover rounded">`;
            } else {
                posterPreview.innerHTML = '<i class="fas fa-image text-4xl text-gray-400"></i>';
            }
            
            // Show preview section if at least one field has value
            const hasValues = Array.from(form.elements).some(
                element => element.value && element.type !== 'submit'
            );
            previewSection.style.display = hasValues ? 'block' : 'none';
        }

        document.getElementById('movieForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                id: this.id.value,
                title: this.title.value,
                year: this.year.value,
                rating: this.rating.value,
                poster: this.poster.value,
                detailUrl: this.detailUrl.value
            };
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Movie saved successfully!');
            
            // Reset form (optional)
            //
$0 this.reset();
            // updatePreview();
        });
