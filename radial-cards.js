window.Webflow = window.Webflow || [];

window.Webflow.push(function () {

  "use strict";


  /* =========================================================
     FRIEND'S ORIGINAL RADIAL SETTINGS
  ========================================================= */

  var statsConfig = {

    scrollHeightSvh: 200,

    centerX: 14,
    centerY: 58,

    radiusX: 60,
    radiusY: 50,

    activeAngleDeg: -25,

    angleStepDeg: 28,

    minDistance: -1.2,
    maxDistance: 3.2,

    pastScaleGrowth: 0.22,

    upcomingScaleRate: 0.28,

    upcomingOpacityRate: 1.60,

    minimumUpcomingOpacity: 0.16

  };


  var mobileBreakpoint =
    991;



  /* =========================================================
     YOUR STRUCTURE
  ========================================================= */

  var statsSection =
    document.querySelector(
      '[data-globe="2"].data_home'
    );


  if (!statsSection) {
    return;
  }


  var scrollOffset =
    statsSection.querySelector(
      ".scroll-viewport"
    );


  var statsList =
    statsSection.querySelector(
      ".data-content-list"
    );


  if (
    !scrollOffset ||
    !statsList
  ) {
    return;
  }


  var cards =
    Array.prototype.slice.call(
      statsList.querySelectorAll(
        ".data-item"
      )
    );


  if (!cards.length) {
    return;
  }



  /* =========================================================
     FRIEND'S CLAMP
  ========================================================= */

  function clamp(
    value,
    min,
    max
  ) {

    return Math.max(
      min,
      Math.min(
        max,
        value
      )
    );

  }



  /* =========================================================
     FRIEND'S EXACT ELLIPTICAL PATH MATH
  ========================================================= */

  function sampleRadialPath(
    distance
  ) {


    /*
     * Each card sits on the same ellipse.
     *
     * Active = -25deg
     * Each next card = +28deg
     */

    var d =
      clamp(
        distance,
        statsConfig.minDistance,
        statsConfig.maxDistance
      );


    var angle =
      (
        statsConfig.activeAngleDeg +
        d *
        statsConfig.angleStepDeg
      ) *
      Math.PI /
      180;


    var centerX =
      statsConfig.centerX;


    var centerY =
      statsConfig.centerY;


    var radiusX =
      statsConfig.radiusX;


    var radiusY =
      statsConfig.radiusY;


    var scale;
    var opacity;



    /* =====================================================
       PASSED CARD

       Grows as it leaves toward upper-left.
    ===================================================== */

    if (d < 0) {


      var past =
        clamp(
          -d,
          0,
          1
        );


      scale =
        1 +
        past *
        statsConfig.pastScaleGrowth;


      opacity =
        1 -
        past;


    }


    /* =====================================================
       UPCOMING CARD

       Gets progressively smaller / fainter.
    ===================================================== */

    else {


      scale =
        1 /
        (
          1 +
          d *
          statsConfig.upcomingScaleRate
        );


      opacity =
        Math.max(

          statsConfig.minimumUpcomingOpacity,

          1 /
          (
            1 +
            d *
            statsConfig.upcomingOpacityRate
          )

        );

    }



    return {

      x:
        centerX +
        Math.cos(angle) *
        radiusX,


      y:
        centerY +
        Math.sin(angle) *
        radiusY,


      scale:
        scale,


      opacity:
        opacity

    };

  }



  /* =========================================================
     RENDER
  ========================================================= */

  var frameRequested =
    false;


  function renderRadialStats() {


    frameRequested =
      false;



    /* =====================================================
       MOBILE RESET
    ===================================================== */

    if (
      window.innerWidth <=
      mobileBreakpoint
    ) {


      cards.forEach(
        function (card) {


          card.classList.remove(
            "is-active"
          );


          card.removeAttribute(
            "data-data-state"
          );


          card.style.removeProperty(
            "left"
          );


          card.style.removeProperty(
            "top"
          );


          card.style.removeProperty(
            "transform"
          );


          card.style.removeProperty(
            "opacity"
          );


          card.style.removeProperty(
            "z-index"
          );


          var background =
            card.querySelector(
              ".data-item-bg"
            );


          if (background) {

            background.style.removeProperty(
              "opacity"
            );

          }

        }
      );


      return;

    }



    /* =====================================================
       FRIEND'S ORIGINAL SCROLL PROGRESS
    ===================================================== */

    var sectionTop =

      statsSection
        .getBoundingClientRect()
        .top +

      window.pageYOffset;



    var travel =
      Math.max(
        1,
        scrollOffset.offsetHeight
      );



    var sectionProgress =
      clamp(

        (
          window.pageYOffset -
          sectionTop
        ) /
        travel,

        0,

        1

      );



    /*
     * 4 CMS cards:
     *
     * progress 0 → card 0
     * progress 1 → card 3
     */

    var cardProgress =

      sectionProgress *

      (
        cards.length -
        1
      );



    var activeIndex =
      Math.round(
        cardProgress
      );



    /* =====================================================
       POSITION EACH CMS ITEM
    ===================================================== */

    cards.forEach(
      function (
        card,
        index
      ) {


        /*
         * EXACT friend calculation.
         */

        var distance =
          index -
          cardProgress;



        var state =
          sampleRadialPath(
            distance
          );



        var isActive =
          index ===
          activeIndex;



        var background =
          card.querySelector(
            ".data-item-bg"
          );



        /* =================================================
           POSITION
        ================================================= */

        card.style.left =
          state.x.toFixed(3) +
          "%";


        card.style.top =
          state.y.toFixed(3) +
          "%";



        /* =================================================
           SCALE
        ================================================= */

        card.style.transform =

          "translate(-50%,-50%) " +

          "scale(" +

          state.scale.toFixed(4) +

          ")";



        /* =================================================
           OPACITY
        ================================================= */

        card.style.opacity =
          state.opacity.toFixed(4);



        /* =================================================
           Z INDEX
        ================================================= */

        card.style.zIndex =
          String(

            100 -

            Math.round(

              Math.abs(
                distance
              ) *

              10

            )

          );



        /* =================================================
           ACTIVE STATE
        ================================================= */

        card.classList.toggle(
          "is-active",
          isActive
        );



        /*
         * Same state idea as friend,
         * but use our own attribute name.
         */

        card.setAttribute(

          "data-data-state",

          isActive
            ? "active"

            : (
                distance < 0
                  ? "past"
                  : "upcoming"
              )

        );



        /*
         * Active visibility is controlled
         * by CSS above.
         */

        if (background) {

          background.style.removeProperty(
            "opacity"
          );

        }

      }
    );

  }



  /* =========================================================
     RAF SCROLL HANDLER

     This is exactly the approach his live
     implementation uses.
  ========================================================= */

  function requestRadialRender() {


    if (frameRequested) {
      return;
    }


    frameRequested =
      true;


    requestAnimationFrame(
      renderRadialStats
    );

  }



  window.addEventListener(

    "scroll",

    requestRadialRender,

    {
      passive: true
    }

  );


  window.addEventListener(

    "resize",

    requestRadialRender

  );



  /* =========================================================
     INITIAL RENDER
  ========================================================= */

  renderRadialStats();

});
