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
     ELEMENTS
  ========================================================= */

  const canvas =
    document.getElementById(
      "mobile-static-globe-canvas"
    );


  if (!canvas) {
    return;
  }


  const globe =
    canvas.closest(
      ".mobile-static-globe"
    );


  if (!globe) {
    return;
  }


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


  /* =========================================================
     CONFIG
  ========================================================= */

  const CFG = {

    maskUrl:
      "https://cdn.prod.website-files.com/6a67a814b65d1aa8ea328bfd/6a6923ecd2db69732c675f4c_land-mask.png",


    /* -------------------------------------------------------
       LAND DENSITY

       Keep this around 2.35–2.55 for performance.
    ------------------------------------------------------- */

    density:
      2.45,


    /* -------------------------------------------------------
       ROTATION

       Lower = slower.
    ------------------------------------------------------- */

    speed:
      0.000075,


    /* -------------------------------------------------------
       INITIAL CAMERA
    ------------------------------------------------------- */

    yaw:
      25 *
      Math.PI /
      180,


    pitch:
      -8 *
      Math.PI /
      180,


    /* -------------------------------------------------------
       BODY
    ------------------------------------------------------- */

    bodyDark:
      "#19152f",

    bodyDeep:
      "#211b41",

    bodyMid:
      "#302956",

    bodyLight:
      "#504987",


    /* -------------------------------------------------------
       DOT COLORS
    ------------------------------------------------------- */

    dotDark: [
      66,
      59,
      150
    ],


    dotMid: [
      112,
      122,
      195
    ],


    dotLight: [
      221,
      235,
      255
    ],


    dotWarm: [
      255,
      226,
      181
    ],


    /* -------------------------------------------------------
       CYAN RIM
    ------------------------------------------------------- */

    rimBright:
      "rgba(132, 232, 255, 0.92)",

    rimMain:
      "rgba(80, 184, 255, 0.78)",

    rimBlue:
      "rgba(72, 96, 255, 0.38)"

  };


  /* =========================================================
     STATE
  ========================================================= */

  let width =
    0;


  let height =
    0;


  let cx =
    0;


  let cy =
    0;


  let radius =
    0;


  let yaw =
    CFG.yaw;


  let points =
    [];


  let ready =
    false;


  let visible =
    true;


  let lastFrame =
    0;


  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  /* =========================================================
     HELPERS
  ========================================================= */

  function mixColor(
    A,
    B,
    t
  ) {

    return [

      Math.round(
        A[0] +
        (
          B[0] -
          A[0]
        ) *
        t
      ),


      Math.round(
        A[1] +
        (
          B[1] -
          A[1]
        ) *
        t
      ),


      Math.round(
        A[2] +
        (
          B[2] -
          A[2]
        ) *
        t
      )

    ];

  }


  /* =========================================================
     RESIZE
  ========================================================= */

  function resize() {

    const rect =
      globe.getBoundingClientRect();


    if (
      rect.width < 2 ||
      rect.height < 2
    ) {
      return;
    }


    width =
      rect.width;


    height =
      rect.height;


    const dpr =
      Math.min(
        window.devicePixelRatio || 1,
        1.5
      );


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


    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );


    cx =
      width *
      0.5;


    cy =
      height *
      0.5;


    /*
     * Complete circular globe.
     *
     * Change 0.43 to:
     *
     * 0.40 = smaller
     * 0.45 = larger
     */
    radius =
      Math.min(
        width,
        height
      ) *
      0.43;

  }


  resize();


  if (
    "ResizeObserver" in window
  ) {

    const resizeObserver =
      new ResizeObserver(
        resize
      );


    resizeObserver.observe(
      globe
    );

  }


  /* =========================================================
     PAUSE OFFSCREEN
  ========================================================= */

  if (
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(
        function (entries) {

          if (
            !entries.length
          ) {
            return;
          }


          visible =
            entries[0]
              .isIntersecting;

        },
        {
          rootMargin:
            "120px 0px"
        }
      );


    observer.observe(
      globe
    );

  }


  /* =========================================================
     LAND MASK
  ========================================================= */

  const maskImage =
    new Image();


  maskImage.crossOrigin =
    "anonymous";


  maskImage.onload =
    function () {

      const maskCanvas =
        document.createElement(
          "canvas"
        );


      maskCanvas.width =
        maskImage.width;


      maskCanvas.height =
        maskImage.height;


      const maskCtx =
        maskCanvas.getContext(
          "2d"
        );


      if (!maskCtx) {
        return;
      }


      maskCtx.drawImage(
        maskImage,
        0,
        0
      );


      const imageData =
        maskCtx.getImageData(
          0,
          0,
          maskCanvas.width,
          maskCanvas.height
        );


      buildLandPoints(
        imageData.data,
        maskCanvas.width,
        maskCanvas.height
      );


      ready =
        true;

    };


  maskImage.onerror =
    function () {

      console.warn(
        "Mobile globe land mask failed."
      );

    };


  maskImage.src =
    CFG.maskUrl;


  /* =========================================================
     CREATE LAND POINTS
  ========================================================= */

  function buildLandPoints(
    pixels,
    maskWidth,
    maskHeight
  ) {

    points =
      [];


    const DEG =
      Math.PI /
      180;


    let seed =
      829471;


    function random() {

      seed =
        (
          seed *
          16807
        ) %
        2147483647;


      return (
        seed -
        1
      ) /
      2147483646;

    }


    for (
      let lat = -88;
      lat <= 88;
      lat += CFG.density
    ) {

      const latitude =
        lat *
        DEG;


      const cosLat =
        Math.cos(
          latitude
        );


      const sinLat =
        Math.sin(
          latitude
        );


      const maskY =
        Math.min(
          maskHeight - 1,

          Math.max(
            0,

            Math.floor(
              (
                90 -
                lat
              ) /
              180 *
              maskHeight
            )
          )
        );


      for (
        let lon = -180;
        lon < 180;
        lon += CFG.density
      ) {

        const maskX =
          Math.min(
            maskWidth - 1,

            Math.max(
              0,

              Math.floor(
                (
                  lon +
                  180
                ) /
                360 *
                maskWidth
              )
            )
          );


        const pixelIndex =
          (
            maskY *
            maskWidth +
            maskX
          ) *
          4;


        if (
          pixels[
            pixelIndex
          ] <
          120
        ) {
          continue;
        }


        const longitude =
          lon *
          DEG;


        points.push({

          x:
            cosLat *
            Math.cos(
              longitude
            ),


          y:
            sinLat,


          z:
            cosLat *
            Math.sin(
              longitude
            ),


          variation:
            random()

        });

      }

    }

  }


  /* =========================================================
     DRAW BODY
  ========================================================= */

  function drawBody() {

    /* -------------------------------------------------------
       MAIN DARK PURPLE BODY
    ------------------------------------------------------- */

    const bodyGradient =
      ctx.createRadialGradient(

        cx -
        radius *
        0.32,

        cy -
        radius *
        0.36,

        radius *
        0.025,

        cx +
        radius *
        0.08,

        cy +
        radius *
        0.10,

        radius *
        1.04

      );


    bodyGradient.addColorStop(
      0,
      CFG.bodyLight
    );


    bodyGradient.addColorStop(
      0.22,
      "#433c78"
    );


    bodyGradient.addColorStop(
      0.48,
      CFG.bodyMid
    );


    bodyGradient.addColorStop(
      0.72,
      CFG.bodyDeep
    );


    bodyGradient.addColorStop(
      1,
      CFG.bodyDark
    );


    ctx.beginPath();


    ctx.arc(
      cx,
      cy,
      radius,
      0,
      Math.PI *
      2
    );


    ctx.fillStyle =
      bodyGradient;


    ctx.fill();


    /* -------------------------------------------------------
       INTERNAL BLUE LIGHT
    ------------------------------------------------------- */

    ctx.save();


    ctx.globalCompositeOperation =
      "screen";


    const internalLight =
      ctx.createRadialGradient(

        cx -
        radius *
        0.27,

        cy -
        radius *
        0.34,

        0,

        cx -
        radius *
        0.12,

        cy -
        radius *
        0.15,

        radius *
        0.92

      );


    internalLight.addColorStop(
      0,
      "rgba(105, 116, 255, 0.16)"
    );


    internalLight.addColorStop(
      0.33,
      "rgba(91, 97, 239, 0.08)"
    );


    internalLight.addColorStop(
      0.70,
      "rgba(76, 77, 215, 0.025)"
    );


    internalLight.addColorStop(
      1,
      "rgba(76, 77, 215, 0)"
    );


    ctx.beginPath();


    ctx.arc(
      cx,
      cy,
      radius *
      0.985,
      0,
      Math.PI *
      2
    );


    ctx.fillStyle =
      internalLight;


    ctx.fill();


    ctx.restore();

  }


  /* =========================================================
     DRAW ATMOSPHERE / RIM
  ========================================================= */

  function drawAtmosphere() {

    ctx.save();


    ctx.globalCompositeOperation =
      "screen";


    /* -------------------------------------------------------
       SOFT BLUE BLOOM
    ------------------------------------------------------- */

    ctx.beginPath();


    ctx.arc(
      cx,
      cy,
      radius *
      1.006,
      0,
      Math.PI *
      2
    );


    ctx.strokeStyle =
      "rgba(61, 79, 255, 0.14)";


    ctx.lineWidth =
      Math.max(
        5,
        radius *
        0.027
      );


    ctx.stroke();


    /* -------------------------------------------------------
       GRADIENT CYAN EDGE
    ------------------------------------------------------- */

    const rim =
      ctx.createLinearGradient(

        cx -
        radius,
        cy -
        radius,

        cx +
        radius,
        cy +
        radius

      );


    rim.addColorStop(
      0,
      CFG.rimBright
    );


    rim.addColorStop(
      0.22,
      CFG.rimMain
    );


    rim.addColorStop(
      0.52,
      CFG.rimBlue
    );


    rim.addColorStop(
      0.76,
      "rgba(78, 114, 255, 0.46)"
    );


    rim.addColorStop(
      1,
      "rgba(104, 209, 255, 0.72)"
    );


    ctx.beginPath();


    ctx.arc(
      cx,
      cy,
      radius *
      0.998,
      0,
      Math.PI *
      2
    );


    ctx.strokeStyle =
      rim;


    ctx.lineWidth =
      Math.max(
        1,
        radius *
        0.006
      );


    ctx.stroke();


    /* -------------------------------------------------------
       BRIGHT CYAN HIGHLIGHT
    ------------------------------------------------------- */

    ctx.beginPath();


    ctx.arc(
      cx,
      cy,
      radius *
      0.987,

      Math.PI *
      0.88,

      Math.PI *
      1.73
    );


    ctx.strokeStyle =
      "rgba(145, 237, 255, 0.58)";


    ctx.lineWidth =
      Math.max(
        0.6,
        radius *
        0.0027
      );


    ctx.stroke();


    ctx.restore();

  }


  /* =========================================================
     TECHNICAL ORBIT LINES
  ========================================================= */

  function drawOrbitLines() {

    ctx.save();


    ctx.globalCompositeOperation =
      "screen";


    ctx.lineWidth =
      Math.max(
        0.5,
        radius *
        0.0016
      );


    /* -------------------------------------------------------
       ORBIT 1
    ------------------------------------------------------- */

    ctx.strokeStyle =
      "rgba(124, 151, 255, 0.11)";


    ctx.beginPath();


    ctx.ellipse(
      cx,
      cy,

      radius *
      1.08,

      radius *
      0.50,

      -0.23,

      0,

      Math.PI *
      2
    );


    ctx.stroke();


    /* -------------------------------------------------------
       ORBIT 2
    ------------------------------------------------------- */

    ctx.strokeStyle =
      "rgba(137, 212, 255, 0.075)";


    ctx.beginPath();


    ctx.ellipse(
      cx,
      cy,

      radius *
      1.04,

      radius *
      0.65,

      0.17,

      0,

      Math.PI *
      2
    );


    ctx.stroke();


    ctx.restore();

  }


  /* =========================================================
     DRAW LAND
  ========================================================= */

  function drawLand() {

    const cosYaw =
      Math.cos(
        yaw
      );


    const sinYaw =
      Math.sin(
        yaw
      );


    const cosPitch =
      Math.cos(
        CFG.pitch
      );


    const sinPitch =
      Math.sin(
        CFG.pitch
      );


    for (
      let i = 0;
      i < points.length;
      i++
    ) {

      const point =
        points[i];


      /* -----------------------------------------------------
         ROTATE YAW
      ----------------------------------------------------- */

      const x1 =
        point.x *
        cosYaw +
        point.z *
        sinYaw;


      const z1 =
        -point.x *
        sinYaw +
        point.z *
        cosYaw;


      /* -----------------------------------------------------
         ROTATE PITCH
      ----------------------------------------------------- */

      const y2 =
        point.y *
        cosPitch -
        z1 *
        sinPitch;


      const z2 =
        point.y *
        sinPitch +
        z1 *
        cosPitch;


      /*
       * Hide rear hemisphere.
       */
      if (
        z2 <=
        0.015
      ) {
        continue;
      }


      const screenX =
        cx +
        x1 *
        radius;


      const screenY =
        cy -
        y2 *
        radius;


      /* -----------------------------------------------------
         FIGMA-LIKE LIGHTING

         Top-left/cyan side gets much brighter.
         Shadow side stays dark purple.
      ----------------------------------------------------- */

      let light =
        (
          x1 *
          -0.25 +

          y2 *
          0.44 +

          z2 *
          1.02 +

          0.20
        ) /
        1.30;


      light =
        Math.max(
          0.045,

          Math.min(
            1,
            light
          )
        );


      /* -----------------------------------------------------
         COLOR
      ----------------------------------------------------- */

      let color;


      if (
        light <
        0.42
      ) {

        color =
          mixColor(
            CFG.dotDark,
            CFG.dotMid,
            light /
            0.42
          );

      } else {

        color =
          mixColor(
            CFG.dotMid,
            CFG.dotLight,
            (
              light -
              0.42
            ) /
            0.58
          );

      }


      /*
       * Very occasional warm pixels,
       * like the Figma globe.
       */
      if (
        point.variation >
        0.94 &&
        light >
        0.45
      ) {

        color =
          mixColor(
            color,
            CFG.dotWarm,
            0.30
          );

      }


      /* -----------------------------------------------------
         EDGE FADE
      ----------------------------------------------------- */

      const edgeFade =
        Math.min(
          1,
          z2 *
          4.2
        );


      const alpha =
        (
          0.11 +
          0.89 *
          edgeFade *
          Math.pow(
            light,
            0.78
          )
        );


      /* -----------------------------------------------------
         DOT SIZE

         Bright points slightly larger.
      ----------------------------------------------------- */

      const dotSize =
        Math.max(
          0.50,

          radius *
          (
            0.00255 +
            light *
            0.00118
          )
        );


      /* -----------------------------------------------------
         DRAW DOT
      ----------------------------------------------------- */

      ctx.beginPath();


      ctx.arc(
        screenX,
        screenY,
        dotSize,
        0,
        Math.PI *
        2
      );


      ctx.fillStyle =
        "rgba(" +
        color[0] +
        "," +
        color[1] +
        "," +
        color[2] +
        "," +
        alpha.toFixed(
          3
        ) +
        ")";


      ctx.fill();


      /* -----------------------------------------------------
         SELECTIVE MICRO BLOOM

         Only a tiny number of bright pixels bloom.
         Keeps performance good.
      ----------------------------------------------------- */

      if (
        light >
        0.87 &&
        point.variation >
        0.84
      ) {

        ctx.save();


        ctx.globalCompositeOperation =
          "lighter";


        ctx.beginPath();


        ctx.arc(
          screenX,
          screenY,

          dotSize *
          2.2,

          0,

          Math.PI *
          2
        );


        ctx.fillStyle =
          "rgba(124, 210, 255, 0.045)";


        ctx.fill();


        ctx.restore();

      }

    }

  }


  /* =========================================================
     SMALL DATA NODES
  ========================================================= */

  function drawNodes() {

    const nodePositions = [

      {
        x: -0.36,
        y: -0.12,
        strength: 1
      },

      {
        x: 0.14,
        y: 0.03,
        strength: 0.75
      },

      {
        x: 0.38,
        y: -0.27,
        strength: 0.85
      }

    ];


    ctx.save();


    ctx.globalCompositeOperation =
      "screen";


    nodePositions.forEach(
      function (node) {

        const x =
          cx +
          node.x *
          radius;


        const y =
          cy +
          node.y *
          radius;


        const glowRadius =
          radius *
          0.035 *
          node.strength;


        const glow =
          ctx.createRadialGradient(

            x,
            y,
            0,

            x,
            y,
            glowRadius

          );


        glow.addColorStop(
          0,
          "rgba(138, 255, 228, 0.75)"
        );


        glow.addColorStop(
          0.25,
          "rgba(100, 237, 218, 0.28)"
        );


        glow.addColorStop(
          1,
          "rgba(100, 237, 218, 0)"
        );


        ctx.beginPath();


        ctx.arc(
          x,
          y,
          glowRadius,
          0,
          Math.PI *
          2
        );


        ctx.fillStyle =
          glow;


        ctx.fill();


        ctx.beginPath();


        ctx.arc(
          x,
          y,

          Math.max(
            1,
            radius *
            0.0048
          ),

          0,

          Math.PI *
          2
        );


        ctx.fillStyle =
          "rgba(139, 250, 226, 0.86)";


        ctx.fill();

      }
    );


    ctx.restore();

  }


  /* =========================================================
     MAIN RENDER LOOP
  ========================================================= */

  function draw(
    time
  ) {

    requestAnimationFrame(
      draw
    );


    if (
      !ready ||
      !visible ||
      width <
      2
    ) {
      return;
    }


    /*
     * Roughly 30fps.
     *
     * Good compromise for mobile.
     */
    if (
      time -
      lastFrame <
      32
    ) {
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
        16;


    lastFrame =
      time;


    /* -------------------------------------------------------
       ROTATE
    ------------------------------------------------------- */

    if (
      !prefersReducedMotion
    ) {

      yaw +=
        delta *
        CFG.speed;

    }


    /* -------------------------------------------------------
       CLEAR
    ------------------------------------------------------- */

    ctx.clearRect(
      0,
      0,
      width,
      height
    );


    /* -------------------------------------------------------
       RENDER ORDER
    ------------------------------------------------------- */

    drawOrbitLines();

    drawBody();

    drawLand();

    drawNodes();

    drawAtmosphere();

  }


  /* =========================================================
     START
  ========================================================= */

  requestAnimationFrame(
    draw
  );

})();
