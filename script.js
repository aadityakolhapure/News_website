const sdgs = [
	"No Poverty",
	"Zero Hunger",
	"Good Health and Well-being",
	"Quality Education",
	"Gender Equality",
	"Clean Water and Sanitation",
	"Affordable and Clean Energy",
	"Decent Work and Economic Growth",
	"Industry Innovation and Infrastructure",
	"Reduced Inequalities",
	"Sustainable Cities and Communities",
	"Responsible Consumption and Production",
	"Climate Action",
	"Life Below Water",
	"Life on Land",
	"Peace, Justice and Strong Institutions",
	"Partnerships for the Goals",
];

function showSpinner() {
	const spinner = document.getElementById("spinner");
	if (spinner) {
		spinner.classList.remove("hidden");
	} else {
		console.error("Spinner element not found");
	}
}

function hideSpinner() {
	const spinner = document.getElementById("spinner");
	if (spinner) {
		spinner.classList.add("hidden");
	} else {
		console.error("Spinner element not found");
	}
}

function fetchSDGArticles(sdg) {
	showSpinner();
	const apiKey = "1adea0d910c7405fb5efc16d861499c4";
	const url = `https://newsapi.org/v2/everything?q="${encodeURIComponent(
		sdg
		// )}"&from=2024-07-20&sortBy=relevancy&pageSize=5&apiKey=${apiKey}`;
	)}"&apiKey=${apiKey}`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			if (data.status === "ok" && data.articles.length > 0) {
				displayArticles(sdg, data.articles);
			} else {
				console.log(`No articles found for ${sdg}:`, data);
			}
			hideSpinner();
		})
		.catch((error) => {
			console.error("Error fetching data:", error);
			hideSpinner();
		});
}

function displayArticles(sdg, articles) {
	const container = document.querySelector(".grid");

	container.innerHTML = "";

	const sdgSection = document.createElement("div");
	sdgSection.classList.add("sdg-section", "mb-8");

	const sdgTitle = document.createElement("h2");
	sdgTitle.textContent = sdg;
	sdgTitle.classList.add(
		"text-2xl",
		"font-bold",
		"mb-4",
		"text-gray-800",
		"dark:text-white"
	);
	sdgSection.appendChild(sdgTitle);

	const articlesContainer = document.createElement("div");
	articlesContainer.classList.add(
		"flex",
		"flex-wrap",
		"justify-start",
		"-mx-2"
	);

	articles.forEach((article) => {
		const articleElement = document.createElement("div");
		articleElement.classList.add(
			"max-w-sm",
			"w-full",
			"sm:w-1/2",
			"md:w-1/3",
			"lg:w-1/3",
			"px-2",
			"mb-4"
		);

		articleElement.innerHTML = `
            <div class="h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="${article.url}" target="_blank">
                    <img class="rounded-t-lg w-full h-48 object-cover" src="${
											article.urlToImage || "placeholder-image-url.jpg"
										}" alt="" />
                </a>
                <div class="p-5">
                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">${
											article.title
										}</h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${
											article.description || ""
										}</p>
                    <a href="${
											article.url
										}" target="_blank" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            </div>
        `;
		articlesContainer.appendChild(articleElement);
	});

	sdgSection.appendChild(articlesContainer);
	container.appendChild(sdgSection);
}

function handleSidebarClick(e) {
	if (e.target.classList.contains("sidebar-item")) {
		document.querySelectorAll(".sidebar-item").forEach((item) => {
			item.classList.remove("text-blue-500");
			item.classList.add("text-gray-900");
		});

		const clickedItem = e.target;
		clickedItem.classList.remove("text-gray-900");
		clickedItem.classList.add("text-blue-700");

		const sdg = clickedItem.textContent.trim();
		fetchSDGArticles(sdg);
	}
}

document.querySelectorAll(".sidebar-item").forEach((item) => {
	item.addEventListener("click", handleSidebarClick);
});

document.addEventListener("DOMContentLoaded", () => {
	fetchSDGArticles("No Poverty");

	document
		.getElementById("search-form")
		.addEventListener("submit", function (e) {
			e.preventDefault();
			const query = document.getElementById("default-search").value;
			fetchArticles(query, "search");
		});
});

function fetchArticles(query, type) {
	const apiKey = "1adea0d910c7405fb5efc16d861499c4";
	const url = `https://newsapi.org/v2/everything?q="${encodeURIComponent(
		query
	)}"&apiKey=${apiKey}`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			if (data.status === "ok" && data.articles.length > 0) {
				displayArticles(type, data.articles);
			} else {
				console.log(`No articles found for ${query}`);
			}
		})
		.catch((error) => console.error("Error fetching data:", error));
}
