(function () {
  "use strict";

  const mobile =
    window.matchMedia(
      "(max-width: 767px)"
    ).matches;


  /* =========================================================
     CONFIG
  ========================================================= */

  const CONFIG = {

    dotSize:
      4.5,

    pitch:
      8,


    idle: [
      221,
      209,
      191
    ],

    idleOpacity:
      0.40,


    active: [
      99,
      116,
      243
    ],


    radiusX:
      122,

    radiusY:
      84,


    follow:
      0.21,


    enterSpeed:
      0.18,

    leaveSpeed:
      0.30,


    /*
     * Desktop keeps quality.
     * Mobile renders lighter.
     */
    maxDpr:
      mobile
        ? 1.25
        : 1.5,


    /*
     * Desktop smooth.
     * Mobile lighter.
     */
    fps:
      mobile
        ? 30
        : 60,


    /*
     * Same smooth opacity effect.
     */
    buckets:
      mobile
        ? 8
        : 12

  };


  /* =========================================================
     GLOBAL
  ========================================================= */

  const states =
    [];


  let raf =
    0;


  let lastTime =
    0;


  const frameInterval =
    1000 /
    CONFIG.fps;


  const TAU =
    Math.PI *
    2;


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


  function startLoop() {

    if (!raf) {

      raf =
        requestAnimationFrame(
          loop
        );

    }

  }


  /* =========================================================
     POINTER
  ========================================================= */

  function updatePointer(
    state,
    event
  ) {

    const rect =
      state.surface
        .getBoundingClientRect();


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


  /* =========================================================
     CREATE CARD
  ========================================================= */

  function buildCard(
    card
  ) {

    if (
      card.__metricDotsReady
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


    card.__metricDotsReady =
      true;


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


      focusX:
        0,

      focusY:
        0,

      targetX:
        0,

      targetY:
        0,


      strength:
        0,

      targetStrength:
        0,


      hovering:
        false,

      touching:
        false,

      visible:
        true,

      dirty:
        true,


      releaseTimer:
        0,


      gridX:
        [],

      gridY:
        [],


      buckets:
        Array.from(
          {
            length:
              CONFIG.buckets
          },
          function () {
            return [];
          }
        )

    };


    states.push(
      state
    );


    /* =====================================================
       IDLE DOT GRID
    ===================================================== */

    function drawIdle() {

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
        CONFIG.idle[0] +
        "," +
        CONFIG.idle[1] +
        "," +
        CONFIG.idle[2] +
        "," +
        CONFIG.idleOpacity +
        ")";


      idleCtx.beginPath();


      for (
        let yIndex = 0;
        yIndex <
        state.gridY.length;
        yIndex++
      ) {

        const y =
          state.gridY[
            yIndex
          ];


        for (
          let xIndex = 0;
          xIndex <
          state.gridX.length;
          xIndex++
        ) {

          const x =
            state.gridX[
              xIndex
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
            TAU
          );

        }

      }


      idleCtx.fill();

  }


    /* =====================================================
       RESIZE
    ===================================================== */

    function resize() {

      const rect =
        surface
          .getBoundingClientRect();


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


      drawIdle();


      state.focusX =
        state.targetX =
          width *
          0.5;


      state.focusY =
        state.targetY =
          height *
          0.5;


      state.dirty =
        true;


      startLoop();

    }


    /* =====================================================
       DESKTOP STRENGTH

       Uses your existing GSAP when available,
       preserving the desktop feel.
    ===================================================== */

    function desktopStrength(
      value,
      duration
    ) {

      state.targetStrength =
        value;


      if (
        window.gsap
      ) {

        window.gsap
          .killTweensOf(
            state,
            "strength"
          );


        window.gsap.to(
          state,
          {

            strength:
              value,

            duration:
              duration,

            ease:
              "power2.out",

            overwrite:
              true,

            onUpdate:
              function () {

                state.dirty =
                  true;


                startLoop();

              }

          }
        );

      } else {

        state.dirty =
          true;


        startLoop();

      }

    }


    /* =====================================================
       DESKTOP
    ===================================================== */

    if (!mobile) {

      card.addEventListener(
        "pointerenter",
        function (
          event
        ) {

          state.hovering =
            true;


          updatePointer(
            state,
            event
          );


          state.focusX =
            state.targetX;


          state.focusY =
            state.targetY;


          desktopStrength(
            1,
            CONFIG.enterSpeed
          );

        }
      );


      card.addEventListener(
        "pointermove",
        function (
          event
        ) {

          if (
            !state.hovering
          ) {
            return;
          }


          updatePointer(
            state,
            event
          );

        }
      );


      card.addEventListener(
        "pointerleave",
        function () {

          state.hovering =
            false;


          desktopStrength(
            0,
            CONFIG.leaveSpeed
          );

        }
      );

    }


    /* =====================================================
       MOBILE

       Same visual blue region,
       follows finger.
    ===================================================== */

    else {

      card.addEventListener(
        "pointerdown",
        function (
          event
        ) {

          clearTimeout(
            state.releaseTimer
          );


          state.touching =
            true;


          updatePointer(
            state,
            event
          );


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
          passive:
            true
        }
      );


      card.addEventListener(
        "pointermove",
        function (
          event
        ) {

          if (
            !state.touching
          ) {
            return;
          }


          updatePointer(
            state,
            event
          );

        },
        {
          passive:
            true
        }
      );


      function release() {

        state.touching =
          false;


        clearTimeout(
          state.releaseTimer
        );


        /*
         * Small linger so a tap
         * is actually visible.
         */
        state.releaseTimer =
          setTimeout(
            function () {

              state.targetStrength =
                0;


              state.dirty =
                true;


              startLoop();

            },
            120
          );

      }


      card.addEventListener(
        "pointerup",
        release,
        {
          passive:
            true
        }
      );


      card.addEventListener(
        "pointercancel",
        release,
        {
          passive:
            true
        }
      );


      card.addEventListener(
        "pointerleave",
        release,
        {
          passive:
            true
        }
      );

    }


    /* =====================================================
       RESIZE OBSERVER
    ===================================================== */

    if (
      "ResizeObserver" in
      window
    ) {

      new ResizeObserver(
        resize
      ).observe(
        surface
      );

    } else {

      window.addEventListener(
        "resize",
        resize,
        {
          passive:
            true
        }
      );

    }


    /* =====================================================
       VISIBILITY

       Cards offscreen stop rendering.
    ===================================================== */

    if (
      "IntersectionObserver" in
      window
    ) {

      new IntersectionObserver(
        function (
          entries
        ) {

          state.visible =
            !!entries[0]
              ?.isIntersecting;


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
      ).observe(
        card
      );

    }


    resize();

  }


  /* =========================================================
     DRAW CARD
  ========================================================= */

  function renderState(
    state
  ) {

    const ctx =
      state.ctx;


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
      state.strength <=
      0.001
    ) {
      return;
    }


    const dotRadius =
      CONFIG.dotSize /
      2;


    /* =====================================================
       LIMIT TO ACTIVE REGION
    ===================================================== */

    const startColumn =
      clamp(

        Math.floor(
          (
            state.focusX -
            CONFIG.radiusX -
            CONFIG.pitch -
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
            state.focusX +
            CONFIG.radiusX +
            CONFIG.pitch -
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
            state.focusY -
            CONFIG.radiusY -
            CONFIG.pitch -
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
            state.focusY +
            CONFIG.radiusY +
            CONFIG.pitch -
            4
          ) /
          CONFIG.pitch
        ),

        0,

        state.gridY.length -
        1

      );


    /* =====================================================
       CLEAR BUCKETS

       Arrays are reused every frame.
    ===================================================== */

    for (
      let bucket = 0;
      bucket <
      state.buckets.length;
      bucket++
    ) {

      state.buckets[
        bucket
      ].length =
        0;

    }


    /* =====================================================
       BUILD ACTIVE DOT REGION
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


        let intensity =
          smoothstep(
            1 -
            Math.sqrt(
              distanceSquared
            )
          );


        intensity =
          Math.pow(
            intensity,
            0.75
          ) *
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


        state.buckets[
          bucket
        ].push(
          x,
          y
        );

      }

    }


    /* =====================================================
       DRAW ACTIVE DOTS
    ===================================================== */

    for (
      let bucket = 0;
      bucket <
      state.buckets.length;
      bucket++
    ) {

      const points =
        state.buckets[
          bucket
        ];


      if (
        !points.length
      ) {
        continue;
      }


      const alpha =
        (
          bucket +
          1
        ) /
        state.buckets.length;


      ctx.fillStyle =
        "rgba(" +
        CONFIG.active[0] +
        "," +
        CONFIG.active[1] +
        "," +
        CONFIG.active[2] +
        "," +
        alpha.toFixed(
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
     UPDATE
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


    let animating =
      false;


    const following =
      mobile
        ?
        state.touching
        :
        state.hovering;


    /* =====================================================
       FOLLOW POINTER
    ===================================================== */

    if (
      following
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

        animating =
          true;

      }

    }


    /* =====================================================
       MOBILE FADE

       Desktop uses GSAP if available.
    ===================================================== */

    if (
      mobile ||
      !window.gsap
    ) {

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
          (
            -5 *
            delta
          ) /
          (
            duration *
            1000
          )
        );


      const difference =
        state.targetStrength -
        state.strength;


      state.strength +=
        difference *
        speed;


      if (
        Math.abs(
          difference
        ) >
        0.002
      ) {

        animating =
          true;

      } else {

        state.strength =
          state.targetStrength;

      }

    } else if (

      Math.abs(
        state.targetStrength -
        state.strength
      ) >
      0.002

    ) {

      animating =
        true;

    }


    if (
      animating ||
      state.dirty
    ) {

      renderState(
        state
      );


      state.dirty =
        false;

    }


    return animating;

  }


  /* =========================================================
     SHARED RAF
  ========================================================= */

  function loop(
    time
  ) {

    raf =
      0;


    if (
      time -
      lastTime <
      frameInterval
    ) {

      raf =
        requestAnimationFrame(
          loop
        );


      return;

    }


    const delta =
      lastTime
        ?
        Math.min(
          50,
          time -
          lastTime
        )
        :
        frameInterval;


    lastTime =
      time;


    let keepRunning =
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

        keepRunning =
          true;

      }

    }


    if (
      keepRunning ||
      states.some(
        function (
          state
        ) {
          return state.dirty;
        }
      )
    ) {

      raf =
        requestAnimationFrame(
          loop
        );

    } else {

      lastTime =
        0;

    }

  }


  /* =========================================================
     INIT
  ========================================================= */

  function init() {

    document
      .querySelectorAll(
        ".data_home .data-item"
      )
      .forEach(
        buildCard
      );


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
        once:
          true
      }
    );

  } else {

    init();

  }


  window.__initMetricDots =
    init;

})();
