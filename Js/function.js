function SelectedText(text) {
  let regex = /L10N house/gim;
  return text.replace(regex, `<span class="secColor"> <span class="firstColor">L10N </span>House </span>`);
}
function rightOrLift(index, length) {
  if (index % 2 == 0) {
    return `class="col-md-6 item ${length - 1 == index ? "" : "mb-md-3"} text-center wow animate__backInLeft" data-wow-duration="1.5s" data-wow-delay="${index * 0.2}s"`;
  } else {
    return `class="col-md-6 item ${length - 1 == index ? "" : "mb-md-3"} text-center wow animate__backInRight" data-wow-duration="1.5s" data-wow-delay="${index * 0.2}s"`;
  }
}
function openPopUp(that) {
  let type = $(that).data("type");
  if (type == "service") {
    showService($(that).data("index"));
  } else if (type == "Sectors") {
    showSectors();
  } else if (type == "languages") {
    showLanguages();
  }
  $(`.popUp[data-type='${type}']`).addClass("show");
}
function closPopUp() {
  $(`.popUp`).removeClass("show");
}
function showService(index) {
  service = services[index];
  $(`.popUp[data-type='service'] .body`).html(
    `
       <div class="part">
              <div class="header secColor text-center fw-bold my-3">${service.title}</div>
              <div class="row">
                <div class="col-md-6">
                  <div class="description mb-md-0 mb-3">
                 ${SelectedText(service.description)}
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="image "><img src="images/${service.img}" alt="" class="img-fluid rounded m-auto" /></div>
                </div>
              </div>
            </div>
            <div class="part mt-3">
             ${showSectionOfServices(service.sections)}
            </div>

    `,
  );
}
function showSectionOfServices(sections) {
  let sectionHtml = ``;
  sections.forEach(function (section, index) {
    sectionHtml += ` 
        <div class="section ${index == 1 ? "mt-3" : ""}">
          <h5>${section.title}</h5>
          <ol>
            ${showPointInServices(section.points)}
          </ol>
        </div>
            
      `;
  });
  return sectionHtml;
}
function showPointInServices(points) {
  let pointsHtml = ``;

  points.forEach(function (point, index) {
    pointsHtml += `
      <li class="${index == 0 ? "" : "mt-1"}">${point}</li>
    `;
  });

  return pointsHtml;
}
function showSectors() {
  let content = $(`.popUp[data-type='Sectors'] .row`);
  sectors.forEach(function (item, index) {
    content.append(
      `
        <div class="col-lg-3">
          <div class="item mx-auto my-3 px-2 rounded-4">
            <div class="icon mx-auto py-3"><img src="images/sec/${item.icon}" alt="" class="img-fluid" /></div>
            <div class="name text-center rounded-2">${item.name}</div>
          </div>
        </div>
      `,
    );
  });
}
function showLanguages() {
  let content = $(`.popUp[data-type='languages'] .body`);
  languages.forEach(function (item, index) {
    content.append(
      `
         <div class="section ${index % 2 == 0 ? "even" : "odd"} mb-4">
            <h4 class="mb-3">${item.continent}</h4>
            <ul type="none" class="px-0">
             ${showLanguagesLi(item.languages)}
            </ul>
          </div>
      `,
    );
  });
}
function showLanguagesLi(content) {
  let Lis = ``;
  content.forEach(function (text, index) {
    Lis += `
       <li><i class="far fa-dot-circle"></i> ${text}</li>
    `;
  });

  return Lis;
}
