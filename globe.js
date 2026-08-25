<script>
(function () {
  "use strict";


  /* =======================================================
     01 — CONFIGURATION
  ======================================================= */

  var CONFIG = {

    maskUrl:
      "https://cdn.prod.website-files.com/6a67a814b65d1aa8ea328bfd/6a6923ecd2db69732c675f4c_land-mask.png",


    /*
     * Globe position at each section.
     *
     * cx / cy = viewport position
     * r       = globe radius
     * yaw     = horizontal rotation
     * pitch   = vertical rotation
     */

    positions: {

      hero: {
        selector: '[data-globe="1"]',

        cx: 0.50,
        cy: 1.13,

        radius: 0.50,

        yaw: 20,
        pitch: -10
      },

      stats: {
        selector: '[data-globe="2"]',

        cx: 0.12,
        cy: 0.72,

        radius: 0.40,

        yaw: 110,
        pitch: 14
      }

    },


    maxDpr: 2,


    /* Globe rotation speed */

    spinSpeed: 0.00072,


    /* Mouse dragging */

    drag: true,


    /* Globe surface */

    density: 0.75,

    dotSize: 1.1,

    dotDark: [65, 48, 146],

    dotLight: [217, 224, 255],


    /* Arcs */

    arcColor: [145, 231, 255],

    arcAlpha: 0.48,

    arcHeight: 0.16,


    /* Small markers */

    markerColor: [125, 250, 214],


    /*
     * Glow colours.
     *
     * Scroll begins warm.
     * As globe moves left it becomes blue.
     */

    glow: {

      offsetX: 0.30,

      offsetY: -0.62,

      size: 1.12,


      warm: {
        core: [255, 236, 166],
        middle: [255, 178, 103],
        edge: [239, 120, 92]
      },


      cool: {
        core: [177, 201, 255],
        middle: [86, 116, 255],
        edge: [49, 59, 204]
      }

    },


    /* Globe locations / warnings */

    markers: [

      {
        loc: [50.1109, 8.6821],
        severity: "warning",
        label: "Leaked credentials"
      },

      {
        loc: [51.5074, -0.1278],
        severity: "alert",
        label: "Exposed bucket"
      },

      {
        loc: [25.2048, 55.2708],
        severity: "alert",
        label: "Unpatched CVE"
      },

      {
        loc: [33.6844, 73.0479],
        severity: "warning",
        label: "Open RDP port"
      },

      {
        loc: [1.3521, 103.8198],
        severity: "alert",
        label: "Weak TLS config"
      },

      {
        loc: [40.7128, -74.0060],
        severity: "low"
      },

      {
        loc: [35.6762, 139.6503],
        severity: "low"
      },

      {
        loc: [-33.8688, 151.2093],
        severity: "low"
      },

      {
        loc: [-23.5505, -46.6333],
        severity: "low"
      },

      {
        loc: [6.5244, 3.3792],
        severity: "low"
      }

    ],


    arcs: [

      [
        [50.1109, 8.6821],
        [40.7128, -74.0060]
      ],

      [
        [33.6844, 73.0479],
        [51.5074, -0.1278]
      ],

      [
        [25.2048, 55.2708],
        [35.6762, 139.6503]
      ],

      [
        [1.3521, 103.8198],
        [-33.8688, 151.2093]
      ]

    ]

  };



  /* =======================================================
     02 — ELEMENTS
  ======================================================= */

  var canvas =
    document.getElementById("sp-globe");

  var pinLayer =
    document.getElementById("sp-pins");

  var glow =
    document.getElementById("sp-globe-glow");


  if (!canvas) return;


  var ctx =
    canvas.getContext("2d");



  /* =======================================================
     03 — ICONS
  ======================================================= */

  var ICONS = {

    alert:
      '<svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<circle cx="9.0865" cy="9.0865" r="7.5721" fill="#F06A45"/>' +
        '<path d="M9.0865 6.05V9.08" stroke="#17171B" stroke-width="1.5" stroke-linecap="round"/>' +
        '<circle cx="9.0865" cy="12.11" r=".75" fill="#17171B"/>' +
      '</svg>',


    warning:
      '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M10.15 3.81L1.79 17.75C1.03 19.07 1.98 20.71 3.48 20.71H20.19C21.69 20.71 22.64 19.07 21.87 17.75L13.52 3.81C12.76 2.54 10.91 2.54 10.15 3.81Z" fill="#F04554"/>' +
        '<path d="M11.83 8.88V12.82" stroke="#2D234B" stroke-width="1.97" stroke-linecap="round"/>' +
        '<circle cx="11.83" cy="16.76" r=".95" fill="#2D234B"/>' +
      '</svg>'

  };



  /* =======================================================
     04 — VIEWPORT STATE
  ======================================================= */

  var DPR = Math.min(
    window.devicePixelRatio || 1,
    CONFIG.maxDpr
  );


  var VW = 0;
  var VH = 0;


  var globeX = 0;
  var globeY = 0;
  var globeRadius = 0;


  var scrollYaw = 0;
  var scrollPitch = 0;


  /*
   * 0 = hero
   * 1 = second section
   */

  var moveProgress = 0;



  /* =======================================================
     05 — SCROLL ANCHORS
  ======================================================= */

  var heroAnchor = 0;
  var statsAnchor = 1;


  function measureSections() {

    var hero =
      document.querySelector(
        CONFIG.positions.hero.selector
      );


    var stats =
      document.querySelector(
        CONFIG.positions.stats.selector
      );


    if (!hero || !stats) return;


    var heroTop =
      hero.getBoundingClientRect().top +
      window.pageYOffset;


    var statsTop =
      stats.getBoundingClientRect().top +
      window.pageYOffset;


    heroAnchor =
      heroTop;


    statsAnchor =
      statsTop;
  }



  /* =======================================================
     06 — HELPERS
  ======================================================= */

  function clamp(value, min, max) {

    return Math.max(
      min,
      Math.min(max, value)
    );

  }


  function lerp(a, b, amount) {

    return (
      a +
      (b - a) *
      amount
    );

  }


  function smoothstep(value) {

    return (
      value *
      value *
      (3 - 2 * value)
    );

  }


  function lerpColor(a, b, amount) {

    return [

      Math.round(
        lerp(a[0], b[0], amount)
      ),

      Math.round(
        lerp(a[1], b[1], amount)
      ),

      Math.round(
        lerp(a[2], b[2], amount)
      )

    ];

  }


  function rgb(color) {

    return (
      color[0] +
      "," +
      color[1] +
      "," +
      color[2]
    );

  }



  /* =======================================================
     07 — LAT/LONG → 3D VECTOR
  ======================================================= */

  function latLonToVector(lat, lon) {

    var latitude =
      lat * Math.PI / 180;

    var longitude =
      lon * Math.PI / 180;


    return [

      Math.cos(latitude) *
      Math.cos(longitude),

      Math.sin(latitude),

      Math.cos(latitude) *
      Math.sin(longitude)

    ];

  }



  /* =======================================================
     08 — LAND DOT DATA
  ======================================================= */

  var DOT_X = null;
  var DOT_Y = null;
  var DOT_Z = null;

  var DOT_COUNT = 0;

  var landReady = false;


  function buildLandDots(
    pixels,
    width,
    height
  ) {

    var xs = [];
    var ys = [];
    var zs = [];


    var step =
      CONFIG.density;


    for (
      var lat = -89;
      lat <= 89;
      lat += step
    ) {

      var latitude =
        lat * Math.PI / 180;


      var cosLat =
        Math.cos(latitude);


      var sinLat =
        Math.sin(latitude);


      var imageY =
        Math.floor(
          (90 - lat) / 180 *
          height
        );


      imageY =
        clamp(
          imageY,
          0,
          height - 1
        );


      for (
        var lon = -180;
        lon < 180;
        lon += step
      ) {

        var imageX =
          Math.floor(
            (lon + 180) / 360 *
            width
          );


        imageX =
          clamp(
            imageX,
            0,
            width - 1
          );


        var pixelIndex =
          (
            imageY *
            width +
            imageX
          ) * 4;


        /*
         * Black = ocean
         * White = land
         */

        if (
          pixels[pixelIndex] < 128
        ) {
          continue;
        }


        var longitude =
          lon * Math.PI / 180;


        xs.push(
          cosLat *
          Math.cos(longitude)
        );


        ys.push(
          sinLat
        );


        zs.push(
          cosLat *
          Math.sin(longitude)
        );

      }

    }


    DOT_X =
      Float32Array.from(xs);

    DOT_Y =
      Float32Array.from(ys);

    DOT_Z =
      Float32Array.from(zs);


    DOT_COUNT =
      xs.length;


    landReady = true;

  }



  function loadLandMask() {

    var image =
      new Image();


    image.crossOrigin =
      "anonymous";


    image.onload =
      function () {

        var mask =
          document.createElement(
            "canvas"
          );


        mask.width =
          image.width;

        mask.height =
          image.height;


        var maskCtx =
          mask.getContext("2d");


        maskCtx.drawImage(
          image,
          0,
          0
        );


        var imageData =
          maskCtx.getImageData(
            0,
            0,
            image.width,
            image.height
          );


        buildLandDots(
          imageData.data,
          image.width,
          image.height
        );

      };


    image.onerror =
      function () {

        console.warn(
          "Security+ globe land mask failed to load."
        );

      };


    image.src =
      CONFIG.maskUrl;

  }



  /* =======================================================
     09 — BUILD CONNECTION ARCS
  ======================================================= */

  var ARC_POINTS = [];


  function buildArcs() {

    ARC_POINTS =
      CONFIG.arcs.map(
        function (arc) {

          var start =
            latLonToVector(
              arc[0][0],
              arc[0][1]
            );


          var end =
            latLonToVector(
              arc[1][0],
              arc[1][1]
            );


          var dot =
            clamp(
              start[0] * end[0] +
              start[1] * end[1] +
              start[2] * end[2],
              -1,
              1
            );


          var angle =
            Math.acos(dot);


          var points = [];


          for (
            var i = 0;
            i <= 60;
            i++
          ) {

            var progress =
              i / 60;


            var point;


            if (angle < 0.00001) {

              point =
                start.slice();

            } else {

              var sinAngle =
                Math.sin(angle);


              var a =
                Math.sin(
                  (1 - progress) *
                  angle
                ) /
                sinAngle;


              var b =
                Math.sin(
                  progress *
                  angle
                ) /
                sinAngle;


              point = [

                start[0] * a +
                end[0] * b,

                start[1] * a +
                end[1] * b,

                start[2] * a +
                end[2] * b

              ];

            }


            var lift =
              1 +
              CONFIG.arcHeight *
              Math.sin(
                progress *
                Math.PI
              );


            points.push([

              point[0] * lift,

              point[1] * lift,

              point[2] * lift

            ]);

          }


          return points;

        }
      );

  }



  /* =======================================================
     10 — BUILD HTML PINS
  ======================================================= */

  var pinElements = [];


  function buildPins() {

    if (!pinLayer) return;


    pinLayer.innerHTML = "";


    pinElements =
      CONFIG.markers.map(
        function (marker) {

          /*
           * Low markers are rendered directly
           * onto the canvas.
           */

          if (
            marker.severity === "low"
          ) {
            return null;
          }


          var pin =
            document.createElement(
              "div"
            );


          pin.className =
            "sp-pin sp-pin--" +
            marker.severity;


          var icon =
            ICONS[
              marker.severity
            ] ||
            ICONS.alert;


          pin.innerHTML =
            '<div class="sp-pin__dot">' +
              icon +
            '</div>' +

            (
              marker.label
                ?
                '<div class="sp-pin__tag">' +
                  marker.label +
                '</div>'
                :
                ""
            );


          pinLayer.appendChild(
            pin
          );


          return pin;

        }
      );

  }



  /* =======================================================
     11 — RESIZE
  ======================================================= */

  function resize() {

    var width =
      window.innerWidth;

    var height =
      window.innerHeight;


    if (
      width === VW &&
      height === VH
    ) {
      return;
    }


    VW = width;
    VH = height;


    DPR =
      Math.min(
        window.devicePixelRatio || 1,
        CONFIG.maxDpr
      );


    canvas.width =
      Math.round(
        VW * DPR
      );


    canvas.height =
      Math.round(
        VH * DPR
      );


    canvas.style.width =
      VW + "px";


    canvas.style.height =
      VH + "px";


    ctx.setTransform(
      DPR,
      0,
      0,
      DPR,
      0,
      0
    );


    measureSections();

  }



  /* =======================================================
     12 — SAMPLE SCROLL
  ======================================================= */

  function sampleScroll() {

    var scroll =
      window.pageYOffset;


    var range =
      Math.max(
        1,
        statsAnchor -
        heroAnchor
      );


    var progress =
      clamp(
        (
          scroll -
          heroAnchor
        ) /
        range,
        0,
        1
      );


    progress =
      smoothstep(progress);


    moveProgress =
      progress;


    var hero =
      CONFIG.positions.hero;


    var stats =
      CONFIG.positions.stats;


    globeX =
      lerp(
        hero.cx,
        stats.cx,
        progress
      ) *
      VW;


    globeY =
      lerp(
        hero.cy,
        stats.cy,
        progress
      ) *
      VH;


    globeRadius =
      lerp(
        hero.radius,
        stats.radius,
        progress
      ) *
      Math.min(
        VW,
        VH
      );


    scrollYaw =
      lerp(
        hero.yaw,
        stats.yaw,
        progress
      ) *
      Math.PI /
      180;


    scrollPitch =
      lerp(
        hero.pitch,
        stats.pitch,
        progress
      ) *
      Math.PI /
      180;

  }



  /* =======================================================
     13 — GLOW
  ======================================================= */

  function renderGlow() {

    if (!glow) return;


    var glowConfig =
      CONFIG.glow;


    var warm =
      glowConfig.warm;


    var cool =
      glowConfig.cool;


    /*
     * This is where the actual
     * yellow → blue transition happens.
     */

    var core =
      lerpColor(
        warm.core,
        cool.core,
        moveProgress
      );


    var middle =
      lerpColor(
        warm.middle,
        cool.middle,
        moveProgress
      );


    var edge =
      lerpColor(
        warm.edge,
        cool.edge,
        moveProgress
      );


    glow.style.left =
      (
        globeX +
        globeRadius *
        glowConfig.offsetX
      ) +
      "px";


    glow.style.top =
      (
        globeY +
        globeRadius *
        glowConfig.offsetY
      ) +
      "px";


    var glowSize =
      globeRadius *
      glowConfig.size;


    glow.style.width =
      glowSize +
      "px";


    glow.style.height =
      glowSize +
      "px";


    glow.style.background =
      "radial-gradient(" +

        "circle at center," +

        "rgba(" +
          rgb(core) +
          ",0.98) 0%," +

        "rgba(" +
          rgb(middle) +
          ",0.76) 32%," +

        "rgba(" +
          rgb(edge) +
          ",0.32) 58%," +

        "rgba(" +
          rgb(edge) +
          ",0) 78%" +

      ")";

  }



  /* =======================================================
     14 — ROTATION / PROJECTION
  ======================================================= */

  function rotatePoint(
    x,
    y,
    z,
    yaw,
    pitch
  ) {

    var cosYaw =
      Math.cos(yaw);

    var sinYaw =
      Math.sin(yaw);


    var x1 =
      x * cosYaw +
      z * sinYaw;


    var z1 =
      -x * sinYaw +
      z * cosYaw;


    var cosPitch =
      Math.cos(pitch);

    var sinPitch =
      Math.sin(pitch);


    var y2 =
      y * cosPitch -
      z1 * sinPitch;


    var z2 =
      y * sinPitch +
      z1 * cosPitch;


    return [
      x1,
      y2,
      z2
    ];

  }



  /* =======================================================
     15 — DRAW GLOBE BODY
  ======================================================= */

  function drawBody() {

    ctx.save();


    ctx.beginPath();


    ctx.arc(
      globeX,
      globeY,
      globeRadius,
      0,
      Math.PI * 2
    );


    ctx.clip();


    /*
     * Deep blue sphere.
     */

    var baseGradient =
      ctx.createRadialGradient(

        globeX -
        globeRadius * 0.25,

        globeY +
        globeRadius * 0.22,

        globeRadius * 0.04,

        globeX,

        globeY,

        globeRadius * 1.2

      );


    baseGradient.addColorStop(
      0,
      "#3029aa"
    );


    baseGradient.addColorStop(
      0.42,
      "#1e176e"
    );


    baseGradient.addColorStop(
      0.78,
      "#100a3a"
    );


    baseGradient.addColorStop(
      1,
      "#09051d"
    );


    ctx.fillStyle =
      baseGradient;


    ctx.fillRect(
      globeX - globeRadius,
      globeY - globeRadius,
      globeRadius * 2,
      globeRadius * 2
    );


    /*
     * Warm lighting at upper-right horizon.
     */

    var warmLight =
      ctx.createRadialGradient(

        globeX +
        globeRadius * 0.28,

        globeY -
        globeRadius * 0.78,

        0,

        globeX +
        globeRadius * 0.28,

        globeY -
        globeRadius * 0.55,

        globeRadius * 0.95

      );


    warmLight.addColorStop(
      0,
      "rgba(255,205,135,.44)"
    );


    warmLight.addColorStop(
      0.35,
      "rgba(187,126,168,.20)"
    );


    warmLight.addColorStop(
      1,
      "rgba(90,90,255,0)"
    );


    ctx.globalCompositeOperation =
      "screen";


    ctx.fillStyle =
      warmLight;


    ctx.fillRect(
      globeX - globeRadius,
      globeY - globeRadius,
      globeRadius * 2,
      globeRadius * 2
    );


    ctx.restore();


    ctx.globalCompositeOperation =
      "source-over";


    /*
     * Thin blue horizon.
     */

    ctx.beginPath();


    ctx.arc(
      globeX,
      globeY,
      globeRadius,
      0,
      Math.PI * 2
    );


    ctx.lineWidth =
      Math.max(
        1,
        globeRadius / 350
      );


    ctx.strokeStyle =
      "rgba(120,145,255,.48)";


    ctx.stroke();

  }



  /* =======================================================
     16 — DRAW LAND DOTS
  ======================================================= */

  function drawLandDots(
    yaw,
    pitch
  ) {

    if (!landReady) return;


    var baseDotSize =
      Math.max(
        0.65,
        globeRadius / 360 *
        CONFIG.dotSize
      );


    for (
      var i = 0;
      i < DOT_COUNT;
      i++
    ) {

      var rotated =
        rotatePoint(

          DOT_X[i],

          DOT_Y[i],

          DOT_Z[i],

          yaw,

          pitch

        );


      var x =
        rotated[0];

      var y =
        rotated[1];

      var depth =
        rotated[2];


      /*
       * Back half of sphere.
       */

      if (
        depth <= 0.015
      ) {
        continue;
      }


      var screenX =
        globeX +
        x * globeRadius;


      var screenY =
        globeY -
        y * globeRadius;


      var brightness =
        clamp(
          0.25 +
          depth * 0.9,
          0,
          1
        );


      var color =
        lerpColor(
          CONFIG.dotDark,
          CONFIG.dotLight,
          brightness
        );


      var opacity =
        clamp(
          0.18 +
          depth * 0.85,
          0,
          1
        );


      var size =
        baseDotSize *
        (
          0.65 +
          depth * 0.65
        );


      ctx.fillStyle =
        "rgba(" +
        rgb(color) +
        "," +
        opacity.toFixed(3) +
        ")";


      ctx.fillRect(
        screenX,
        screenY,
        size,
        size
      );

    }

  }



  /* =======================================================
     17 — DRAW ARCS
  ======================================================= */

  function drawArcs(
    yaw,
    pitch
  ) {

    ctx.lineCap =
      "round";


    ctx.lineWidth =
      Math.max(
        0.65,
        globeRadius / 620
      );


    ARC_POINTS.forEach(
      function (arc) {

        var previous = null;


        for (
          var i = 0;
          i < arc.length;
          i++
        ) {

          var rotated =
            rotatePoint(

              arc[i][0],

              arc[i][1],

              arc[i][2],

              yaw,

              pitch

            );


          if (
            rotated[2] <= 0
          ) {

            previous = null;

            continue;
          }


          var x =
            globeX +
            rotated[0] *
            globeRadius;


          var y =
            globeY -
            rotated[1] *
            globeRadius;


          if (previous) {

            var alpha =
              clamp(
                rotated[2] *
                CONFIG.arcAlpha,
                0.08,
                CONFIG.arcAlpha
              );


            ctx.strokeStyle =
              "rgba(" +
              rgb(CONFIG.arcColor) +
              "," +
              alpha.toFixed(3) +
              ")";


            ctx.beginPath();


            ctx.moveTo(
              previous.x,
              previous.y
            );


            ctx.lineTo(
              x,
              y
            );


            ctx.stroke();

          }


          previous = {
            x: x,
            y: y
          };

        }

      }
    );

  }



  /* =======================================================
     18 — DRAW MARKERS + POSITION PINS
  ======================================================= */

  var frameCount = 0;


  function drawMarkers(
    yaw,
    pitch
  ) {

    for (
      var i = 0;
      i < CONFIG.markers.length;
      i++
    ) {

      var marker =
        CONFIG.markers[i];


      var position =
        latLonToVector(
          marker.loc[0],
          marker.loc[1]
        );


      var rotated =
        rotatePoint(

          position[0],

          position[1],

          position[2],

          yaw,

          pitch

        );


      var depth =
        rotated[2];


      var screenX =
        globeX +
        rotated[0] *
        globeRadius;


      var screenY =
        globeY -
        rotated[1] *
        globeRadius;


      var visibility =
        clamp(
          (
            depth -
            0.02
          ) /
          0.25,
          0,
          1
        );


      /*
       * HTML warning pins.
       */

      var pin =
        pinElements[i];


      if (pin) {

        if (
          depth <= 0.02
        ) {

          pin.style.opacity =
            "0";


          pin.style.pointerEvents =
            "none";

        } else {

          pin.style.opacity =
            visibility.toFixed(3);


          pin.style.pointerEvents =
            visibility > 0.55
              ?
              "auto"
              :
              "none";


          pin.style.transform =
            "translate3d(" +
              screenX.toFixed(1) +
              "px," +
              screenY.toFixed(1) +
              "px,0)" +

            " translate(-50%,-50%)" +

            " scale(" +
              (
                0.78 +
                visibility * 0.22
              ).toFixed(3) +
            ")";

        }

      }


      /*
       * Green point markers.
       */

      if (
        marker.severity !== "low" ||
        depth <= 0.02
      ) {
        continue;
      }


      var radius =
        Math.max(
          2,
          globeRadius *
          0.006
        );


      /*
       * Pulse ring.
       */

      var pulse =
        (
          frameCount * 0.008 +
          i * 0.19
        ) % 1;


      ctx.beginPath();


      ctx.arc(
        screenX,
        screenY,
        radius *
        (
          1 +
          pulse * 2.8
        ),
        0,
        Math.PI * 2
      );


      ctx.strokeStyle =
        "rgba(" +
        rgb(CONFIG.markerColor) +
        "," +
        (
          (1 - pulse) *
          visibility *
          0.22
        ).toFixed(3) +
        ")";


      ctx.lineWidth =
        1;


      ctx.stroke();


      /*
       * Actual marker.
       */

      var markerGlow =
        ctx.createRadialGradient(

          screenX,
          screenY,
          0,

          screenX,
          screenY,

          radius * 5

        );


      markerGlow.addColorStop(
        0,
        "rgba(" +
          rgb(CONFIG.markerColor) +
          ",.75)"
      );


      markerGlow.addColorStop(
        1,
        "rgba(" +
          rgb(CONFIG.markerColor) +
          ",0)"
      );


      ctx.fillStyle =
        markerGlow;


      ctx.beginPath();


      ctx.arc(
        screenX,
        screenY,
        radius * 5,
        0,
        Math.PI * 2
      );


      ctx.fill();


      ctx.fillStyle =
        "rgba(" +
        rgb(CONFIG.markerColor) +
        "," +
        visibility.toFixed(3) +
        ")";


      ctx.beginPath();


      ctx.arc(
        screenX,
        screenY,
        radius,
        0,
        Math.PI * 2
      );


      ctx.fill();

    }

  }



  /* =======================================================
     19 — OPTIONAL DRAGGING
  ======================================================= */

  var dragYaw = 0;
  var dragPitch = 0;

  var dragging = false;

  var previousX = 0;
  var previousY = 0;

  var velocity = 0;


  function enableDragging() {

    if (!CONFIG.drag) return;


    document.addEventListener(
      "pointerdown",
      function (event) {

        if (
          event.target.closest(
            "a,button,input,textarea,.sp-pin"
          )
        ) {
          return;
        }


        dragging = true;


        previousX =
          event.clientX;


        previousY =
          event.clientY;


        velocity = 0;

      }
    );


    document.addEventListener(
      "pointermove",
      function (event) {

        if (!dragging) return;


        var deltaX =
          (
            event.clientX -
            previousX
          ) *
          0.005;


        var deltaY =
          (
            event.clientY -
            previousY
          ) *
          0.005;


        previousX =
          event.clientX;


        previousY =
          event.clientY;


        dragYaw +=
          deltaX;


        dragPitch =
          clamp(
            dragPitch +
            deltaY,
            -0.65,
            0.65
          );


        velocity =
          deltaX;

      }
    );


    document.addEventListener(
      "pointerup",
      function () {

        dragging = false;

      }
    );

  }



  /* =======================================================
     20 — MAIN RENDER LOOP
  ======================================================= */

  var spin = 0;


  var reduceMotion =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  function render() {

    requestAnimationFrame(
      render
    );


    resize();

    sampleScroll();


    if (!dragging) {

      dragYaw +=
        velocity;


      velocity *=
        0.94;

    }


    if (!reduceMotion) {

      spin +=
        CONFIG.spinSpeed;

    }


    var yaw =
      scrollYaw +
      spin +
      dragYaw;


    var pitch =
      clamp(
        scrollPitch +
        dragPitch,
        -1.1,
        1.1
      );


    ctx.clearRect(
      0,
      0,
      VW,
      VH
    );


    renderGlow();


    drawBody();


    drawLandDots(
      yaw,
      pitch
    );


    drawArcs(
      yaw,
      pitch
    );


    drawMarkers(
      yaw,
      pitch
    );


    frameCount++;

  }



  /* =======================================================
     21 — INITIALISE
  ======================================================= */

  function init() {

    resize();

    measureSections();

    loadLandMask();

    buildArcs();

    buildPins();

    enableDragging();


    setTimeout(
      measureSections,
      500
    );


    setTimeout(
      measureSections,
      1500
    );


    requestAnimationFrame(
      render
    );

  }


  window.addEventListener(
    "resize",
    measureSections
  );


  window.addEventListener(
    "load",
    measureSections
  );


  init();

})();
</script>
