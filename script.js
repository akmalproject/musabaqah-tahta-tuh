/* =========================================================
   MUSABAQAH TAHTA TUH 2026
   JAVASCRIPT
========================================================= */


/* =========================================================
   COUNTDOWN PENDAFTARAN
   PERIODE:
   1 OKTOBER 2026
   s/d
   10 OKTOBER 2026
========================================================= */

const registrationStart =
  new Date("2026-10-01T00:00:00+07:00").getTime();

const registrationEnd =
  new Date("2026-10-10T23:59:59+07:00").getTime();


const daysElement =
  document.getElementById("days");

const hoursElement =
  document.getElementById("hours");

const minutesElement =
  document.getElementById("minutes");

const secondsElement =
  document.getElementById("seconds");

const countdownMessage =
  document.getElementById("countdown-message");


function updateCountdown() {

  const now =
    new Date().getTime();


  /* -----------------------------------------
     SEBELUM PENDAFTARAN
  ----------------------------------------- */

  if (now < registrationStart) {

    const distance =
      registrationStart - now;

    updateTime(distance);

    countdownMessage.textContent =
      "Pendaftaran akan segera dibuka.";

    return;

  }


  /* -----------------------------------------
     SAAT PENDAFTARAN
  ----------------------------------------- */

  if (
    now >= registrationStart &&
    now <= registrationEnd
  ) {

    const distance =
      registrationEnd - now;

    updateTime(distance);

    countdownMessage.textContent =
      "Pendaftaran sedang berlangsung.";

    return;

  }


  /* -----------------------------------------
     SETELAH PENDAFTARAN
  ----------------------------------------- */

  daysElement.textContent = "00";
  hoursElement.textContent = "00";
  minutesElement.textContent = "00";
  secondsElement.textContent = "00";

  countdownMessage.textContent =
    "Pendaftaran telah ditutup.";

}


function updateTime(distance) {

  const days =
    Math.floor(
      distance /
      (1000 * 60 * 60 * 24)
    );


  const hours =
    Math.floor(
      (distance %
        (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
    );


  const minutes =
    Math.floor(
      (distance %
        (1000 * 60 * 60)) /
      (1000 * 60)
    );


  const seconds =
    Math.floor(
      (distance %
        (1000 * 60)) /
      1000
    );


  daysElement.textContent =
    String(days).padStart(2, "0");


  hoursElement.textContent =
    String(hours).padStart(2, "0");


  minutesElement.textContent =
    String(minutes).padStart(2, "0");


  secondsElement.textContent =
    String(seconds).padStart(2, "0");

}


updateCountdown();


setInterval(
  updateCountdown,
  1000
);



/* =========================================================
   ACCORDION
========================================================= */

function toggleAccordion(button) {

  const currentItem =
    button.closest(".accordion-item");


  const accordionGroup =
    currentItem.parentElement;


  const isOpen =
    currentItem.classList.contains("active");


  /*
    Menutup accordion lain.
  */

  accordionGroup
    .querySelectorAll(".accordion-item")
    .forEach(item => {

      item.classList.remove("active");

      const header =
        item.querySelector(".accordion-header");

      if (header) {
        header.setAttribute(
          "aria-expanded",
          "false"
        );
      }

    });


  /*
    Jika sebelumnya tertutup,
    buka item yang diklik.
  */

  if (!isOpen) {

    currentItem.classList.add("active");

    button.setAttribute(
      "aria-expanded",
      "true"
    );

  }

}



/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const mobileMenuBtn =
  document.getElementById("mobileMenuBtn");

const mobileNav =
  document.getElementById("mobileNav");


if (
  mobileMenuBtn &&
  mobileNav
) {

  mobileMenuBtn.addEventListener(
    "click",
    function () {

      mobileNav.classList.toggle("open");


      const icon =
        mobileMenuBtn.querySelector("i");


      if (
        mobileNav.classList.contains("open")
      ) {

        icon.classList.remove(
          "fa-bars"
        );

        icon.classList.add(
          "fa-xmark"
        );

      } else {

        icon.classList.remove(
          "fa-xmark"
        );

        icon.classList.add(
          "fa-bars"
        );

      }

    }
  );


  /*
    Tutup menu setelah link dipilih.
  */

  document
    .querySelectorAll(".mobile-nav-link")
    .forEach(link => {

      link.addEventListener(
        "click",
        function () {

          mobileNav.classList.remove(
            "open"
          );


          const icon =
            mobileMenuBtn.querySelector("i");


          icon.classList.remove(
            "fa-xmark"
          );

          icon.classList.add(
            "fa-bars"
          );

        }
      );

    });

}



/* =========================================================
   NAVBAR ACTIVE LINK
========================================================= */

const navLinks =
  document.querySelectorAll(
    ".nav-link"
  );


const sections =
  document.querySelectorAll(
    "main > header[id], main > section[id]"
  );


const navObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          const currentId =
            entry.target.getAttribute("id");


          navLinks.forEach(link => {

            link.classList.remove(
              "active"
            );


            if (
              link.getAttribute("href") ===
              "#" + currentId
            ) {

              link.classList.add(
                "active"
              );

            }

          });

        }

      });

    },
    {
      threshold: 0.25,
      rootMargin:
        "-80px 0px -50% 0px"
    }
  );


sections.forEach(section => {

  navObserver.observe(section);

});



/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal, .reveal-section, .reveal-card"
  );


const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          entry.target.classList.add(
            "show"
          );


          /*
            Setelah muncul,
            tidak perlu diamati lagi.
          */

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.08,
      rootMargin:
        "0px 0px -60px 0px"
    }
  );


revealElements.forEach(element => {

  revealObserver.observe(element);

});



/* =========================================================
   CATEGORY FILTER
========================================================= */

const filterButtons =
  document.querySelectorAll(
    ".filter-btn"
  );


const arenaCards =
  document.querySelectorAll(
    ".arena-card"
  );


filterButtons.forEach(button => {

  button.addEventListener(
    "click",
    function () {

      /*
        Tombol aktif
      */

      filterButtons.forEach(btn => {

        btn.classList.remove(
          "active"
        );

      });


      this.classList.add(
        "active"
      );


      const filter =
        this.dataset.filter;


      /*
        Tampilkan / sembunyikan
        card sesuai kategori.
      */

      arenaCards.forEach(card => {

        const category =
          card.dataset.category;


        if (
          filter === "all" ||
          category === filter
        ) {

          card.classList.remove(
            "filter-hidden"
          );

          /*
            Animasi ulang card
          */

          card.style.animation =
            "none";

          card.offsetHeight;

          card.style.animation =
            "cardAppear .45s ease both";

        } else {

          card.classList.add(
            "filter-hidden"
          );

        }

      });


      /*
        Category block ikut disembunyikan
        jika tidak memiliki card aktif.
      */

      document
        .querySelectorAll(
          ".arena-category-block"
        )
        .forEach(block => {

          const visibleCards =
            block.querySelectorAll(
              ".arena-card:not(.filter-hidden)"
            );


          if (
            filter === "all" ||
            visibleCards.length > 0
          ) {

            block.style.display = "";

          } else {

            block.style.display = "none";

          }

        });

    }
  );

});



/* =========================================================
   CTA SCROLL
========================================================= */

function scrollToArena(event) {

  if (event) {
    event.preventDefault();
  }


  const arena =
    document.getElementById(
      "arena"
    );


  if (arena) {

    arena.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }

}



/* =========================================================
   CLOSE ACCORDION WITH ESC
========================================================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "Escape"
    ) {

      document
        .querySelectorAll(
          ".accordion-item.active"
        )
        .forEach(item => {

          item.classList.remove(
            "active"
          );


          const header =
            item.querySelector(
              ".accordion-header"
            );


          if (header) {

            header.setAttribute(
              "aria-expanded",
              "false"
            );

          }

        });

    }

  }
);



/* =========================================================
   EXTRA CARD ANIMATION
========================================================= */

const animationStyle =
document.createElement("style");


animationStyle.innerHTML = `

@keyframes cardAppear {

  from {

    opacity: 0;

    transform:
      translateY(12px)
      scale(0.98);

  }

  to {

    opacity: 1;

    transform:
      translateY(0)
      scale(1);

  }

}

`;


document.head.appendChild(
  animationStyle
);



/* =========================================================
   PREVENT JUMP WHEN NAVBAR LINKS CLICKED
========================================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      function(event) {

        const targetId =
          this.getAttribute("href");


        if (
          targetId === "#" ||
          targetId === ""
        ) {
          return;
        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) {
          return;
        }


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });