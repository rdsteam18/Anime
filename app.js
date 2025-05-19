
// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.querySelector('.hamburger').classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Movie card template
function createMovieCard(movie) {
    return `
        <div class="movie-card relative rounded-lg overflow-hidden group cursor-pointer" onclick="window.location.href='${movie.detailUrl}'">
            <img src="${movie.poster}" alt="${movie.title}" class="w-full h-auto rounded-lg transition group-hover:opacity-70">
            <div class="movie-overlay absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <h3 class="font-semibold text-white truncate">${movie.title}</h3>
                <div class="flex justify-between items-center mt-1">
                    <span class="text-sm">${movie.year}</span>
                    <div class="flex items-center space-x-1">
                        <i class="fas fa-star text-yellow-400 text-sm"></i>
                        <span class="text-sm">${movie.rating}%</span>
                    </div>
                </div>
                <div class="flex space-x-2 mt-3">
                    <button class="bg-primary hover:bg-primary/90 text-white p-2 rounded-full transition" onclick="event.stopPropagation()">
                        <i class="fas fa-play text-xs"></i>
                    </button>
                    <button class="bg-secondary hover:bg-secondary/80 text-white p-2 rounded-full transition" onclick="event.stopPropagation()">
                        <i class="fas fa-plus text-xs"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Populate movie sections
function populateMovieSections(movies) {
    const trendingSection = document.getElementById('trendingMovies');
    const popularSection = document.getElementById('popularMovies');
    const newSection = document.getElementById('newMovies');
    
    // Shuffle movies for variety
    const shuffledMovies = [...movies].sort(() => 0.5 - Math.random());
    
    // Add 6 movies to each section
    for (let i = 0; i < 6; i++) {
        trendingSection.innerHTML += createMovieCard(shuffledMovies[i]);
        popularSection.innerHTML += createMovieCard(shuffledMovies[i+6]);
        newSection.innerHTML += createMovieCard(shuffledMovies[i+12]);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    fetch('movies.json')
        .then(response => response.json())
        .then(movies => populateMovieSections(movies))
        .catch(error => console.error('Error loading movies:', error));
});
 // Tab functionality
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const tabId = button.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // Rating stars functionality
        const stars = document.querySelectorAll('.fa-star');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                // Reset all stars
                stars.forEach(s => s.classList.remove('text-yellow-400'));
                stars.forEach(s => s.classList.add('text-gray-400'));
                
                // Fill stars up to clicked one
                for (let i = 0; i <= index; i++) {
                    stars[i].classList.remove('text-gray-400');
                    stars[i].classList.add('text-yellow-400');
                }
            });
            
            star.addEventListener('mouseover', () => {
                // Highlight stars on hover
                for (let i = 0; i <= index; i++) {
                    stars[i].classList.add('text-yellow-300');
                }
            });
            
            star.addEventListener('mouseout', () => {
                // Remove highlight on mouseout
                for (let i = 0; i <= index; i++) {
                    stars[i].classList.remove('text-yellow-300');
                }
            });
        });
