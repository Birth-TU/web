const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

const loadJSON = lang =>
  new Promise((resolve, reject) => {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", `resources/locale/${lang}.json`, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = () => {
      if (xobj.readyState == 4 && xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        resolve(xobj.responseText);
      }
    };
    xobj.send(null);
  });

async function main() {
  let locale = "";
  if (getParameterByName("lang") !== null) {
    locale = getParameterByName("lang");
  } else locale = navigator.language.substring(0, 2) || "en";

  const result = JSON.parse(await loadJSON(locale));

  let current_year = new Date().getFullYear();

  let elements = {
    subtitle: `${result.BODY1}`,
    lltk: `${result.LLTK}`,
    current_year: `${result.BODY2}${current_year + 543} ${result.BODY3}`,
    title_n: `${result.MONTH}`,
    title_d: `${result.DAY}`,
    title_h: `${result.HOUR}`,
    title_m: `${result.MINUTE}`,
    title_s: `${result.SECOND}`,
    head: `${result.TITLE}`,
    title: `${result.TITLE}`,
    source: `${result.SOURCE}`,
    darkmode: `${result.DARKMODE}`
  };

  Object.keys(elements).forEach(element => {
    document.getElementById(element).innerHTML = elements[element];
  });

  // document.getElementById('subtitle').appendChild(document.createTextNode(`${result.BODY1}`));
  // document.getElementById('lltk').appendChild(document.createTextNode(`${result.LLTK}`));
  // document.getElementById('current_year').appendChild(document.createTextNode(`${result.BODY2}${current_year + 543} ${result.BODY3}`));
  // document.getElementById('title_n').appendChild(document.createTextNode(`${result.MONTH}`));
  // document.getElementById('title_d').appendChild(document.createTextNode(`${result.DAY}`));
  // document.getElementById('title_h').appendChild(document.createTextNode(`${result.HOUR}`));
  // document.getElementById('title_m').appendChild(document.createTextNode(`${result.MINUTE}`));
  // document.getElementById('title_s').appendChild(document.createTextNode(`${result.SECOND}`));
  // document.getElementById('head').appendChild(document.createTextNode(`${result.TITLE}`));
  // document.getElementById('title').appendChild(document.createTextNode(`${result.TITLE}`));
  // document.getElementById('source').appendChild(document.createTextNode(`${result.SOURCE}`));
  // document.getElementById('darkmode').appendChild(document.createTextNode(`${result.DARKMODE}`));
}

async function update(lang) {
  const result = JSON.parse(await loadJSON(lang));

  let current_year = new Date().getFullYear();

  let elements = {
    subtitle: `${result.BODY1}`,
    lltk: `${result.LLTK}`,
    current_year: `${result.BODY2}${current_year + 543} ${result.BODY3}`,
    title_n: `${result.MONTH}`,
    title_d: `${result.DAY}`,
    title_h: `${result.HOUR}`,
    title_m: `${result.MINUTE}`,
    title_s: `${result.SECOND}`,
    head: `${result.TITLE}`,
    title: `${result.TITLE}`,
    source: `${result.SOURCE}`,
    darkmode: `${result.DARKMODE}`
  };

  Object.keys(elements).forEach(element => {
    document.getElementById(element).innerHTML = elements[element];
  });
}

main();
