(function () {
  "use strict";

  /* =====================================================
     GLOBE CONFIG
  ===================================================== */

  var CFG = {

    maskUrl:
      "https://cdn.prod.website-files.com/6a67a814b65d1aa8ea328bfd/6a6923ecd2db69732c675f4c_land-mask.png",

    /*
     * Globe positions.
     *
     * Section 1 = hero
     * Section 2 = light stats section
     */

    sections: [
  {
    sel: '[data-globe="1"]',

    cx: 0.50,
    cy: 1.13,
    r: 0.50,

    yaw: 20,
    pitch: -10,

    opacity: 1,
    blur: 0,
    glowOpacity: 1
  },

  {
    sel: '[data-globe="2"]',

    cx: 0.12,
    cy: 0.72,
    r: 0.40,

    yaw: 110,
    pitch: 14,

    opacity: 1,
    blur: 1,
    glowOpacity: 0
  }
],


    maxDpr: 2,


    /* =====================================================
       ROTATION
    ===================================================== */

    ease: true,

    spin: 0.35,

    drag: true,


    /* =====================================================
       GLOBE BODY

       THESE VALUES CREATE YOUR FRIEND'S BLUE ATMOSPHERE.
    ===================================================== */

   bodyDark: [
  46,
  41,
  86
],

bodyLit: [
  58,
  52,
  98
],

    /*
     * Blue atmospheric rim.
     */

    rim: [
      110,
      128,
      255
    ],


    /* =====================================================
       LAND DOTS
    ===================================================== */

    dotDark: [
      74,
      52,
      150
    ],

    dotLit: [
      214,
      222,
      255
    ],

    dotWarm: [
      255,
      232,
      180
    ],


    /* =====================================================
       ARCS / MARKERS
    ===================================================== */

    arcColor: [
      150,
      235,
      255
    ],

    markerColor: [
      125,
      250,
      214
    ],


    /* =====================================================
       LIGHTING

       This is important.
       It prevents globe from looking flat.
    ===================================================== */

    lightAz: -20,

    lightEl: 32,

    diffuse: 1.4,

    wrap: 0.30,


    /*
     * Fresnel atmosphere.
     */

    rimPow: 3.3,

    rimAmt: 0.8,


    /*
     * BLUE GLOW AROUND GLOBE.
     *
     * glow controls intensity.
     * glowSpread controls how far outside globe it travels.
     */

    glow: 0.25,

    glowSpread: 0.10,

    edgeFeather: 1.4,


    /* =====================================================
       DOT QUALITY
    ===================================================== */

    density: 0.6,

    dotSize: 1.15,

    dotAlpha: 1,

    dotContrast: 1.1,

    dotJitter: 0.55,

    bloom: 0.55,

    dotFalloff: 0.5,


    /* =====================================================
       CONNECTIONS
    ===================================================== */

    arcAlpha: 0.45,

    arcHeight: 0.16,


    /* =====================================================
       MARKERS
    ===================================================== */

    markerSize: 0.38,

    markerGlow: 0.55,

    pulse: 0.25,

    pins: true,

    canvasDots: true,

    tagOnHover: true,


    /* =====================================================
       WARM ORANGE GLOW BEHIND GLOBE
    ===================================================== */

   backGlow: {

  /*
   * Position relative to globe.
   * Keep this near the upper-right horizon.
   */
  offsetX: 0.30,
  offsetY: -0.61,

  /*
   * Smaller than the current glow.
   * This is NOT the large page atmosphere.
   */
  size: 0.94,

  /*
   * Enough blur to soften the edge,
   * but not so much that it becomes
   * a huge orange cloud.
   */
  blur: 22,

  opacity: 0.82,

  gradient:
    "radial-gradient(" +
      "circle at center," +

      "rgba(255,238,184,0.78) 0%," +

      "rgba(255,194,120,0.55) 28%," +

      "rgba(242,143,96,0.27) 52%," +

      "rgba(226,118,96,0.09) 67%," +

      "rgba(226,118,96,0) 79%" +
    ")"
},


    /* =====================================================
       SECOND SECTION BLUR
    ===================================================== */

    directionalBlur: {

      amount: 10,

      mask:
        "radial-gradient(" +
          "ellipse 46% 48% at 60% 54%," +
          "transparent 0%," +
          "transparent 42%," +
          "rgba(0,0,0,.10) 55%," +
          "rgba(0,0,0,.32) 72%," +
          "rgba(0,0,0,.58) 88%," +
          "rgba(0,0,0,.72) 100%" +
        ")"
    },


    /* =====================================================
       ICONS
    ===================================================== */

    icons: {

      alert:
        '<svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M9.0865 16.6586C13.2685 16.6586 16.6586 13.2685 16.6586 9.0865C16.6586 4.90455 13.2685 1.5144 9.0865 1.5144C4.90455 1.5144 1.5144 4.90455 1.5144 9.0865C1.5144 13.2685 4.90455 16.6586 9.0865 16.6586Z" fill="#F06A45"/>' +
          '<path d="M9.08655 6.05774V9.08658" stroke="black" stroke-width="1.51442" stroke-linecap="round"/>' +
          '<path d="M9.08655 12.1154H9.09371" stroke="black" stroke-width="1.51442" stroke-linecap="round"/>' +
        '</svg>',


      warning:
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M10.1471 3.80644L1.79469 17.7502C1.62249 18.0484 1.53137 18.3865 1.5304 18.7309C1.52944 19.0753 1.61866 19.4139 1.7892 19.7131C1.95973 20.0123 2.20564 20.2616 2.50244 20.4362C2.79925 20.6109 3.13661 20.7048 3.48096 20.7085H20.1858C20.5302 20.7048 20.8675 20.6109 21.1644 20.4362C21.4612 20.2616 21.7071 20.0123 21.8776 19.7131C22.0481 19.4139 22.1374 19.0753 22.1364 18.7309C22.1354 18.3865 22.0443 18.0484 21.8721 17.7502L13.5197 3.80644C13.3439 3.51662 13.0963 3.27701 12.801 3.11071C12.5056 2.94442 12.1724 2.85706 11.8334 2.85706C11.4944 2.85706 11.1612 2.94442 10.8658 3.11071C10.5705 3.27701 10.3229 3.51662 10.1471 3.80644Z" fill="#F04554"/>' +
          '<path d="M11.8335 8.87512V12.8196" stroke="#2D234B" stroke-width="1.97224" stroke-linecap="round"/>' +
          '<path d="M11.8335 16.7639H11.8432" stroke="#2D234B" stroke-width="1.97224" stroke-linecap="round"/>' +
        '</svg>'
    },


    /* =====================================================
       MARKER LOCATIONS
    ===================================================== */

    markers: [

      {
        loc: [50.1109, 8.6821],
        sev: "warning",
        tag: "Leaked credentials"
      },

      {
        loc: [51.5074, -0.1278],
        sev: "alert",
        tag: "Exposed bucket"
      },

      {
        loc: [25.2048, 55.2708],
        sev: "alert",
        tag: "Unpatched CVE"
      },

      {
        loc: [33.6844, 73.0479],
        sev: "warning",
        tag: "Open RDP port"
      },

      {
        loc: [1.3521, 103.8198],
        sev: "alert",
        tag: "Weak TLS config"
      },

      {
        loc: [40.7128, -74.0060],
        sev: "low"
      },

      {
        loc: [35.6762, 139.6503],
        sev: "low"
      },

      {
        loc: [-33.8688, 151.2093],
        sev: "low"
      },

      {
        loc: [-23.5505, -46.6333],
        sev: "low"
      },

      {
        loc: [6.5244, 3.3792],
        sev: "low"
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


  /* =====================================================
     ELEMENTS
  ===================================================== */

  var canvas =
    document.getElementById("sp-globe");

  if (!canvas) return;


  var ctx =
    canvas.getContext("2d");


  var pinWrap =
    document.getElementById("sp-pins");


  var globeLayer =
    canvas.closest(".globe-layer") ||
    canvas.parentElement ||
    document.body;



  /* =====================================================
     CREATE WARM BACK GLOW
  ===================================================== */

var backGlow =
  document.getElementById(
    "sp-globe-glow"
  );


  backGlow.style.position =
    "fixed";

  backGlow.style.zIndex =
    "-1";

  backGlow.style.pointerEvents =
    "none";

  backGlow.style.borderRadius =
    "50%";

  backGlow.style.filter =
    "blur(" +
    CFG.backGlow.blur +
    "px)";

  backGlow.style.mixBlendMode =
    "screen";

  backGlow.style.background =
    CFG.backGlow.gradient;

  backGlow.style.willChange =
    "left,top,width,height,opacity";



  /* =====================================================
     SECOND SECTION DIRECTIONAL BLUR
  ===================================================== */

  var blurLayer =
    document.getElementById(
      "sp-globe-blur"
    );


  if (!blurLayer) {

    blurLayer =
      document.createElement(
        "div"
      );


    blurLayer.id =
      "sp-globe-blur";


    blurLayer.setAttribute(
      "aria-hidden",
      "true"
    );


    globeLayer.appendChild(
      blurLayer
    );

  }


  blurLayer.style.position =
    "fixed";

  blurLayer.style.inset =
    "0";

  blurLayer.style.zIndex =
    "2";

  blurLayer.style.pointerEvents =
    "none";

  blurLayer.style.opacity =
    "0";

  blurLayer.style.backdropFilter =
    "blur(" +
    CFG.directionalBlur.amount +
    "px)";

  blurLayer.style.webkitBackdropFilter =
    "blur(" +
    CFG.directionalBlur.amount +
    "px)";

  blurLayer.style.maskImage =
    CFG.directionalBlur.mask;

  blurLayer.style.webkitMaskImage =
    CFG.directionalBlur.mask;


  globeLayer.style.isolation =
    "isolate";



  /* =====================================================
     VIEWPORT
  ===================================================== */

  var DPR =
    Math.min(
      window.devicePixelRatio || 1,
      CFG.maxDpr
    );


  var VW = 0;

  var VH = 0;

  var R = 0;

  var CX = 0;

  var CY = 0;

  var OPACITY = 1;

  var BLUR = 0;
  var GLOW_OPACITY = 1;


  /* =====================================================
     LIGHT VECTOR
  ===================================================== */

  var az =
    CFG.lightAz *
    Math.PI /
    180;


  var el =
    CFG.lightEl *
    Math.PI /
    180;


  var lx =
    Math.sin(az) *
    Math.cos(el);


  var ly =
    Math.sin(el);


  var lz =
    Math.cos(az) *
    Math.cos(el);


  var lightLength =
    Math.hypot(
      lx,
      ly,
      lz
    );


  lx /= lightLength;

  ly /= lightLength;

  lz /= lightLength;



  /* =====================================================
     LAT/LONG → VECTOR
  ===================================================== */

  function v3(
    lat,
    lon
  ) {

    var latitude =
      lat *
      Math.PI /
      180;


    var longitude =
      lon *
      Math.PI /
      180;


    return [

      Math.cos(latitude) *
      Math.cos(longitude),

      Math.sin(latitude),

      Math.cos(latitude) *
      Math.sin(longitude)

    ];

  }



  /* =====================================================
     PRE-RENDERED GLOBE BODY

     THIS IS THE IMPORTANT PART.

     Blue atmosphere is generated as part of the body,
     rather than a separate CSS halo.
  ===================================================== */

  var body =
    document.createElement(
      "canvas"
    );


  var bodySize = 0;


  var BODY_K =
    1 +
    CFG.glowSpread;



  function renderBody(size) {

    body.width =
      size;

    body.height =
      size;


    var bodyCtx =
      body.getContext("2d");


    var image =
      bodyCtx.createImageData(
        size,
        size
      );


    var pixels =
      image.data;


    var radius =
      size / 2;


    var inverseRadius =
      1 / radius;


    var bodyDark =
      CFG.bodyDark;


    var bodyLight =
      CFG.bodyLit;


    var rim =
      CFG.rim;


    var spread =
      CFG.glowSpread;


    var scale =
      1 +
      spread;


    var feather =
      (
        CFG.edgeFeather *
        scale
      ) /
      radius;



    for (
      var py = 0;
      py < size;
      py++
    ) {

      var ny =
        (
          (
            radius -
            py -
            0.5
          ) *
          inverseRadius
        ) *
        scale;


      for (
        var px = 0;
        px < size;
        px++
      ) {

        var nx =
          (
            (
              px +
              0.5 -
              radius
            ) *
            inverseRadius
          ) *
          scale;


        var r2 =
          nx * nx +
          ny * ny;


        var index =
          (
            py *
            size +
            px
          ) * 4;


        var distance =
          Math.sqrt(r2);


        /*
         * Coverage of actual sphere.
         */

        var coverage =
          (
            1 -
            distance
          ) /
          feather +
          0.5;


        coverage =
          Math.max(
            0,
            Math.min(
              1,
              coverage
            )
          );


        /*
         * BLUE ATMOSPHERE OUTSIDE SPHERE.
         */

        var atmosphere = 0;


        if (
          distance > 1 &&
          distance <
          1 + spread
        ) {

          var glowProgress =
            1 -
            (
              distance -
              1
            ) /
            spread;


          /*
           * Smooth falloff.
           */

          atmosphere =
            glowProgress *
            glowProgress *
            glowProgress *
            (
              glowProgress *
              (
                glowProgress *
                6 -
                15
              ) +
              10
            ) *
            CFG.glow;

        } else if (
          distance <= 1
        ) {

          atmosphere =
            CFG.glow;

        }


        if (
          coverage <= 0 &&
          atmosphere <= 0.002
        ) {

          pixels[
            index + 3
          ] = 0;

          continue;

        }


        var nz =
          Math.sqrt(
            Math.max(
              0,
              1 -
              Math.min(
                1,
                r2
              )
            )
          );


        /*
         * Directional globe lighting.
         */

        var diffuse =
          Math.max(
            0,
            (
              nx * lx +
              ny * ly +
              nz * lz +
              CFG.wrap
            ) /
            (
              1 +
              CFG.wrap
            )
          );


        var shade =
          Math.min(
            1,
            Math.pow(
              diffuse,
              1 /
              CFG.diffuse *
              1.35
            )
          );


        /*
         * Fresnel edge.
         */

        var fresnel =
          Math.pow(
            1 - nz,
            CFG.rimPow
          );


        var red =
          bodyDark[0] +
          (
            bodyLight[0] -
            bodyDark[0]
          ) *
          shade;


        var green =
          bodyDark[1] +
          (
            bodyLight[1] -
            bodyDark[1]
          ) *
          shade;


        var blue =
          bodyDark[2] +
          (
            bodyLight[2] -
            bodyDark[2]
          ) *
          shade;


        var rimAmount =
          Math.min(
            1,
            fresnel *
            (
              0.35 +
              0.65 *
              Math.max(
                0.25,
                shade
              )
            ) *
            CFG.rimAmt
          );


        red +=
          (
            rim[0] -
            red
          ) *
          rimAmount;


        green +=
          (
            rim[1] -
            green
          ) *
          rimAmount;


        blue +=
          (
            rim[2] -
            blue
          ) *
          rimAmount;


        var atmosphereAlpha =
          atmosphere *
          (
            1 -
            coverage
          );


        var outputAlpha =
          coverage +
          atmosphereAlpha;


        if (
          outputAlpha <=
          0.002
        ) {

          pixels[
            index + 3
          ] = 0;

          continue;

        }


        /*
         * Atmosphere uses the same blue as rim.
         */

        pixels[index] =
          (
            red *
            coverage +
            rim[0] *
            atmosphereAlpha
          ) /
          outputAlpha;


        pixels[
          index + 1
        ] =
          (
            green *
            coverage +
            rim[1] *
            atmosphereAlpha
          ) /
          outputAlpha;


        pixels[
          index + 2
        ] =
          (
            blue *
            coverage +
            rim[2] *
            atmosphereAlpha
          ) /
          outputAlpha;


        pixels[
          index + 3
        ] =
          outputAlpha *
          255;

      }

    }


    bodyCtx.putImageData(
      image,
      0,
      0
    );


    bodySize =
      size;

  }



  function ensureBody() {

    var maximumRadius = 0;


    CFG.sections.forEach(
      function (section) {

        maximumRadius =
          Math.max(
            maximumRadius,
            section.r
          );

      }
    );


    var required =
      Math.ceil(
        maximumRadius *
        Math.min(
          VW,
          VH
        ) *
        BODY_K *
        2 *
        DPR
      );


    required =
      Math.min(
        4096,
        Math.max(
          1024,
          Math.ceil(
            required /
            512
          ) *
          512
        )
      );


    if (
      required >
      bodySize
    ) {

      renderBody(
        required
      );

    }

  }



  /* =====================================================
     BUILD ARCS
  ===================================================== */

  var ARCS =
    CFG.arcs.map(
      function (path) {

        var start =
          v3(
            path[0][0],
            path[0][1]
          );


        var end =
          v3(
            path[1][0],
            path[1][1]
          );


        var dot =
          Math.max(
            -1,
            Math.min(
              1,

              start[0] *
              end[0] +

              start[1] *
              end[1] +

              start[2] *
              end[2]
            )
          );


        var omega =
          Math.acos(
            dot
          );


        var output = [];


        for (
          var i = 0;
          i <= 64;
          i++
        ) {

          var progress =
            i / 64;


          var point;


          if (
            omega <
            0.000001
          ) {

            point =
              start.slice();

          } else {

            var first =
              Math.sin(
                (
                  1 -
                  progress
                ) *
                omega
              ) /
              Math.sin(
                omega
              );


            var second =
              Math.sin(
                progress *
                omega
              ) /
              Math.sin(
                omega
              );


            point = [

              start[0] *
              first +
              end[0] *
              second,

              start[1] *
              first +
              end[1] *
              second,

              start[2] *
              first +
              end[2] *
              second

            ];

          }


          var lift =
            1 +
            CFG.arcHeight *
            Math.sin(
              progress *
              Math.PI
            ) *
            (
              omega /
              Math.PI +
              0.35
            );


          output.push([

            point[0] *
            lift,

            point[1] *
            lift,

            point[2] *
            lift

          ]);

        }


        return output;

      }
    );



  /* =====================================================
     LAND DOTS
  ===================================================== */

  var DX;

  var DY;

  var DZ;

  var DJ;

  var DN = 0;

  var ready = false;



  function buildDots(
    mask,
    width,
    height
  ) {

    var xs = [];

    var ys = [];

    var zs = [];

    var jitters = [];


    var DEG =
      Math.PI /
      180;


    var seed =
      0x9e3779b9;


    function random() {

      seed ^=
        seed << 13;

      seed ^=
        seed >>> 17;

      seed ^=
        seed << 5;


      return (
        (
          seed >>> 0
        ) %
        10000
      ) /
      10000;

    }


    for (
      var lat = -89;
      lat <= 89;
      lat += CFG.density
    ) {

      var cosLat =
        Math.cos(
          lat *
          DEG
        );


      var sinLat =
        Math.sin(
          lat *
          DEG
        );


      var maskY =
        Math.min(
          height - 1,
          Math.max(
            0,
            Math.floor(
              (
                90 -
                lat
              ) /
              180 *
              height
            )
          )
        );


      for (
        var lon = -180;
        lon < 180;
        lon += CFG.density
      ) {

        var maskX =
          Math.min(
            width - 1,
            Math.max(
              0,
              Math.floor(
                (
                  lon +
                  180
                ) /
                360 *
                width
              )
            )
          );


        if (
          mask[
            (
              maskY *
              width +
              maskX
            ) *
            4
          ] <
          128
        ) {

          continue;

        }


        var longitude =
          lon *
          DEG;


        xs.push(
          cosLat *
          Math.cos(
            longitude
          )
        );


        ys.push(
          sinLat
        );


        zs.push(
          cosLat *
          Math.sin(
            longitude
          )
        );


        jitters.push(
          random()
        );

      }

    }


    DX =
      Float32Array.from(
        xs
      );


    DY =
      Float32Array.from(
        ys
      );


    DZ =
      Float32Array.from(
        zs
      );


    DJ =
      Float32Array.from(
        jitters
      );


    DN =
      xs.length;


    ready =
      true;

  }



  var landImage =
    new Image();


  landImage.crossOrigin =
    "anonymous";


  landImage.onload =
    function () {

      var maskCanvas =
        document.createElement(
          "canvas"
        );


      maskCanvas.width =
        landImage.width;


      maskCanvas.height =
        landImage.height;


      var maskContext =
        maskCanvas.getContext(
          "2d"
        );


      maskContext.drawImage(
        landImage,
        0,
        0
      );


      var imageData =
        maskContext.getImageData(
          0,
          0,
          landImage.width,
          landImage.height
        );


      buildDots(
        imageData.data,
        landImage.width,
        landImage.height
      );

    };


  landImage.onerror =
    function () {

      console.warn(
        "Globe land mask failed to load."
      );

    };


  landImage.src =
    CFG.maskUrl;



  /* =====================================================
     HTML PINS
  ===================================================== */

  var pinElements = [];



  function buildPins() {

    if (!pinWrap) return;


    pinWrap.innerHTML =
      "";


    if (
      CFG.tagOnHover
    ) {

      pinWrap.classList.add(
        "sp-pins--hover"
      );

    }


    pinElements =
      CFG.markers.map(
        function (marker) {

          var severity =
            marker.sev ||
            "low";


          /*
           * Small green dots are
           * rendered on canvas.
           */

          if (
            severity === "low" &&
            CFG.canvasDots
          ) {

            return null;

          }


          var pin =
            document.createElement(
              "div"
            );


          pin.className =
            "sp-pin sp-pin--" +
            severity;


          var icon =
            CFG.icons[
              severity
            ] ||
            CFG.icons.alert;


          pin.innerHTML =
            '<div class="sp-pin__dot">' +
              icon +
            '</div>' +

            (
              marker.tag
                ?
                '<div class="sp-pin__tag">' +
                  marker.tag +
                '</div>'
                :
                ""
            );


          pinWrap.appendChild(
            pin
          );


          return pin;

        }
      );

  }


  if (
    CFG.pins
  ) {

    buildPins();

  }



  /* =====================================================
     SCROLL POSITIONING
  ===================================================== */

  var anchors = [];

  var scrollYaw = 0;

  var scrollPitch = 0;

  var globeExitStart = 0;
  var globeExitEnd = 0;



  function measure() {

    anchors = [];


    CFG.sections.forEach(
      function (
        section
      ) {

        var element =
          document.querySelector(
            section.sel
          );


        if (!element) {

          console.warn(
            "Globe section missing:",
            section.sel
          );

          return;

        }


        var top =
          element
            .getBoundingClientRect()
            .top +
          window.pageYOffset;
        if (
  element.matches(
    '[data-globe="2"]'
  )
) {

  globeExitEnd =
    top +
    element.offsetHeight;


  /*
   * Start fading during the final
   * 55% of one viewport.
   *
   * Example:
   * 1000px viewport → 550px fade distance.
   */
  globeExitStart =
    globeExitEnd -
    VH * 0.55;

}


        /*
         * Section 2 may contain a tall
         * scroll spacer.
         *
         * Only use its first viewport
         * for globe positioning.
         */

        var anchorHeight =
          element.matches(
            '[data-globe="2"]'
          )
            ?
            Math.min(
              element.offsetHeight,
              VH
            )
            :
            element.offsetHeight;


        anchors.push({

          y:
            top +
            anchorHeight /
            2 -
            VH /
            2,

          config:
            section

        });

      }
    );


    anchors.sort(
      function (
        first,
        second
      ) {

        return (
          first.y -
          second.y
        );

      }
    );

  }



  function lerp(
    start,
    end,
    progress
  ) {

    return (
      start +
      (
        end -
        start
      ) *
      progress
    );

  }



  function ease(
    progress
  ) {

    if (
      !CFG.ease
    ) {

      return progress;

    }


    return (
      progress *
      progress *
      (
        3 -
        2 *
        progress
      )
    );

  }



  function sampleScroll() {

    if (
      !anchors.length
    ) {

      return;

    }


    var scroll =
      window.pageYOffset;


    if (
      anchors.length === 1
    ) {

      var only =
        anchors[0].config;


      CX =
        only.cx *
        VW;


      CY =
        only.cy *
        VH;


      R =
        only.r *
        Math.min(
          VW,
          VH
        );


      scrollYaw =
        only.yaw *
        Math.PI /
        180;


      scrollPitch =
        only.pitch *
        Math.PI /
        180;


      OPACITY =
  only.opacity;

BLUR =
  only.blur;

GLOW_OPACITY =
  only.glowOpacity == null
    ? 1
    : only.glowOpacity;

return;

    }


    var index = 0;


    while (
      index <
      anchors.length -
      2 &&
      scroll >
      anchors[
        index + 1
      ].y
    ) {

      index++;

    }


    var A =
      anchors[index];


    var B =
      anchors[
        index + 1
      ];


    var progress =
      B.y >
      A.y
        ?
        (
          scroll -
          A.y
        ) /
        (
          B.y -
          A.y
        )
        :
        0;


    progress =
      Math.max(
        0,
        Math.min(
          1,
          progress
        )
      );


    progress =
      ease(
        progress
      );


    CX =
      lerp(
        A.config.cx,
        B.config.cx,
        progress
      ) *
      VW;


    CY =
      lerp(
        A.config.cy,
        B.config.cy,
        progress
      ) *
      VH;


    R =
      lerp(
        A.config.r,
        B.config.r,
        progress
      ) *
      Math.min(
        VW,
        VH
      );


    scrollYaw =
      lerp(
        A.config.yaw,
        B.config.yaw,
        progress
      ) *
      Math.PI /
      180;


    scrollPitch =
      lerp(
        A.config.pitch,
        B.config.pitch,
        progress
      ) *
      Math.PI /
      180;


    OPACITY =
  lerp(
    A.config.opacity,
    B.config.opacity,
    progress
  );

BLUR =
  lerp(
    A.config.blur,
    B.config.blur,
    progress
  );

GLOW_OPACITY =
  lerp(
    A.config.glowOpacity == null ? 1 : A.config.glowOpacity,
    B.config.glowOpacity == null ? 1 : B.config.glowOpacity,
    progress
  );
  if (
  globeExitEnd >
  globeExitStart
) {

  var exitProgress =
    (
      scroll -
      globeExitStart
    ) /
    (
      globeExitEnd -
      globeExitStart
    );


  exitProgress =
    Math.max(
      0,
      Math.min(
        1,
        exitProgress
      )
    );


  /*
   * Smooth fade instead of linear fade.
   */
  exitProgress =
    ease(
      exitProgress
    );


  var exitVisibility =
    1 -
    exitProgress;


  OPACITY *=
    exitVisibility;


  BLUR *=
    exitVisibility;


  GLOW_OPACITY *=
    exitVisibility;

}  

  }



  /* =====================================================
     RESIZE
  ===================================================== */

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


    VW =
      width;

    VH =
      height;


    DPR =
      Math.min(
        window.devicePixelRatio ||
        1,
        CFG.maxDpr
      );


    canvas.width =
      Math.round(
        VW *
        DPR
      );


    canvas.height =
      Math.round(
        VH *
        DPR
      );


    canvas.style.width =
      VW +
      "px";


    canvas.style.height =
      VH +
      "px";


    ctx.setTransform(
      DPR,
      0,
      0,
      DPR,
      0,
      0
    );


    ensureBody();

    measure();

  }



  window.addEventListener(
    "resize",
    resize
  );



  /* =====================================================
     DRAGGING
  ===================================================== */

  var dragYaw = 0;

  var dragPitch = 0;

  var dragging = false;

  var previousX = 0;

  var previousY = 0;

  var velocity = 0;



  if (
    CFG.drag
  ) {

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


        dragging =
          true;


        previousX =
          event.clientX;


        previousY =
          event.clientY;


        velocity =
          0;

      }
    );


    document.addEventListener(
      "pointermove",
      function (event) {

        if (
          !dragging
        ) {

          return;

        }


        var changeX =
          (
            event.clientX -
            previousX
          ) *
          0.005;


        var changeY =
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
          changeX;


        dragPitch =
          Math.max(
            -0.7,
            Math.min(
              0.7,
              dragPitch +
              changeY
            )
          );


        velocity =
          changeX;

      }
    );


    document.addEventListener(
      "pointerup",
      function () {

        dragging =
          false;

      }
    );

  }



  /* =====================================================
     RENDERING BUCKETS
  ===================================================== */

  var BK = 12;

  var WM = 4;

  var NB =
    BK *
    WM;


  var bucketX = [];

  var bucketY = [];

  var bucketZ = [];


  for (
    var bucket = 0;
    bucket < NB;
    bucket++
  ) {

    bucketX.push([]);

    bucketY.push([]);

    bucketZ.push([]);

  }


  var frames = 0;

  var spin = 0;


  var reduceMotion =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;



  /* =====================================================
     MAIN RENDER LOOP
  ===================================================== */

  function loop() {

    requestAnimationFrame(
      loop
    );


    resize();


    if (
      !ready ||
      !VW ||
      !bodySize
    ) {

      return;

    }


    frames++;


    sampleScroll();


    if (
      !dragging
    ) {

      dragYaw +=
        velocity;


      velocity *=
        0.94;

    }


    if (
      !reduceMotion
    ) {

      spin +=
        0.0022 *
        CFG.spin;

    }


    var yaw =
      scrollYaw +
      spin +
      dragYaw;


    var pitch =
      Math.max(
        -1.15,
        Math.min(
          1.15,
          scrollPitch +
          dragPitch
        )
      );


    ctx.clearRect(
      0,
      0,
      VW,
      VH
    );


    ctx.globalAlpha =
      OPACITY;


    if (
      pinWrap
    ) {

      pinWrap.style.opacity =
        OPACITY.toFixed(
          3
        );

    }


    if (
      blurLayer
    ) {

      blurLayer.style.opacity =
        BLUR.toFixed(
          3
        );

    }


    /*
     * Warm glow follows globe.
     */

    backGlow.style.left =
      (
        CX +
        R *
        CFG.backGlow.offsetX
      ) +
      "px";


    backGlow.style.top =
      (
        CY +
        R *
        CFG.backGlow.offsetY
      ) +
      "px";


    backGlow.style.width =
      (
        R *
        CFG.backGlow.size
      ) +
      "px";


    backGlow.style.height =
      (
        R *
        CFG.backGlow.size
      ) +
      "px";


  backGlow.style.opacity =
  (
    CFG.backGlow.opacity *
    GLOW_OPACITY
  ).toFixed(3);


    /*
     * Render dark globe + built-in
     * blue atmospheric rim.
     */

    var bodyRadius =
      R *
      BODY_K;


    ctx.drawImage(
      body,

      CX -
      bodyRadius,

      CY -
      bodyRadius,

      bodyRadius *
      2,

      bodyRadius *
      2
    );


    var cosYaw =
      Math.cos(
        yaw
      );


    var sinYaw =
      Math.sin(
        yaw
      );


    var cosPitch =
      Math.cos(
        pitch
      );


    var sinPitch =
      Math.sin(
        pitch
      );


    /*
     * Reset dot buckets.
     */

    for (
      var b = 0;
      b < NB;
      b++
    ) {

      bucketX[b].length =
        0;

      bucketY[b].length =
        0;

      bucketZ[b].length =
        0;

    }


    var cull =
      R *
      0.2;


    /*
     * Project land points.
     */

    for (
      var i = 0;
      i < DN;
      i++
    ) {

      var x0 =
        DX[i];

      var y0 =
        DY[i];

      var z0 =
        DZ[i];


      var x1 =
        x0 *
        cosYaw +
        z0 *
        sinYaw;


      var z1 =
        -x0 *
        sinYaw +
        z0 *
        cosYaw;


      var y2 =
        y0 *
        cosPitch -
        z1 *
        sinPitch;


      var z2 =
        y0 *
        sinPitch +
        z1 *
        cosPitch;


      if (
        z2 <=
        0.012
      ) {

        continue;

      }


      var screenX =
        CX +
        x1 *
        R;


      var screenY =
        CY -
        y2 *
        R;


      if (
        screenX <
        -cull ||
        screenX >
        VW +
        cull ||
        screenY <
        -cull ||
        screenY >
        VH +
        cull
      ) {

        continue;

      }


      /*
       * Same directional lighting
       * used by globe body.
       */

      var lighting =
        (
          x1 * lx +
          y2 * ly +
          z2 * lz +
          CFG.wrap
        ) /
        (
          1 +
          CFG.wrap
        );


      if (
        lighting <=
        0.02
      ) {

        continue;

      }


      lighting =
        Math.min(
          1,
          lighting
        );


      var brightness =
        (
          lighting *
          Math.min(
            1,
            z2 /
            0.14
          ) *
          BK
        ) | 0;


      brightness =
        Math.max(
          0,
          Math.min(
            BK - 1,
            brightness
          )
        );


      var widthIndex =
        (
          DJ[i] *
          WM
        ) | 0;


      widthIndex =
        Math.min(
          WM - 1,
          widthIndex
        );


      var bucketIndex =
        brightness *
        WM +
        widthIndex;


      bucketX[
        bucketIndex
      ].push(
        screenX
      );


      bucketY[
        bucketIndex
      ].push(
        screenY
      );


      bucketZ[
        bucketIndex
      ].push(
        0.55 +
        0.45 *
        z2 +
        (
          DJ[i] -
          0.5
        ) *
        0.5
      );

    }



    /* ===================================================
       DRAW LAND DOTS
    =================================================== */

    var dark =
      CFG.dotDark;


    var light =
      CFG.dotLit;


    var warm =
      CFG.dotWarm;


    var TAU =
      Math.PI *
      2;


    var baseSize =
      Math.max(
        0.5,
        R /
        250 *
        CFG.dotSize
      );



    for (
      var level = 0;
      level < BK;
      level++
    ) {

      var brightnessAmount =
        (
          level +
          0.5
        ) /
        BK;


      var shade =
        Math.pow(
          brightnessAmount,
          CFG.dotContrast
        );


      var red =
        dark[0] +
        (
          light[0] -
          dark[0]
        ) *
        shade;


      var green =
        dark[1] +
        (
          light[1] -
          dark[1]
        ) *
        shade;


      var blue =
        dark[2] +
        (
          light[2] -
          dark[2]
        ) *
        shade;


      var alpha =
        (
          0.2 +
          0.8 *
          Math.pow(
            brightnessAmount,
            0.85
          )
        ) *
        CFG.dotAlpha;


      var size =
        baseSize *
        (
          0.8 +
          0.35 *
          brightnessAmount
        );


      for (
        var widthGroup = 0;
        widthGroup < WM;
        widthGroup++
      ) {

        var dotBucket =
          level *
          WM +
          widthGroup;


        var count =
          bucketX[
            dotBucket
          ].length;


        if (
          !count
        ) {

          continue;

        }


        var warmAmount =
          (
            widthGroup /
            (
              WM -
              1
            )
          ) *
          CFG.dotJitter;


        ctx.fillStyle =
          "rgba(" +

          Math.round(
            red +
            (
              warm[0] -
              red
            ) *
            warmAmount
          ) +

          "," +

          Math.round(
            green +
            (
              warm[1] -
              green
            ) *
            warmAmount
          ) +

          "," +

          Math.round(
            blue +
            (
              warm[2] -
              blue
            ) *
            warmAmount
          ) +

          "," +

          alpha.toFixed(
            3
          ) +

          ")";


        ctx.beginPath();


        for (
          var point = 0;
          point < count;
          point++
        ) {

          var radius =
            size *
            (
              1 -
              CFG.dotFalloff +
              CFG.dotFalloff *
              bucketZ[
                dotBucket
              ][point]
            ) *
            0.5;


          ctx.moveTo(
            bucketX[
              dotBucket
            ][point] +
            radius,

            bucketY[
              dotBucket
            ][point]
          );


          ctx.arc(

            bucketX[
              dotBucket
            ][point],

            bucketY[
              dotBucket
            ][point],

            radius,

            0,

            TAU

          );

        }


        ctx.fill();

      }

    }



    /* ===================================================
       DOT BLOOM
    =================================================== */

    if (
      CFG.bloom >
      0.01
    ) {

      ctx.globalCompositeOperation =
        "lighter";


      for (
        var bloomLevel =
          BK - 3;

        bloomLevel <
          BK;

        bloomLevel++
      ) {

        var bloomBrightness =
          (
            bloomLevel +
            0.5
          ) /
          BK;


        var bloomAlpha =
          0.05 *
          CFG.bloom *
          (
            (
              bloomLevel -
              (
                BK -
                4
              )
            ) /
            3
          );


        if (
          bloomAlpha <
          0.004
        ) {

          continue;

        }


        ctx.fillStyle =
          "rgba(" +
          light[0] +
          "," +
          light[1] +
          "," +
          light[2] +
          "," +
          bloomAlpha.toFixed(
            3
          ) +
          ")";


        ctx.beginPath();


        for (
          var wg = 0;
          wg < WM;
          wg++
        ) {

          var bloomBucket =
            bloomLevel *
            WM +
            wg;


          var bloomRadius =
            baseSize *
            (
              0.8 +
              0.35 *
              bloomBrightness
            ) *
            1.9;


          for (
            var bp = 0;
            bp <
            bucketX[
              bloomBucket
            ].length;
            bp++
          ) {

            ctx.moveTo(
              bucketX[
                bloomBucket
              ][bp] +
              bloomRadius,

              bucketY[
                bloomBucket
              ][bp]
            );


            ctx.arc(

              bucketX[
                bloomBucket
              ][bp],

              bucketY[
                bloomBucket
              ][bp],

              bloomRadius,

              0,

              TAU

            );

          }

        }


        ctx.fill();

      }


      ctx.globalCompositeOperation =
        "source-over";

    }



    /* ===================================================
       CONNECTION ARCS
    =================================================== */

    ctx.lineWidth =
      Math.max(
        0.5,
        R /
        620
      );


    ctx.lineCap =
      "round";


    for (
      var arcIndex = 0;
      arcIndex <
      ARCS.length;
      arcIndex++
    ) {

      var arc =
        ARCS[
          arcIndex
        ];


      var previousVisible =
        false;


      var previousX = 0;

      var previousY = 0;


      for (
        var arcPointIndex = 0;
        arcPointIndex <
        arc.length;
        arcPointIndex++
      ) {

        var arcPoint =
          arc[
            arcPointIndex
          ];


        var arcX =
          arcPoint[0] *
          cosYaw +
          arcPoint[2] *
          sinYaw;


        var arcZ =
          -arcPoint[0] *
          sinYaw +
          arcPoint[2] *
          cosYaw;


        var arcY =
          arcPoint[1] *
          cosPitch -
          arcZ *
          sinPitch;


        var depth =
          arcPoint[1] *
          sinPitch +
          arcZ *
          cosPitch;


        var px =
          CX +
          arcX *
          R;


        var py =
          CY -
          arcY *
          R;


        var visible =
          depth >
          0;


        if (
          visible &&
          previousVisible
        ) {

          var fade =
            Math.min(
              1,
              depth *
              2.2
            );


          ctx.strokeStyle =
            "rgba(" +

            CFG.arcColor[0] +
            "," +

            CFG.arcColor[1] +
            "," +

            CFG.arcColor[2] +
            "," +

            (
              (
                0.18 +
                0.82 *
                fade
              ) *
              CFG.arcAlpha
            ).toFixed(
              3
            ) +

            ")";


          ctx.beginPath();


          ctx.moveTo(
            previousX,
            previousY
          );


          ctx.lineTo(
            px,
            py
          );


          ctx.stroke();

        }


        previousX =
          px;


        previousY =
          py;


        previousVisible =
          visible;

      }

    }



    /* ===================================================
       MARKERS + PINS
    =================================================== */

    for (
      var markerIndex = 0;
      markerIndex <
      CFG.markers.length;
      markerIndex++
    ) {

      var marker =
        CFG.markers[
          markerIndex
        ];


      var markerVector =
        v3(
          marker.loc[0],
          marker.loc[1]
        );


      var mx =
        markerVector[0] *
        cosYaw +
        markerVector[2] *
        sinYaw;


      var mz =
        -markerVector[0] *
        sinYaw +
        markerVector[2] *
        cosYaw;


      var my =
        markerVector[1] *
        cosPitch -
        mz *
        sinPitch;


      var markerDepth =
        markerVector[1] *
        sinPitch +
        mz *
        cosPitch;


      var markerX =
        CX +
        mx *
        R;


      var markerY =
        CY -
        my *
        R;


      var markerFade =
        Math.min(
          1,
          Math.max(
            0,
            markerDepth -
            0.03
          ) /
          0.25
        );


      var pin =
        pinElements[
          markerIndex
        ] ||
        null;


      if (
        pin
      ) {

        if (
          markerDepth <=
          0.03
        ) {

          pin.style.opacity =
            "0";

          pin.style.pointerEvents =
            "none";

        } else {

          pin.style.opacity =
            markerFade.toFixed(
              3
            );


          pin.style.pointerEvents =
            markerFade >
            0.6
              ?
              "auto"
              :
              "none";


          pin.style.transform =
            "translate3d(" +

            markerX.toFixed(
              1
            ) +

            "px," +

            markerY.toFixed(
              1
            ) +

            "px,0)" +

            " translate(-50%,-50%)" +

            " scale(" +

            (
              0.75 +
              0.25 *
              markerFade
            ).toFixed(
              3
            ) +

            ")";

        }

      }


      /*
       * Canvas markers.
       */

      if (
        markerDepth <=
        0.02
      ) {

        continue;

      }


      var markerRadius =
        Math.max(
          0.8,
          0.045 *
          R *
          0.55 *
          CFG.markerSize
        );


      /*
       * Pulse.
       */

      var pulseProgress =
        (
          (
            frames *
            0.011 +
            markerIndex *
            0.37
          ) %
          1 +
          1
        ) %
        1;


      var pulseAlpha =
        Math.max(
          0,
          1 -
          pulseProgress
        ) *
        0.3 *
        markerFade *
        CFG.pulse *
        3.3;


      if (
        pulseAlpha >
        0.005
      ) {

        ctx.beginPath();


        ctx.arc(

          markerX,

          markerY,

          markerRadius *
          (
            1 +
            pulseProgress *
            3.2
          ),

          0,

          TAU

        );


        ctx.strokeStyle =
          "rgba(" +

          CFG.markerColor[0] +
          "," +

          CFG.markerColor[1] +
          "," +

          CFG.markerColor[2] +
          "," +

          Math.min(
            0.6,
            pulseAlpha
          ).toFixed(
            3
          ) +

          ")";


        ctx.lineWidth =
          Math.max(
            0.5,
            R /
            650
          );


        ctx.stroke();

      }


      /*
       * Marker glow.
       */

      var markerGlowRadius =
        markerRadius *
        4.5 *
        CFG.markerGlow;


      var markerGradient =
        ctx.createRadialGradient(

          markerX,

          markerY,

          0,

          markerX,

          markerY,

          markerGlowRadius

        );


      markerGradient.addColorStop(
        0,
        "rgba(" +
          CFG.markerColor.join(",") +
          "," +
          (
            0.45 *
            markerFade *
            CFG.markerGlow
          ).toFixed(3) +
        ")"
      );


      markerGradient.addColorStop(
        1,
        "rgba(" +
          CFG.markerColor.join(",") +
          ",0)"
      );


      ctx.beginPath();


      ctx.arc(

        markerX,

        markerY,

        markerGlowRadius,

        0,

        TAU

      );


      ctx.fillStyle =
        markerGradient;


      ctx.fill();


      /*
       * Don't draw the green center beneath
       * warning/alert HTML icons.
       */

      if (
        marker.sev ===
        "low"
      ) {

        ctx.beginPath();


        ctx.arc(
          markerX,
          markerY,
          markerRadius,
          0,
          TAU
        );


        ctx.fillStyle =
          "rgba(" +
          CFG.markerColor.join(",") +
          "," +
          markerFade.toFixed(3) +
          ")";


        ctx.fill();

      }

    }


    ctx.globalAlpha =
      1;

  }



  /* =====================================================
     START
  ===================================================== */

  resize();

  measure();


  setTimeout(
    measure,
    600
  );


  setTimeout(
    measure,
    1800
  );


  requestAnimationFrame(
    loop
  );

})();
