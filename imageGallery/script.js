document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  const imageContainer = document.querySelector("#image-container");
  const clearBtn = document.getElementById("clear-btn");
  const searchIcon = document.getElementById("search-icon");

  getData("autumn", 1);

  async function getData(query, page = 1) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=qQp2-G7I6s2lKAEAYMizn_kf0eLszkNnvIdjFFLt3As&per_page=30&page=${page}&tag_mode=all&extras=url_m&orientation=landscape`
      );
      const data = await res.json();

      if (data.results.length === 0) {
        showMessage("Nothing found.");
      } else {
        displayImages(data.results);
      }
    } catch (error) {
      showMessage("Error: " + error.message);
    }
  }

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const query = searchInput.value.trim();
      if (!query) {
        getData("autumn", 1);
      } else {
        getData(query, 1);
      }
    }
  });

  searchIcon.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      getData(query, 1);
      searchInput.value = query;
    }
    searchInput.focus();
  });

  function showMessage(message) {
    imageContainer.innerHTML = "";
    const messageContainer = document.createElement("div");
    messageContainer.className = "massage-item";
    messageContainer.textContent = message;
    imageContainer.appendChild(messageContainer);
  }

  clearBtn.addEventListener("click", () => {
    if (searchInput.value) {
      searchInput.value = "";
      searchInput.placeholder = "Search...";
    }
    searchInput.focus();
  });

  const displayImages = (images) => {
    imageContainer.innerHTML = "";
    images.forEach((image) => {
      const imageItem = document.createElement("div");
      imageItem.className = "image-item";
      imageItem.style.backgroundImage = `url(${image.urls.regular})`;
      imageItem.style.backgroundSize = "cover";
      imageItem.style.backgroundPosition = "center";
      imageContainer.appendChild(imageItem);
    });
  };
});
