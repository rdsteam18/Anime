<script>
        // Rating slider value display
        const ratingSlider = document.getElementById('rating');
        const ratingValue = document.getElementById('ratingValue');
        const ratingBar = document.getElementById('ratingBar');
        
        ratingSlider.addEventListener('input', function() {
            ratingValue.textContent = this.value;
            ratingBar.style.width = `${this.value}%`;
            
            // Change color based on rating value
            if (this.value < 30) {
                ratingBar.className = 'bg-red-500 h-2.5 rounded-full';
            } else if (this.value < 70) {
                ratingBar.className = 'bg-yellow-500 h-2.5 rounded-full';
            } else {
                ratingBar.className = 'bg-green-500 h-2.5 rounded-full';
            }
        });
        
        // Poster URL preview
        const posterUrl = document.getElementById('posterUrl');
        const posterPreviewContainer = document.getElementById('posterPreviewContainer');
        const posterPreview = document.getElementById('posterPreview');
        
        posterUrl.addEventListener('input', function() {
            if (this.value) {
                try {
                    // Basic URL validation
                    new URL(this.value);
                    
                    // Show preview
                    posterPreview.src = this.value;
                    posterPreview.onload = function() {
                        posterPreview.classList.remove('hidden');
                        posterPreviewContainer.classList.remove('hidden');
                    };
                    posterPreview.onerror = function() {
                        posterPreview.classList.add('hidden');
                        posterPreviewContainer.classList.remove('hidden');
                    };
                } catch (e) {
                    posterPreview.classList.add('hidden');
                    posterPreviewContainer.classList.add('hidden');
                }
            } else {
                posterPreviewContainer.classList.add('hidden');
            }
        });
        
        // Form submission
        const movieForm = document.getElementById('movieForm');
        
        movieForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!this.checkValidity()) {
                alert('Please fill in all required fields correctly.');
                return;
            }
            
            // Get form values
            const formData = new FormData(this);
            const movieData = Object.fromEntries(formData.entries());
            
            // Here you would typically send the data to a server
            console.log('Movie data:', movieData);
            
            // Show success message
            alert('Movie saved successfully!');
            
            // Reset form
            this.reset();
            ratingValue.textContent = '50';
            ratingBar.style.width = '50%';
            ratingBar.className = 'bg-blue-500 h-2.5 rounded-full';
            posterPreviewContainer.classList.add('hidden');
        });
        
        // Year field validation
        const yearField = document.getElementById('year');
        yearField.addEventListener('input', function() {
            if (this.value.length > 4) {
                this.value = this.value.slice(0, 4);
            }
        });
    </script>
