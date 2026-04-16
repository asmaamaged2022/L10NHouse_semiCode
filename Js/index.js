let services = null,
  sectors = null,
  languages = null,
  $navLinks = $(" nav .nav-link");

new WOW({ animateClass: "animate__animated" }).init();

$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  },
});

// services
(function () {
  fetch("https://semicode.tech/api/v1/l10nhouse/services")
    .then((data) => data.json())
    .then(function (data) {
      services = data;
      data.forEach(function (item, index) {
        $("#Services .content .row").append(`
         <div ${rightOrLift(index, data.length)}>
              <div class="box  rounded-5 py-4 px-3">
                <div class="image mx-auto"><img src="images/${item.icon}" alt="" class="img-fluid" /></div>
                <h5 class="my-4">${item.title}</h5>
                <p>
                  ${SelectedText(item.description.slice(0, 150))}...
                  <span class="firstColor link" onclick="openPopUp(this)" data-type="service" data-index="${index}">Read More</span>
                </p>
              </div>
            </div>
       `);
      });
    });
})();
// sectors
(function () {
  fetch("https://semicode.tech/api/v1/l10nhouse/sectors")
    .then((data) => data.json())
    .then(function (data) {
      sectors = data;
    });
})();
//languages
(function () {
  fetch("https://semicode.tech/api/v1/l10nhouse/languages")
    .then((data) => data.json())
    .then(function (data) {
      languages = data;
      console.log(languages);
    });
})();

$(".popUp").click(function () {
  closPopUp();
});
$(".popUp .box").click(function (e) {
  e.stopPropagation();
});
$(window).scroll(function () {
  if (window.scrollY > 0) {
    $(".navbar").addClass("scrolled");
  } else {
    $(".navbar").removeClass("scrolled");
  }
  if ($(window).scrollTop() > 400) {
    $(".toTop").fadeIn(300);
  } else {
    $(".toTop").fadeOut(300);
  }

  let sections = $("section, header");

  sections.each(function (index, section) {
    let sectionTop = $(section).offset().top,
      navHeight = $("nav").outerHeight(true);

    if (window.scrollY >= sectionTop - navHeight) {
      let sectionId = $(section).attr("id");

      $(`nav .nav-link:not([href="#${sectionId}"])`).removeClass("active");

      $(`nav .nav-link[href="#${sectionId}"]`).addClass("active");
    }
  });
});
$navLinks.click(function (e) {
  e.preventDefault();
  let sectionId = $(this).attr("href"),
    sectionEle = $(sectionId),
    sectionTop = sectionEle.offset().top,
    navHeight = $("nav").outerHeight(true);
  $(window).scrollTop(sectionTop - navHeight);
  $($navLinks).removeClass("active");
  $(this).addClass("active");
});
$(window).on("load", function () {
  let popup = $(".popup.lode");

  popup.removeClass("hidden");
  $("body").css("overflow-y", "hidden");

  setTimeout(function () {
    popup.addClass("active");
  }, 100);

  setTimeout(function () {
    popup.removeClass("active");
  }, 500);

  setTimeout(function () {
    popup.addClass("hidden");
    $("body").css("overflow-y", "auto");
  }, 800);
});
$(".toTop").click(function () {
  $(window).scrollTop(0);
});
