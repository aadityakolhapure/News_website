
// List of SDGs for searching
const sdgs = [
    "No Poverty", "Zero Hunger", "Good Health and Well-being", "Quality Education",
    "Gender Equality", "Clean Water and Sanitation", "Affordable and Clean Energy",
    "Decent Work and Economic Growth", "Industry Innovation and Infrastructure",
    "Reduced Inequalities", "Sustainable Cities and Communities",
    "Responsible Consumption and Production", "Climate Action", "Life Below Water",
    "Life on Land", "Peace, Justice and Strong Institutions", "Partnerships for the Goals"
];

// Function to fetch articles for a specific SDG
function fetchSDGArticles(sdg) {
    const url = `https://newsapi.org/v2/everything?` +
        `q="${encodeURIComponent(sdg)}"&` +
        `from=2024-07-20&` +
        `sortBy=relevancy&` +
        `pageSize=5&` +
        `apiKey=bdaea2c3cb80499a9ebb11bc49b45a9d`; // Replace with your actual API key

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok' && data.articles.length > 0) {
                displayArticles(sdg, data.articles);
            } else {
                console.log(`No articles found for ${sdg}:`, data);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to display articles
function displayArticles(sdg, articles) {
    const container = document.querySelector('.p-5');
    const sdgSection = document.createElement('div');

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('max-w-xs', 'w-auto', 'h-100', 'bg-white', 'border', 'border-gray-200', 'rounded-lg', 'shadow', 'dark:bg-gray-800', 'dark:border-gray-700', 'm-2');


        articleElement.innerHTML = `
            <a href="${article.url}" target="_blank">
                <img class="rounded-t-lg" src="${article.urlToImage || ''}" alt="" />
            </a>
            <div class="p-5">
                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">${article.title}</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${article.description || ''}</p>
                <a href="${article.url}" target="_blank" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        `;
        sdgSection.appendChild(articleElement);
    });

    container.appendChild(sdgSection);
}

// Fetch articles for each SDG
document.addEventListener('DOMContentLoaded', () => {
    sdgs.forEach(sdg => fetchSDGArticles(sdg));
});
