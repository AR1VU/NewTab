// Time
const time = document.getElementById("time"),
  greeting = document.getElementById("greeting"),
  name = document.getElementById("name");

const showAmPm = true;

function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  const amPm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ""}`;

  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}


// Shortcuts
fetch("/config.json")
  .then((response) => response.json())
  .then((data) => {
    const links = [
      {
        id: "link1",
        link: data.shortCut1Link,
        icon: data.shortCut1Icon,
      },
      {
        id: "link2",
        link: data.shortCut2Link,
        icon: data.shortCut2Icon,
      },
      {
        id: "link3",
        link: data.shortCut3Link,
        icon: data.shortCut3Icon,
      },
      {
        id: "link4",
        link: data.shortCut4Link,
        icon: data.shortCut4Icon,
      },
      {
        id: "link5",
        link: data.shortCut5Link,
        icon: data.shortCut5Icon,
      },
      {
        id: "link6",
        link: data.shortCut6Link,
        icon: data.shortCut6Icon,
      },
    ];

    links.forEach((link) => {
      const linkElement = document.querySelector(`#${link.id}`);
      linkElement.href = link.link;
      linkElement.innerHTML = `<img src="${link.icon}" style=""/>`;
    });
  })
  .catch((error) => console.error(error));

fetch("/config.json")
  .then((response) => response.json())
  .then((data) => {
    const links = [
      {
        id: "slink1",
        link: data.bookmark1Link,
        icon: data.bookmark1Icon,
      },
      {
        id: "slink2",
        link: data.bookmark2Link,
        icon: data.bookmark2Icon,
      },
      {
        id: "slink3",
        link: data.bookmark3Link,
        icon: data.bookmark3Icon,
      },
      {
        id: "slink4",
        link: data.bookmark4Link,
        icon: data.bookmark4Icon,
      },
    ];

    links.forEach((link) => {
      const linkElement = document.querySelector(`#${link.id}`);
      linkElement.href = link.link;
      linkElement.innerHTML = `<img src="${link.icon}" style=""/>`;
    });
  })
  .catch((error) => console.error(error));

// Shortcuts Keybind
document.addEventListener("keydown", function (event) {
  const shortcutLinks = [
    "shortCut1Link",
    "shortCut2Link",
    "shortCut3Link",
    "shortCut4Link",
    "shortCut5Link",
    "shortCut6Link",
    "bookmark1Link",
    "bookmark2Link",
    "bookmark3Link",
  ];
  const key = event.key;
  const index = parseInt(key) - 1;
  const activeElement = document.activeElement.tagName;

  if (
    activeElement !== "INPUT" &&
    index >= 0 &&
    index < shortcutLinks.length &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  ) {
    fetch("/config.json")
      .then((response) => response.json())
      .then((data) => {
        window.open(data[shortcutLinks[index]], "_parent");
      })
      .catch((error) => console.error(error));
  }
});

document.addEventListener("keydown", function (event) {
  const key = event.key;
  if (key === "0" && !event.ctrlKey && !event.shiftKey && !event.altKey) {
    fetch("/config.json")
      .then((response) => response.json())
      .then((data) => {
        const bookmark4Link = data.bookmark4Link;
        window.open(data.bookmark4Link, "_parent");
      })
      .catch((error) => console.error(error));
  }
});

// Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour >= 0 && hour < 6) {
    greeting.textContent = "Go to sleep!";
  } else if (hour >= 6 && hour < 12) {
    greeting.textContent = "Good morning!";
  } else if (hour >= 12 && hour < 18) {
    greeting.textContent = "Good afternoon!";
  } else if (hour >= 18 && hour < 22) {
    greeting.textContent = "Good evening!";
  } else if (hour >= 22 && hour < 24) {
    greeting.textContent = "Good night!";
  } else {
    greeting.textContent = "Time Sync Error";
  }
}

// Name
function getName() {
  if (localStorage.getItem("name") === null) {
    name.textContent = "[Enter Name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

function setName(e) {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("name", e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem("name", e.target.innerText);
  }
}

name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);

// Battery
function getBatteryPercentage() {
  navigator.getBattery().then(function (battery) {
    if (battery.charging) {
      document.getElementById("battery").innerHTML = `${
        Math.ceil(battery.level * 100) + "% Battery"
      }`;
    } else {
      document.getElementById("battery").innerHTML = `${
        Math.ceil(battery.level * 100) + "% Battery"
      }`;
    }

    if (battery.charging) {
      document.getElementById("battery-icon").src =
        "/assets/images/battery/battery-charging.png";
    } else if (battery.level * 100 >= 75) {
      document.getElementById("battery-icon").src =
        "/assets/images/battery/battery-full.png";
    } else if (battery.level * 100 >= 50) {
      document.getElementById("battery-icon").src =
        "/assets/images/battery/battery-midhigh.png";
    } else if (battery.level * 100 >= 25) {
      document.getElementById("battery-icon").src =
        "/assets/images/battery/battery-mid.png";
    } else if (battery.level * 100 >= 0) {
      document.getElementById("battery-icon").src =
        "/assets/images/battery/battery-low.png";
    }
  });
}

setInterval(getBatteryPercentage, 1);

// Connection
const connectionSpan = document.getElementById("connection");

function updateConnectionSpeed() {
  const connectionSpeed = navigator.connection?.downlink;
  if (!navigator.onLine) {
    connectionSpan.innerHTML = "Offline";
    document.getElementById("connection-icon").src =
      "/assets/images/wifi/no.png";
  } else if (connectionSpeed === undefined) {
    connectionSpan.innerHTML = "unknown";
    document.getElementById("connection-icon").src =
      "/assets/images/wifi/uk.png";
  } else if (connectionSpeed >= 10) {
    connectionSpan.innerHTML = `> ${connectionSpeed} Mbps`;
    document.getElementById("connection-icon").src =
      "/assets/images/wifi/yes.png";
  } else {
    connectionSpan.innerHTML = `~ ${connectionSpeed} Mbps`;
    document.getElementById("connection-icon").src =
      "/assets/images/wifi/yes.png";
  }
}

setInterval(updateConnectionSpeed, 1);

// Date/Day
function day() {
  const dayOfWeekName = new Date().toLocaleString("default", {
    weekday: "long",
  });
  document.getElementById("weekday").innerHTML = `${dayOfWeekName}`;
}

function date() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  document.getElementById("date").innerHTML = `${currentDate}`;
}

// Backgrounds
const backgrounds = [];
const textColors = [];
fetch("config.json")
  .then((response) => response.json())
  .then((data) => {
    backgrounds.push(data.bg1, data.bg2, data.bg3, data.bg4, data.bg5);
    textColors.push(
      data.colorBg1,
      data.colorBg2,
      data.colorBg3,
      data.colorBg4,
      data.colorBg5
    );
  });

window.addEventListener("load", () => {
  const body = document.querySelector("body");
  const spanElements = document.querySelectorAll("h2");
  const backgrounds = [];
  const textColors = [];
  let lastBackgroundIndex = localStorage.getItem("lastBackgroundIndex");
  if (lastBackgroundIndex === null) {
    lastBackgroundIndex = -1;
  }
  fetch("config.json")
    .then((response) => response.json())
    .then((data) => {
      backgrounds.push(data.bg1, data.bg2, data.bg3, data.bg4, data.bg5);
      textColors.push(
        data.colorBg1,
        data.colorBg2,
        data.colorBg3,
        data.colorBg4,
        data.colorBg5
      );
      let nextIndex = parseInt(lastBackgroundIndex) + 1;
      if (nextIndex >= backgrounds.length) {
        nextIndex = 0;
      }
      body.style.backgroundImage = `url(${backgrounds[nextIndex]})`;
      body.style.backgroundSize = "cover";
      body.style.backgroundRepeat = "no-repeat";
      spanElements.forEach((span) => {
        span.style.color = textColors[nextIndex];
      });
      localStorage.setItem("lastBackgroundIndex", nextIndex);
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      body.appendChild(overlay);

      window.addEventListener("keydown", (event) => {
        if (event.altKey && event.key === "r") {
          const body = document.querySelector("body");
          const spanElements = document.querySelectorAll("h2");
          const backgrounds = [];
          const textColors = [];
          let lastBackgroundIndex = localStorage.getItem("lastBackgroundIndex");
          if (lastBackgroundIndex === null) {
            lastBackgroundIndex = -1;
          }
          fetch("config.json")
            .then((response) => response.json())
            .then((data) => {
              backgrounds.push(
                data.bg1,
                data.bg2,
                data.bg3,
                data.bg4,
                data.bg5
              );
              textColors.push(
                data.colorBg1,
                data.colorBg2,
                data.colorBg3,
                data.colorBg4,
                data.colorBg5
              );
              let nextIndex = parseInt(lastBackgroundIndex) + 1;
              if (nextIndex >= backgrounds.length) {
                nextIndex = 0;
              }
              body.style.backgroundImage = `url(${backgrounds[nextIndex]})`;
              body.style.backgroundSize = "cover";
              body.style.backgroundRepeat = "no-repeat";
              spanElements.forEach((span) => {
                span.style.color = textColors[nextIndex];
              });
              localStorage.setItem("lastBackgroundIndex", nextIndex);
              console.log("Background reloaded");
            });
        }
      });
    });
});

// Search
document.getElementById("search-bar").setAttribute("autocomplete", "off");

document
  .getElementById("search-bar")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      var inputText = document.getElementById("search-bar").value;

      if (isValidURL(inputText)) {
        window.open(inputText, "_parent");
      } else {
        var googleSearchUrl =
          "https://www.google.com/search?q=" + encodeURIComponent(inputText);
        window.open(googleSearchUrl, "_parent");
      }
    }
  });

function isValidURL(text) {
  var pattern =
    /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})(\/[a-zA-Z0-9]*)?$/;

  return pattern.test(text);
}

// Weather
fetch("/config.json")
  .then((response) => response.json())
  .then((data) => {
    const apiKey = data.weatherAPIKey;
    const cityWeather = data.city;

    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityWeather +
      "&units=metric&appid=" +
      apiKey;

    function getWeatherData() {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const location = data.name;
          const feelsLike = Math.ceil(data.main.feels_like);
          const description = data.weather[0].description
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          const temperature = Math.ceil(data.main.temp);
          const icon =
            "/assets/images/Weather/" + data.weather[0].icon + ".png";

          document.querySelector(".weather-location").textContent = location;
          document.querySelector(".weather-description").textContent =
            description;
          document.querySelector(".weather-temperature").textContent =
            `${temperature}°C ` + `(${feelsLike}°C)`;
          document.querySelector(".weather-icon img").src = icon;
        })
        .catch((error) => console.error("Error fetching weather data:", error));
    }
    document.querySelector(".weather-icon img").style.width = "30%";
    document.querySelector(".weather-icon img").style.height = "30%";

    document.querySelector(".weather-info").style.marginLeft = "125px";
    getWeatherData();
  });

// Keybinds
document.addEventListener("keydown", function (event) {
  const pg1 = document.getElementById("pg1");
  if (
    event.key === "/" &&
    !document.getElementById("search-bar").matches(":focus") &&
    pg1.style.opacity !== "0"
  ) {
    event.preventDefault();
    document.getElementById("search-bar").focus();
  }
});

document.addEventListener("keydown", function (event) {
  const searchBar = document.getElementById("search-bar");
  if (event.key === "Escape" && searchBar.matches(":focus")) {
    searchBar.blur();
  }
});

// Protection
document.addEventListener("contextmenu", (event) => event.preventDefault());
document.onkeydown = function (e) {
  if (event.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    return false;
  }
};

// Run
showTime();
setBgGreet();
getName();
date();
day();
