(function () {
  "use strict";

  /* =========================================================
     MOBILE ONLY
  ========================================================= */

  if (
    !window.matchMedia(
      "(max-width: 767px)"
    ).matches
  ) {
    return;
  }


  /* =========================================================
     CONFIG

     Same visual appearance as desktop.
  ========================================================= */

  const CONFIG = {

    dotSize: 4.5,

    pitch: 8,

    idleColor: [
      221,
      209,
      191
    ],

    idleOpacity:
      0.40,

    activeColor: [
      99,
      116,
      243
    ],

    radiusX:
      122,

    radiusY:
      84,


    /*
     * Same follow feeling as desktop.
     */
    follow:
      0.21,


    /*
     * Approximate same desktop
     * GSAP enter / leave timing.
     */
    enterSpeed:
      0.18,

    leaveSpeed:
      0.30,


    /*
     * Major mobile optimization.
     */
    maxDpr:
      1.25,


    /*
     * Mobile doesn't need 60fps
     * for this soft effect.
     */
    fps:
      30,


    /*
     * Fewer opacity groups than desktop.
     *
     * Visually almost identical,
     * cheaper to draw.
     */
    buckets:
      8

  };


  /* =========================================================
     GLOBAL STATE
  ========================================================= */

  const states =
    [];


  let running =
    false;


  let lastFrame =
    0;


  const frameInterval =
    1000 /
    CONFIG.fps;


  /* =========================================================
     HELPERS
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


  function smoothstep(
    value
  ) {

    value =
      clamp(
        value,
        0,
        1
      );


    return (
      value *
      value *
      (
        3 -
        2 *
        value
      )
    );

  }


  /* =========================================================
     CREATE CARD
  ========================================================= */

  function createCard(
    card
  ) {

    if (
      card.__mobileMetricDots
    ) {
      return;
    }


    const surface =
      card.querySelector(
        ".items-dots-bg"
      );


    if (!surface) {
      return;
    }


    card.__mobileMetricDots =
      true;


    /*
     * Remove old dot DOM implementation.
     */
    surface.innerHTML =
      "";


    /* =====================================================
       MAIN CANVAS
    ===================================================== */

    const canvas =
      document.createElement(
        "canvas"
      );


    canvas.className =
      "metric-dot-canvas";


    surface.appendChild(
      canvas
    );


    const ctx =
      canvas.getContext(
        "2d",
        {
          alpha: true
        }
      );


    if (!ctx) {
      return;
    }


    /* =====================================================
       CACHED IDLE CANVAS
    ===================================================== */

    const idleCanvas =
      document.createElement(
        "canvas"
      );


    const idleCtx =
      idleCanvas.getContext(
        "2d",
        {
          alpha: true
        }
      );


    if (!idleCtx) {
      return;
    }


    /* =====================================================
       STATE
    ===================================================== */

    const state = {

      card:
        card,

      surface:
        surface,

      canvas:
        canvas,

      ctx:
        ctx,

      idleCanvas:
        idleCanvas,

      idleCtx:
        idleCtx,


      width:
        0,

      height:
        0,

      dpr:
        1,


      targetX:
        0,

      targetY:
        0,


      focusX:
        0,

      focusY:
        0,


      strength:
        0,

      targetStrength:
        0,


      interacting:
        false,

      visible:
        true,

      dirty:
        true,


      /*
       * Precomputed grid positions.
       */
      gridX:
        [],

      gridY:
        []

    };


    /* =====================================================
       RESIZE
    ===================================================== */

    function resize() {

      const rect =
        surface.getBoundingClientRect();


      const width =
        Math.round(
          rect.width
        );


      const height =
        Math.round(
          rect.height
        );


      if (
        !width ||
        !height
      ) {
        return;
      }


      const dpr =
        Math.min(
          window.devicePixelRatio || 1,
          CONFIG.maxDpr
        );


      if (
        state.width === width &&
        state.height === height &&
        state.dpr === dpr
      ) {
        return;
      }


      state.width =
        width;


      state.height =
        height;


      state.dpr =
        dpr;


      /* ===================================================
         MAIN CANVAS
      =================================================== */

      canvas.width =
        Math.round(
          width *
          dpr
        );


      canvas.height =
        Math.round(
          height *
          dpr
        );


      canvas.style.width =
        width +
        "px";


      canvas.style.height =
        height +
        "px";


      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );


      /* ===================================================
         IDLE CANVAS
      =================================================== */

      idleCanvas.width =
        canvas.width;


      idleCanvas.height =
        canvas.height;


      idleCtx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );


      /* ===================================================
         PRECOMPUTE GRID

         These positions never change unless
         the card resizes.
      =================================================== */

      state.gridX.length =
        0;


      state.gridY.length =
        0;


      for (
        let x = 4;
        x <
        width +
        CONFIG.pitch;
        x += CONFIG.pitch
      ) {

        state.gridX.push(
          x
        );

      }


      for (
        let y = 4;
        y <
        height +
        CONFIG.pitch;
        y += CONFIG.pitch
      ) {

        state.gridY.push(
          y
        );

      }


      drawIdleGrid();


      state.focusX =
        width *
        0.5;


      state.focusY =
        height *
        0.5;


      state.targetX =
        state.focusX;


      state.targetY =
        state.focusY;


      state.dirty =
        true;


      startLoop();

    }


    /* =====================================================
       IDLE GRID

       Drawn ONCE.
    ===================================================== */

    function drawIdleGrid() {

      const radius =
        CONFIG.dotSize /
        2;


      idleCtx.clearRect(
        0,
        0,
        state.width,
        state.height
      );


      idleCtx.fillStyle =
        "rgba(" +
        CONFIG.idleColor[0] +
        "," +
        CONFIG.idleColor[1] +
        "," +
        CONFIG.idleColor[2] +
        "," +
        CONFIG.idleOpacity +
        ")";


      idleCtx.beginPath();


      for (
        let yi = 0;
        yi <
        state.gridY.length;
        yi++
      ) {

        const y =
          state.gridY[
            yi
          ];


        for (
          let xi = 0;
          xi <
          state.gridX.length;
          xi++
        ) {

          const x =
            state.gridX[
              xi
            ];


          idleCtx.moveTo(
            x +
            radius,
            y
          );


          idleCtx.arc(
            x,
            y,
            radius,
            0,
            Math.PI *
            2
          );

        }

      }


      idleCtx.fill();

    }


    /* =====================================================
       POINTER POSITION
    ===================================================== */

    function updatePointer(
      event
    ) {

      const rect =
        surface.getBoundingClientRect();


      if (
        !rect.width ||
        !rect.height
      ) {
        return;
      }


      state.targetX =
        (
          event.clientX -
          rect.left
        ) *
        (
          state.width /
          rect.width
        );


      state.targetY =
        (
          event.clientY -
          rect.top
        ) *
        (
          state.height /
          rect.height
        );


      state.dirty =
        true;


      startLoop();

    }


    /* =====================================================
       POINTER DOWN

       Mobile equivalent of hover entering.
    ===================================================== */

    card.addEventListener(
      "pointerdown",
      function (
        event
      ) {

        state.interacting =
          true;


        updatePointer(
          event
        );


        /*
         * Start exactly where finger lands.
         */
        state.focusX =
          state.targetX;


        state.focusY =
          state.targetY;


        state.targetStrength =
          1;


        state.dirty =
          true;


        startLoop();

      },
      {
        passive: true
      }
    );


    /* =====================================================
       POINTER MOVE
    ===================================================== */

    card.addEventListener(
      "pointermove",
      function (
        event
      ) {

        if (
          !state.interacting
        ) {
          return;
        }


        updatePointer(
          event
        );

      },
      {
        passive: true
      }
    );


    /* =====================================================
       POINTER RELEASE

       Same smooth fade-out as desktop.
    ===================================================== */

    function release() {

      if (
        !state.interacting &&
        state.targetStrength ===
        0
      ) {
        return;
      }


      state.interacting =
        false;


      state.targetStrength =
        0;


      state.dirty =
        true;


      startLoop();

    }


    card.addEventListener(
      "pointerup",
      release,
      {
        passive: true
      }
    );


    card.addEventListener(
      "pointercancel",
      release,
      {
        passive: true
      }
    );


    card.addEventListener(
      "pointerleave",
      release,
      {
        passive: true
      }
    );


    /* =====================================================
       VISIBILITY

       Offscreen cards cost 0 rendering.
    ===================================================== */

    if (
      "IntersectionObserver" in
      window
    ) {

      const observer =
        new IntersectionObserver(
          function (
            entries
          ) {

            if (
              !entries.length
            ) {
              return;
            }


            state.visible =
              entries[0]
                .isIntersecting;


            if (
              state.visible
            ) {

              state.dirty =
                true;


              startLoop();

            }

          },
          {
            rootMargin:
              "100px 0px"
          }
        );


      observer.observe(
        card
      );

    }


    /* =====================================================
       RESIZE
    ===================================================== */

    if (
      "ResizeObserver" in
      window
    ) {

      const resizeObserver =
        new ResizeObserver(
          resize
        );


      resizeObserver.observe(
        surface
      );

    }


    resize();


    states.push(
      state
    );

  }


  /* =========================================================
     RENDER ONE CARD
  ========================================================= */

  function render(
    state
  ) {

    const ctx =
      state.ctx;


    /* =====================================================
       CACHED BEIGE GRID
    ===================================================== */

    ctx.clearRect(
      0,
      0,
      state.width,
      state.height
    );


    ctx.drawImage(
      state.idleCanvas,
      0,
      0,
      state.width,
      state.height
    );


    if (
      state.strength <
      0.002
    ) {
      return;
    }


    const dotRadius =
      CONFIG.dotSize /
      2;


    /* =====================================================
       LIMIT SEARCH TO HOVER AREA
    ===================================================== */

    const minX =
      state.focusX -
      CONFIG.radiusX -
      CONFIG.pitch;


    const maxX =
      state.focusX +
      CONFIG.radiusX +
      CONFIG.pitch;


    const minY =
      state.focusY -
      CONFIG.radiusY -
      CONFIG.pitch;


    const maxY =
      state.focusY +
      CONFIG.radiusY +
      CONFIG.pitch;


    /*
     * Find nearby grid indexes.
     *
     * We never inspect the whole grid.
     */
    const startColumn =
      clamp(
        Math.floor(
          (
            minX -
            4
          ) /
          CONFIG.pitch
        ),
        0,
        state.gridX.length -
        1
      );


    const endColumn =
      clamp(
        Math.ceil(
          (
            maxX -
            4
          ) /
          CONFIG.pitch
        ),
        0,
        state.gridX.length -
        1
      );


    const startRow =
      clamp(
        Math.floor(
          (
            minY -
            4
          ) /
          CONFIG.pitch
        ),
        0,
        state.gridY.length -
        1
      );


    const endRow =
      clamp(
        Math.ceil(
          (
            maxY -
            4
          ) /
          CONFIG.pitch
        ),
        0,
        state.gridY.length -
        1
      );


    /* =====================================================
       OPACITY BUCKETS
    ===================================================== */

    const buckets =
      [];


    for (
      let i = 0;
      i <
      CONFIG.buckets;
      i++
    ) {

      buckets.push(
        []
      );

    }


    /* =====================================================
       BUILD ACTIVE DOTS
    ===================================================== */

    for (
      let row =
        startRow;

      row <=
        endRow;

      row++
    ) {

      const y =
        state.gridY[
          row
        ];


      for (
        let column =
          startColumn;

        column <=
          endColumn;

        column++
      ) {

        const x =
          state.gridX[
            column
          ];


        /*
         * Elliptical normalized distance.
         */
        const dx =
          (
            x -
            state.focusX
          ) /
          CONFIG.radiusX;


        const dy =
          (
            y -
            state.focusY
          ) /
          CONFIG.radiusY;


        const distanceSquared =
          dx *
          dx +
          dy *
          dy;


        if (
          distanceSquared >=
          1
        ) {
          continue;
        }


        /*
         * Only calculate sqrt for dots
         * that are actually inside.
         */
        const distance =
          Math.sqrt(
            distanceSquared
          );


        let intensity =
          smoothstep(
            1 -
            distance
          );


        /*
         * Same visual falloff.
         */
        intensity =
          Math.pow(
            intensity,
            0.75
          );


        intensity *=
          state.strength;


        const bucket =
          clamp(
            Math.floor(
              intensity *
              CONFIG.buckets
            ),
            0,
            CONFIG.buckets -
            1
          );


        buckets[
          bucket
        ].push(
          x,
          y
        );

      }

    }


    /* =====================================================
       DRAW ACTIVE DOTS

       Only 8 canvas fills maximum.
    ===================================================== */

    const TAU =
      Math.PI *
      2;


    for (
      let bucket = 0;
      bucket <
      buckets.length;
      bucket++
    ) {

      const points =
        buckets[
          bucket
        ];


      if (
        !points.length
      ) {
        continue;
      }


      const intensity =
        (
          bucket +
          1
        ) /
        buckets.length;


      ctx.fillStyle =
        "rgba(" +
        CONFIG.activeColor[0] +
        "," +
        CONFIG.activeColor[1] +
        "," +
        CONFIG.activeColor[2] +
        "," +
        intensity.toFixed(
          3
        ) +
        ")";


      ctx.beginPath();


      for (
        let i = 0;
        i <
        points.length;
        i += 2
      ) {

        const x =
          points[i];


        const y =
          points[
            i +
            1
          ];


        ctx.moveTo(
          x +
          dotRadius,
          y
        );


        ctx.arc(
          x,
          y,
          dotRadius,
          0,
          TAU
        );

      }


      ctx.fill();

    }

  }


  /* =========================================================
     UPDATE ONE STATE
  ========================================================= */

  function updateState(
    state,
    delta
  ) {

    if (
      !state.visible
    ) {
      return false;
    }


    let active =
      false;


    /* =====================================================
       CURSOR FOLLOW
    ===================================================== */

    if (
      state.interacting
    ) {

      const follow =
        1 -
        Math.pow(
          1 -
          CONFIG.follow,
          delta /
          16.667
        );


      const dx =
        state.targetX -
        state.focusX;


      const dy =
        state.targetY -
        state.focusY;


      state.focusX +=
        dx *
        follow;


      state.focusY +=
        dy *
        follow;


      if (
        Math.abs(
          dx
        ) >
        0.05 ||
        Math.abs(
          dy
        ) >
        0.05
      ) {

        active =
          true;

      }

    }


    /* =====================================================
       FADE STRENGTH

       No GSAP needed.
    ===================================================== */

    const duration =
      state.targetStrength >
      state.strength
        ?
        CONFIG.enterSpeed
        :
        CONFIG.leaveSpeed;


    const speed =
      1 -
      Math.exp(
        -delta /
        (
          duration *
          1000
        ) *
        5
      );


    const strengthDelta =
      state.targetStrength -
      state.strength;


    state.strength +=
      strengthDelta *
      speed;


    if (
      Math.abs(
        strengthDelta
      ) >
      0.002
    ) {

      active =
        true;

    } else {

      state.strength =
        state.targetStrength;

    }


    if (
      active ||
      state.dirty
    ) {

      render(
        state
      );


      state.dirty =
        false;

    }


    return active;

  }


  /* =========================================================
     SHARED LOOP

     Runs ONLY while an animation is active.
  ========================================================= */

  function loop(
    time
  ) {

    if (
      time -
      lastFrame <
      frameInterval
    ) {

      requestAnimationFrame(
        loop
      );

      return;
    }


    const delta =
      lastFrame
        ?
        Math.min(
          50,
          time -
          lastFrame
        )
        :
        frameInterval;


    lastFrame =
      time;


    let needsAnotherFrame =
      false;


    for (
      let i = 0;
      i <
      states.length;
      i++
    ) {

      if (
        updateState(
          states[i],
          delta
        )
      ) {

        needsAnotherFrame =
          true;

      }

    }


    if (
      needsAnotherFrame
    ) {

      requestAnimationFrame(
        loop
      );

    } else {

      running =
        false;


      lastFrame =
        0;

    }

  }


  function startLoop() {

    if (
      running
    ) {
      return;
    }


    running =
      true;


    lastFrame =
      0;


    requestAnimationFrame(
      loop
    );

  }


  /* =========================================================
     TAB VISIBILITY
  ========================================================= */

  document.addEventListener(
    "visibilitychange",
    function () {

      if (
        !document.hidden
      ) {

        for (
          let i = 0;
          i <
          states.length;
          i++
        ) {

          states[i].dirty =
            true;

        }


        startLoop();

      }

    }
  );


  /* =========================================================
     INIT
  ========================================================= */

  function init() {

    const cards =
      document.querySelectorAll(
        ".data_home .data-item"
      );


    cards.forEach(
      createCard
    );


    /*
     * Initial paint.
     */
    startLoop();

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once: true
      }
    );

  } else {

    init();

  }


  window.__initMobileMetricDots =
    init;

})();
