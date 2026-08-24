
(function () {
    "use strict";
  
    var CFG = {
      maskUrl: "https://cdn.prod.website-files.com/6a67a814b65d1aa8ea328bfd/6a6923ecd2db69732c675f4c_land-mask.png",
  
      sections: [
        {
  sel: '[data-globe="1"]',
  cx: 0.50,
  cy: 1.72,
  r: 0.46,
  yaw: 20,
  pitch: -10,
  op: 1,
  blur: 0,
  bg: 0
},
        {
          sel: '[data-globe="2"]',
          cx: 0.12,
          cy: 0.72,
          r: 0.40,
          yaw: 110,
          pitch: 14,
          op: 1,
          blur: 1,
          bg: 1
        }
      ],

      /*
       * ═══ EASY VISUAL TUNING ═══
       * Change values in this object for routine design adjustments.
       */
      tuning: {
        maxDpr: 2,
        mobileBreakpoint: 991,

        sceneExit: {
          selector: ".section-testimonial",
          fadeDistanceVh: 0.35,
          endBeforeViewportVh: 0
        },

        directionalBlur: {
          amountPx: 10,
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

        lightBackground: {
          testimonialShift: {
            startSectionTopVh: 1.35,
            endSectionTopVh: 0.55,
            smoothing: 0.10
          },
          gradient:
            "radial-gradient(circle at 50% 5%," +
              "rgba(255,226,166,.98) 0%," +
              "rgba(244,199,164,.62) 24%," +
              "rgba(244,199,164,0) 54%)," +
            "radial-gradient(circle at 0% 10%," +
              "rgba(207,173,192,.72) 0%," +
              "rgba(207,173,192,0) 47%)," +
            "radial-gradient(circle at 18% 100%," +
              "rgba(45,64,207,.94) 0%," +
              "rgba(63,78,211,.58) 34%," +
              "rgba(63,78,211,0) 64%)," +
            "linear-gradient(180deg,#d7d7eb 0%,#efedf0 68%,#f6f4f0 100%)",
          testimonialGradient:
            "radial-gradient(circle at 84% 5%," +
              "rgba(255,226,166,.98) 0%," +
              "rgba(244,199,164,.62) 24%," +
              "rgba(244,199,164,0) 54%)," +
            "radial-gradient(circle at 0% 10%," +
              "rgba(207,173,192,.72) 0%," +
              "rgba(207,173,192,0) 47%)," +
            "radial-gradient(circle at 18% 100%," +
              "rgba(45,64,207,.94) 0%," +
              "rgba(63,78,211,.58) 34%," +
              "rgba(63,78,211,0) 64%)," +
            "linear-gradient(180deg,#d7d7eb 0%,#efedf0 68%,#f6f4f0 100%)"
        },

        globeBackGlow: {
            offsetX: 0.3,
            offsetY: -0.62,
          size: 1.05,
          blurPx: 18,
          maxOpacity: 1,
          blendMode: "screen",
          gradient:
            "radial-gradient(circle at center," +
              "rgba(255,235,164,1) 0%," +
              "rgba(255,179,105,.84) 34%," +
              "rgba(238,119,91,.38) 58%," +
              "rgba(226,120,105,0) 76%)"
        },

        dotGrid: {
          defaultX: "65%",
          defaultY: "35%",
          sizePx: 2.5,
          gapPx: 14,
          edgeFeatherPx: 0.65,
          radiusXpx: 220,
          radiusYpx: 170,
          baseColor: "rgba(246,238,210,.55)",
          baseOpacity: 0.72,
          hoverColor: "rgba(76,104,255,1)",
          hoverOpacity: 1,
          touchOpacity: 0.85,
          fadeSeconds: 0.30,
          spotlightMask:
            "radial-gradient(" +
              "ellipse var(--dot-radius-x) var(--dot-radius-y) at var(--dot-x) var(--dot-y)," +
              "#000 0%," +
              "rgba(0,0,0,.98) 34%," +
              "rgba(0,0,0,.72) 62%," +
              "rgba(0,0,0,.30) 82%," +
              "transparent 100%" +
            ")"
        },

        statsCards: {
          scrollHeightSvh: 200,
          width: "min(40vw,52rem)",
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
          minimumUpcomingOpacity: 0.16,
          cardFadeSeconds: 0.18,
          stateFadeSeconds: 0.25,
          mobileGapRem: 5,
          mobilePadding: "7rem 1.25rem",
          mobileMaxWidth: "34rem"
        }
      },
  
      ease: 1,
      spin: 0.35,
      drag: true,
  
      bodyDark: [26, 10, 58],
      bodyLit: [52, 44, 190],
      rim: [110, 128, 255],
      dotDark: [74, 52, 150],
      dotLit: [214, 222, 255],
      dotWarm: [255, 232, 180],
      arcColor: [150, 235, 255],
      markerColor: [125, 250, 214],
  
      lightAz: -20,
      lightEl: 32,
      diffuse: 1.4,
      wrap: 0.30,
      rimPow: 3.3,
      rimAmt: 0.8,
      glow: 0.25,
      glowSpread: 0.10,
      edgeFeather: 1.4,
  
      density: 0.6,
      dotSize: 1.15,
      dotAlpha: 1,
      dotContrast: 1.1,
      dotJitter: 0.55,
      bloom: 0.55,
      dotFalloff: 0.5,
  
      arcAlpha: 0.45,
      arcHeight: 0.16,
      markerSize: 0.38,
      markerGlow: 0.55,
      pulse: 0.25,
  
      pins: true,
      canvasDots: true,
      tagOnHover: true,
  
      icons: {
        alert:
          '<svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
          '<path d="M9.0865 16.6586C13.2685 16.6586 16.6586 13.2685 16.6586 9.0865C16.6586 4.90455 13.2685 1.5144 9.0865 1.5144C4.90455 1.5144 1.5144 4.90455 1.5144 9.0865C1.5144 13.2685 4.90455 16.6586 9.0865 16.6586Z" fill="#F06A45"/>' +
          '<path d="M9.08655 6.05774V9.08658" stroke="black" stroke-width="1.51442" stroke-linecap="round" stroke-linejoin="round"/>' +
          '<path d="M9.08655 12.1154H9.09371" stroke="black" stroke-width="1.51442" stroke-linecap="round" stroke-linejoin="round"/>' +
          "</svg>",
  
        warning:
          '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
          '<path d="M10.1471 3.80644L1.79469 17.7502C1.62249 18.0484 1.53137 18.3865 1.5304 18.7309C1.52944 19.0753 1.61866 19.4139 1.7892 19.7131C1.95973 20.0123 2.20564 20.2616 2.50244 20.4362C2.79925 20.6109 3.13661 20.7048 3.48096 20.7085H20.1858C20.5302 20.7048 20.8675 20.6109 21.1644 20.4362C21.4612 20.2616 21.7071 20.0123 21.8776 19.7131C22.0481 19.4139 22.1374 19.0753 22.1364 18.7309C22.1354 18.3865 22.0443 18.0484 21.8721 17.7502L13.5197 3.80644C13.3439 3.51662 13.0963 3.27701 12.801 3.11071C12.5056 2.94442 12.1724 2.85706 11.8334 2.85706C11.4944 2.85706 11.1612 2.94442 10.8658 3.11071C10.5705 3.27701 10.3229 3.51662 10.1471 3.80644Z" fill="#F04554"/>' +
          '<path d="M11.8335 8.87512V12.8196" stroke="#2D234B" stroke-width="1.97224" stroke-linecap="round" stroke-linejoin="round"/>' +
          '<path d="M11.8335 16.7639H11.8432" stroke="#2D234B" stroke-width="1.97224" stroke-linecap="round" stroke-linejoin="round"/>' +
          "</svg>"
      },
  
      markers: [
        { loc: [50.1109, 8.6821], sev: "warning", tag: "Leaked credentials" },
        { loc: [51.5074, -0.1278], sev: "alert", tag: "Exposed bucket" },
        { loc: [25.2048, 55.2708], sev: "alert", tag: "Unpatched CVE" },
        { loc: [33.6844, 73.0479], sev: "warning", tag: "Open RDP port" },
        { loc: [1.3521, 103.8198], sev: "alert", tag: "Weak TLS config" },
        { loc: [40.7128, -74.0060], sev: "low" },
        { loc: [35.6762, 139.6503], sev: "low" },
        { loc: [-33.8688, 151.2093], sev: "low" },
        { loc: [-23.5505, -46.6333], sev: "low" },
        { loc: [6.5244, 3.3792], sev: "low" }
      ],
  
      arcs: [
        [[50.1109, 8.6821], [40.7128, -74.0060]],
        [[33.6844, 73.0479], [51.5074, -0.1278]],
        [[25.2048, 55.2708], [35.6762, 139.6503]],
        [[1.3521, 103.8198], [-33.8688, 151.2093]]
      ]
    };
  
    var cv = document.getElementById("sp-globe");
    if (!cv) return;
  
    var ctx = cv.getContext("2d");
    var pinWrap = document.getElementById("sp-pins");
  
    /*
     * Create the directional blur layer automatically.
     */
    var globeLayer =
      cv.closest(".globe-layer") ||
      cv.parentElement ||
      document.body;
  
    var blurLayer = document.getElementById("sp-globe-blur");
  
    if (!blurLayer) {
      blurLayer = document.createElement("div");
      blurLayer.id = "sp-globe-blur";
      blurLayer.setAttribute("aria-hidden", "true");
      globeLayer.appendChild(blurLayer);
    }
  
    globeLayer.style.isolation = "isolate";
  
    blurLayer.style.position = "fixed";
    blurLayer.style.inset = "0";
    blurLayer.style.zIndex = "2";
    blurLayer.style.pointerEvents = "none";
    blurLayer.style.opacity = "0";
    var blurConfig = CFG.tuning.directionalBlur;
    blurLayer.style.backdropFilter =
      "blur(" + blurConfig.amountPx + "px)";
    blurLayer.style.webkitBackdropFilter =
      "blur(" + blurConfig.amountPx + "px)";
    blurLayer.style.willChange = "opacity";
  
  
  
  var blurMask = blurConfig.mask;
  
  blurLayer.style.maskImage = blurMask;
  blurLayer.style.webkitMaskImage = blurMask;

    /*
     * Light stats-section background. This layer cross-fades over the
     * existing dark Webflow background using the globe scroll progress.
     */
    var backgroundRoot =
      document.querySelector(".hero_bg") ||
      document.body;

    var darkHeroGlow =
      document.querySelector(".hero_bg_glow1");

    var lightBackground =
      document.getElementById("sp-light-background");

    if (!lightBackground) {
      lightBackground = document.createElement("div");
      lightBackground.id = "sp-light-background";
      lightBackground.setAttribute("aria-hidden", "true");
      backgroundRoot.appendChild(lightBackground);
    }

    lightBackground.style.position = "fixed";
    lightBackground.style.inset = "0";
    lightBackground.style.zIndex = "1";
    lightBackground.style.pointerEvents = "none";
    lightBackground.style.opacity = "0";
    lightBackground.style.willChange = "opacity";
    lightBackground.style.background =
      CFG.tuning.lightBackground.gradient;

    /*
     * The testimonial layer keeps the same light background while shifting
     * only the warm glow toward the right.
     */
    var testimonialBackground =
      document.getElementById("sp-testimonial-background");

    if (!testimonialBackground) {
      testimonialBackground = document.createElement("div");
      testimonialBackground.id = "sp-testimonial-background";
      testimonialBackground.setAttribute("aria-hidden", "true");
      backgroundRoot.appendChild(testimonialBackground);
    }

    testimonialBackground.style.position = "fixed";
    testimonialBackground.style.inset = "0";
    testimonialBackground.style.zIndex = "1";
    testimonialBackground.style.pointerEvents = "none";
    testimonialBackground.style.opacity = "0";
    testimonialBackground.style.willChange = "opacity";
    testimonialBackground.style.background =
      CFG.tuning.lightBackground.testimonialGradient;

    /*
     * Warm atmosphere behind the hero globe. It is positioned from the same
     * centre and radius values as the canvas, so it follows the globe exactly.
     */
    var globeBackGlow =
      document.getElementById("sp-globe-back-glow");

    if (!globeBackGlow) {
      globeBackGlow = document.createElement("div");
      globeBackGlow.id = "sp-globe-back-glow";
      globeBackGlow.setAttribute("aria-hidden", "true");
      globeLayer.appendChild(globeBackGlow);
    }

    var backGlowConfig = CFG.tuning.globeBackGlow;

    globeBackGlow.style.position = "fixed";
    globeBackGlow.style.zIndex = "-1";
    globeBackGlow.style.pointerEvents = "none";
    globeBackGlow.style.transform = "translate(-50%,-50%)";
    globeBackGlow.style.borderRadius = "50%";
    globeBackGlow.style.filter =
      "blur(" + backGlowConfig.blurPx + "px)";
    globeBackGlow.style.mixBlendMode =
      backGlowConfig.blendMode;
    globeBackGlow.style.willChange =
      "left,top,width,height,opacity";
    globeBackGlow.style.background =
      backGlowConfig.gradient;
  
    
    var DPR = Math.min(
      window.devicePixelRatio || 1,
      CFG.tuning.maxDpr
    );
  
    var VW = 0;
    var VH = 0;
    var R = 0;
    var CX = 0;
    var CY = 0;
    var OPACITY = 1;
    var BLUR = 0;
    var BG_PROGRESS = 0;
    var EXIT_VISIBILITY = 1;
    var TESTIMONIAL_BG_TARGET = 0;
    var TESTIMONIAL_BG_PROGRESS = 0;
  
    var az = CFG.lightAz * Math.PI / 180;
    var el = CFG.lightEl * Math.PI / 180;
  
    var lx = Math.sin(az) * Math.cos(el);
    var ly = Math.sin(el);
    var lz = Math.cos(az) * Math.cos(el);
  
    var lnn = Math.hypot(lx, ly, lz);
  
    lx /= lnn;
    ly /= lnn;
    lz /= lnn;
  
    function v3(lat, lon) {
      var a = lat * Math.PI / 180;
      var b = lon * Math.PI / 180;
  
      return [
        Math.cos(a) * Math.cos(b),
        Math.sin(a),
        Math.cos(a) * Math.sin(b)
      ];
    }
  
    /*
     * Pre-rendered globe body.
     */
    var body = document.createElement("canvas");
    var bodySize = 0;
    var BODY_K = 1 + CFG.glowSpread;
  
    function renderBody(size) {
      body.width = size;
      body.height = size;
  
      var b = body.getContext("2d");
      var img = b.createImageData(size, size);
      var d = img.data;
  
      var rad = size / 2;
      var inv = 1 / rad;
      var bd = CFG.bodyDark;
      var bl = CFG.bodyLit;
      var rm = CFG.rim;
      var sprd = CFG.glowSpread;
      var K = 1 + sprd;
      var feather = (CFG.edgeFeather * K) / rad;
  
      for (var py = 0; py < size; py++) {
        var ny = ((rad - py - 0.5) * inv) * K;
  
        for (var px = 0; px < size; px++) {
          var nx = ((px + 0.5 - rad) * inv) * K;
          var r2 = nx * nx + ny * ny;
          var o = (py * size + px) * 4;
          var distance = Math.sqrt(r2);
  
          var cov = (1 - distance) / feather + 0.5;
  
          if (cov < 0) cov = 0;
          else if (cov > 1) cov = 1;
  
          var ga = 0;
  
          if (distance > 1 && distance < 1 + sprd) {
            var glowProgress = 1 - (distance - 1) / sprd;
  
            ga =
              glowProgress *
              glowProgress *
              glowProgress *
              (
                glowProgress *
                (glowProgress * 6 - 15) +
                10
              ) *
              CFG.glow;
          } else if (distance <= 1) {
            ga = CFG.glow;
          }
  
          if (cov <= 0 && ga <= 0.002) {
            d[o + 3] = 0;
            continue;
          }
  
          var nz = Math.sqrt(
            Math.max(0, 1 - Math.min(1, r2))
          );
  
          var df = Math.max(
            0,
            (
              nx * lx +
              ny * ly +
              nz * lz +
              CFG.wrap
            ) /
            (1 + CFG.wrap)
          );
  
          var shade = Math.min(
            1,
            Math.pow(df, 1 / CFG.diffuse * 1.35)
          );
  
          var fresnel = Math.pow(
            1 - nz,
            CFG.rimPow
          );
  
          var red = bd[0] + (bl[0] - bd[0]) * shade;
          var green = bd[1] + (bl[1] - bd[1]) * shade;
          var blue = bd[2] + (bl[2] - bd[2]) * shade;
  
          var rimAmount = Math.min(
            1,
            fresnel *
            (0.35 + 0.65 * Math.max(0.25, shade)) *
            CFG.rimAmt
          );
  
          red += (rm[0] - red) * rimAmount;
          green += (rm[1] - green) * rimAmount;
          blue += (rm[2] - blue) * rimAmount;
  
          var alphaGlow = ga * (1 - cov);
          var outputAlpha = cov + alphaGlow;
  
          if (outputAlpha <= 0.002) {
            d[o + 3] = 0;
            continue;
          }
  
          d[o] =
            (red * cov + rm[0] * alphaGlow) /
            outputAlpha;
  
          d[o + 1] =
            (green * cov + rm[1] * alphaGlow) /
            outputAlpha;
  
          d[o + 2] =
            (blue * cov + rm[2] * alphaGlow) /
            outputAlpha;
  
          d[o + 3] = outputAlpha * 255;
        }
      }
  
      b.putImageData(img, 0, 0);
      bodySize = size;
    }
  
    function ensureBody() {
      var maxR = 0;
  
      for (var i = 0; i < CFG.sections.length; i++) {
        maxR = Math.max(maxR, CFG.sections[i].r);
      }
  
      var need = Math.ceil(
        maxR *
        Math.min(VW, VH) *
        BODY_K *
        2 *
        DPR
      );
  
      need = Math.min(
        4096,
        Math.max(
          1024,
          Math.ceil(need / 512) * 512
        )
      );
  
      if (need > bodySize) {
        renderBody(need);
      }
    }
  
    /*
     * Globe arcs.
     */
    var ARCS = CFG.arcs.map(function (path) {
      var a = v3(path[0][0], path[0][1]);
      var b = v3(path[1][0], path[1][1]);
  
      var dot = Math.max(
        -1,
        Math.min(
          1,
          a[0] * b[0] +
          a[1] * b[1] +
          a[2] * b[2]
        )
      );
  
      var omega = Math.acos(dot);
      var output = [];
  
      for (var i = 0; i <= 64; i++) {
        var progress = i / 64;
        var point;
  
        if (omega < 0.000001) {
          point = a.slice();
        } else {
          var s1 =
            Math.sin((1 - progress) * omega) /
            Math.sin(omega);
  
          var s2 =
            Math.sin(progress * omega) /
            Math.sin(omega);
  
          point = [
            a[0] * s1 + b[0] * s2,
            a[1] * s1 + b[1] * s2,
            a[2] * s1 + b[2] * s2
          ];
        }
  
        var lift =
          1 +
          CFG.arcHeight *
          Math.sin(progress * Math.PI) *
          (omega / Math.PI + 0.35);
  
        output.push([
          point[0] * lift,
          point[1] * lift,
          point[2] * lift
        ]);
      }
  
      return output;
    });
  
    /*
     * Globe dots.
     */
    var DX;
    var DY;
    var DZ;
    var DJ;
    var DN = 0;
    var ready = false;
  
    function buildDots(mask, maskWidth, maskHeight) {
      var xs = [];
      var ys = [];
      var zs = [];
      var jitters = [];
  
      var DEG = Math.PI / 180;
      var seed = 0x9e3779b9;
  
      function random() {
        seed ^= seed << 13;
        seed ^= seed >>> 17;
        seed ^= seed << 5;
  
        return ((seed >>> 0) % 10000) / 10000;
      }
  
      for (
        var lat = -89;
        lat <= 89;
        lat += CFG.density
      ) {
        var cosLat = Math.cos(lat * DEG);
        var sinLat = Math.sin(lat * DEG);
  
        var maskY = Math.min(
          maskHeight - 1,
          Math.max(
            0,
            Math.floor(
              (90 - lat) / 180 * maskHeight
            )
          )
        );
  
        for (
          var lon = -180;
          lon < 180;
          lon += CFG.density
        ) {
          var maskX = Math.min(
            maskWidth - 1,
            Math.max(
              0,
              Math.floor(
                (lon + 180) / 360 * maskWidth
              )
            )
          );
  
          if (
            mask[
              (maskY * maskWidth + maskX) * 4
            ] < 128
          ) {
            continue;
          }
  
          var lonRadians = lon * DEG;
  
          xs.push(
            cosLat * Math.cos(lonRadians)
          );
  
          ys.push(sinLat);
  
          zs.push(
            cosLat * Math.sin(lonRadians)
          );
  
          jitters.push(random());
        }
      }
  
      DX = Float32Array.from(xs);
      DY = Float32Array.from(ys);
      DZ = Float32Array.from(zs);
      DJ = Float32Array.from(jitters);
      DN = xs.length;
      ready = true;
    }
  
    var image = new Image();
    image.crossOrigin = "anonymous";
  
    image.onload = function () {
      var maskCanvas =
        document.createElement("canvas");
  
      maskCanvas.width = image.width;
      maskCanvas.height = image.height;
  
      var maskContext =
        maskCanvas.getContext("2d");
  
      maskContext.drawImage(image, 0, 0);
  
      var imageData =
        maskContext.getImageData(
          0,
          0,
          image.width,
          image.height
        );
  
      buildDots(
        imageData.data,
        image.width,
        image.height
      );
    };
  
    image.onerror = function () {
      console.warn(
        "Globe: land mask failed to load —",
        CFG.maskUrl
      );
    };
  
    image.src = CFG.maskUrl;
  
    /*
     * Globe pins.
     */
    var pinEls = [];
  
    function buildPins() {
      if (!pinWrap) return;
  
      if (CFG.tagOnHover) {
        pinWrap.className += " sp-pins--hover";
      }
  
      pinEls = CFG.markers.map(function (marker) {
        var severity = marker.sev || "low";
  
        if (
          severity === "low" &&
          CFG.canvasDots
        ) {
          return null;
        }
  
        var pin = document.createElement("div");
  
        pin.className =
          "sp-pin sp-pin--" + severity;
  
        var inner = "";
  
        if (severity !== "low") {
          var artwork = marker.icon
            ? '<img src="' +
              marker.icon +
              '" alt="">'
            : (
              CFG.icons[severity] ||
              CFG.icons.alert
            );
  
          inner +=
            '<div class="sp-pin__dot">' +
            artwork +
            "</div>";
  
          if (marker.tag) {
            inner +=
              '<div class="sp-pin__tag">' +
              marker.tag +
              "</div>";
          }
        } else {
          inner +=
            '<div class="sp-pin__dot"></div>';
        }
  
        pin.innerHTML = inner;
        pinWrap.appendChild(pin);
  
        return pin;
      });
    }
  
    if (CFG.pins) {
      buildPins();
    }
  
    /*
     * Scroll keyframe interpolation.
     */
    var anchors = [];
    var nodes = [];
    var exitSectionTop = null;
  
    function measure() {
      nodes = [];
      anchors = [];
      exitSectionTop = null;
  
      for (
        var i = 0;
        i < CFG.sections.length;
        i++
      ) {
        var node = document.querySelector(
          CFG.sections[i].sel
        );
  
        if (!node) {
          console.warn(
            "Globe: no element for",
            CFG.sections[i].sel
          );
  
          continue;
        }
  
        var top =
          node.getBoundingClientRect().top +
          window.pageYOffset;
  
        /*
         * The stats section contains a long scroll offset. Anchor the globe
         * transition to the first viewport of that section, not its full height.
         */
        var anchorHeight = node.matches('[data-globe="2"]')
          ? Math.min(node.offsetHeight, VH)
          : node.offsetHeight;
  
        nodes.push(node);
  
        anchors.push({
          y:
            top +
            anchorHeight / 2 -
            VH / 2,
  
          kf: CFG.sections[i]
        });
      }
  
      anchors.sort(function (a, b) {
        return a.y - b.y;
      });

      var exitNode = document.querySelector(
        CFG.tuning.sceneExit.selector
      );

      if (exitNode) {
        exitSectionTop =
          exitNode.getBoundingClientRect().top +
          window.pageYOffset;
      }
    }
  
    function lerp(a, b, progress) {
      return a + (b - a) * progress;
    }
  
    function easeT(progress) {
      return CFG.ease
        ? progress *
          progress *
          (3 - 2 * progress)
        : progress;
    }
  
    var sYaw = 0;
    var sPitch = 0;

    function sampleExitVisibility(scrollY) {
      var exitConfig = CFG.tuning.sceneExit;

      if (exitSectionTop == null) {
        EXIT_VISIBILITY = 1;
        TESTIMONIAL_BG_TARGET = 0;
        return;
      }

      /*
       * Finish fading before the testimonial section enters the viewport.
       * Both distances are viewport-relative for consistent responsive timing.
       */
      var fadeDistance = Math.max(
        1,
        exitConfig.fadeDistanceVh * VH
      );
      var fadeEnd =
        exitSectionTop -
        VH -
        exitConfig.endBeforeViewportVh * VH;
      var fadeStart = fadeEnd - fadeDistance;
      var fadeProgress = Math.max(
        0,
        Math.min(
          1,
          (scrollY - fadeStart) / fadeDistance
        )
      );

      EXIT_VISIBILITY =
        1 - fadeProgress * fadeProgress * (3 - 2 * fadeProgress);

      /*
       * Move the warm background glow on its own, longer scroll range.
       * This is intentionally independent from the faster globe exit.
       */
      var shiftConfig =
        CFG.tuning.lightBackground.testimonialShift;
      var sectionTopVh =
        (exitSectionTop - scrollY) / Math.max(1, VH);
      var shiftRange = Math.max(
        0.001,
        shiftConfig.startSectionTopVh -
        shiftConfig.endSectionTopVh
      );
      var shiftProgress = Math.max(
        0,
        Math.min(
          1,
          (
            shiftConfig.startSectionTopVh -
            sectionTopVh
          ) /
          shiftRange
        )
      );

      TESTIMONIAL_BG_TARGET =
        shiftProgress *
        shiftProgress *
        (3 - 2 * shiftProgress);
    }
  
    function sampleScroll() {
      if (!anchors.length) return;
  
      var scrollY = window.pageYOffset;
  
      if (anchors.length === 1) {
        var keyframe = anchors[0].kf;
  
        CX = keyframe.cx * VW;
        CY = keyframe.cy * VH;
  
        R =
          keyframe.r *
          Math.min(VW, VH);
  
        sYaw =
          keyframe.yaw *
          Math.PI /
          180;
  
        sPitch =
          keyframe.pitch *
          Math.PI /
          180;
  
        OPACITY =
          keyframe.op == null
            ? 1
            : keyframe.op;
  
        BLUR =
          keyframe.blur == null
            ? 0
            : keyframe.blur;

        BG_PROGRESS =
          keyframe.bg == null
            ? 0
            : keyframe.bg;

        sampleExitVisibility(scrollY);
  
        return;
      }
  
      var index = 0;
  
      while (
        index < anchors.length - 2 &&
        scrollY > anchors[index + 1].y
      ) {
        index++;
      }
  
      var A = anchors[index];
      var B = anchors[index + 1];
  
      var progress =
        B.y > A.y
          ? (scrollY - A.y) / (B.y - A.y)
          : 0;
  
      progress = easeT(
        Math.max(
          0,
          Math.min(1, progress)
        )
      );
  
      CX =
        lerp(
          A.kf.cx,
          B.kf.cx,
          progress
        ) * VW;

      CY =
  lerp(
    A.kf.cy,
    B.kf.cy,
    progress
  ) * VH;
  
      R =
        lerp(
          A.kf.r,
          B.kf.r,
          progress
        ) *
        Math.min(VW, VH);
  
      sYaw =
        lerp(
          A.kf.yaw,
          B.kf.yaw,
          progress
        ) *
        Math.PI /
        180;
  
      sPitch =
        lerp(
          A.kf.pitch,
          B.kf.pitch,
          progress
        ) *
        Math.PI /
        180;
  
      OPACITY = lerp(
        A.kf.op == null ? 1 : A.kf.op,
        B.kf.op == null ? 1 : B.kf.op,
        progress
      );
  
      BLUR = lerp(
        A.kf.blur == null
          ? 0
          : A.kf.blur,
  
        B.kf.blur == null
          ? 0
          : B.kf.blur,
  
        progress
      );

      BG_PROGRESS = lerp(
        A.kf.bg == null
          ? 0
          : A.kf.bg,

        B.kf.bg == null
          ? 0
          : B.kf.bg,

        progress
      );

      sampleExitVisibility(scrollY);
    }
  
    function resize() {
      var width = window.innerWidth;
      var height = window.innerHeight;
  
      if (
        width === VW &&
        height === VH
      ) {
        return;
      }
  
      VW = width;
      VH = height;
  
      cv.width = Math.round(VW * DPR);
      cv.height = Math.round(VH * DPR);
  
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
  
    window.addEventListener(
      "load",
      function () {
        resize();
        measure();
      }
    );
  
    /*
     * Optional pointer dragging.
     */
    var dYaw = 0;
    var dPitch = 0;
    var dragging = false;
    var previousX = 0;
    var previousY = 0;
    var velocity = 0;
  
    if (CFG.drag) {
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
          previousX = event.clientX;
          previousY = event.clientY;
          velocity = 0;
        }
      );
  
      document.addEventListener(
        "pointermove",
        function (event) {
          if (!dragging) return;
  
          var deltaX =
            (event.clientX - previousX) *
            0.005;
  
          var deltaY =
            (event.clientY - previousY) *
            0.005;
  
          previousX = event.clientX;
          previousY = event.clientY;
  
          dYaw += deltaX;
  
          dPitch = Math.max(
            -0.7,
            Math.min(
              0.7,
              dPitch + deltaY
            )
          );
  
          velocity = deltaX;
        }
      );
  
      document.addEventListener(
        "pointerup",
        function () {
          dragging = false;
        }
      );
    }
  
    /*
     * Rendering.
     */
    var BK = 12;
    var WM = 4;
    var NB = BK * WM;
  
    var bx = [];
    var by = [];
    var bz = [];
  
    for (var bucket = 0; bucket < NB; bucket++) {
      bx.push([]);
      by.push([]);
      bz.push([]);
    }
  
    var frames = 0;
    var spin = 0;
  
    var reduceMotion =
      window.matchMedia &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
  
    function loop() {
      requestAnimationFrame(loop);
  
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

      var backgroundSmoothing =
        CFG.tuning.lightBackground.testimonialShift.smoothing;

      if (reduceMotion) {
        TESTIMONIAL_BG_PROGRESS =
          TESTIMONIAL_BG_TARGET;
      } else {
        TESTIMONIAL_BG_PROGRESS +=
          (
            TESTIMONIAL_BG_TARGET -
            TESTIMONIAL_BG_PROGRESS
          ) *
          backgroundSmoothing;

        if (
          Math.abs(
            TESTIMONIAL_BG_TARGET -
            TESTIMONIAL_BG_PROGRESS
          ) < 0.0005
        ) {
          TESTIMONIAL_BG_PROGRESS =
            TESTIMONIAL_BG_TARGET;
        }
      }
  
      if (!dragging) {
        dYaw += velocity;
        velocity *= 0.94;
      }
  
      if (!reduceMotion) {
        spin += 0.0022 * CFG.spin;
      }
  
      var yaw =
        sYaw +
        spin +
        dYaw;
  
      var pitch = Math.max(
        -1.15,
        Math.min(
          1.15,
          sPitch + dPitch
        )
      );
  
      ctx.clearRect(
        0,
        0,
        VW,
        VH
      );
  
      ctx.globalAlpha =
        OPACITY * EXIT_VISIBILITY;
  
      if (pinWrap) {
        pinWrap.style.opacity =
          (
            OPACITY *
            EXIT_VISIBILITY
          ).toFixed(3);
      }
  
      if (blurLayer) {
        blurLayer.style.opacity =
          (
            BLUR *
            EXIT_VISIBILITY
          ).toFixed(3);
      }

      if (lightBackground) {
        lightBackground.style.opacity =
          BG_PROGRESS.toFixed(3);
      }

      if (testimonialBackground) {
        testimonialBackground.style.opacity =
          (
            BG_PROGRESS *
            TESTIMONIAL_BG_PROGRESS
          ).toFixed(3);
      }

      if (darkHeroGlow) {
        darkHeroGlow.style.opacity =
          (
            (1 - BG_PROGRESS) *
            EXIT_VISIBILITY
          ).toFixed(3);
      }

      if (globeBackGlow) {
        /*
         * Sit the glow just behind the globe's upper horizon.
         */
        globeBackGlow.style.left =
          (CX + R * backGlowConfig.offsetX).toFixed(2) + "px";
        globeBackGlow.style.top =
          (CY + R * backGlowConfig.offsetY).toFixed(2) + "px";
        globeBackGlow.style.width =
          (R * backGlowConfig.size).toFixed(2) + "px";
        globeBackGlow.style.height =
          (R * backGlowConfig.size).toFixed(2) + "px";
        globeBackGlow.style.opacity =
          (
            (1 - BG_PROGRESS) *
            backGlowConfig.maxOpacity *
            EXIT_VISIBILITY
          ).toFixed(3);
      }
  
      var bodyRadius = R * BODY_K;
  
      ctx.drawImage(
        body,
        CX - bodyRadius,
        CY - bodyRadius,
        bodyRadius * 2,
        bodyRadius * 2
      );
  
      var cosYaw = Math.cos(yaw);
      var sinYaw = Math.sin(yaw);
      var cosPitch = Math.cos(pitch);
      var sinPitch = Math.sin(pitch);
  
      var i;
  
      for (i = 0; i < NB; i++) {
        bx[i].length = 0;
        by[i].length = 0;
        bz[i].length = 0;
      }
  
      var cull = R * 0.2;
  
      for (i = 0; i < DN; i++) {
        var x0 = DX[i];
        var y0 = DY[i];
        var z0 = DZ[i];
  
        var x1 =
          x0 * cosYaw +
          z0 * sinYaw;
  
        var z1 =
          -x0 * sinYaw +
          z0 * cosYaw;
  
        var y2 =
          y0 * cosPitch -
          z1 * sinPitch;
  
        var z2 =
          y0 * sinPitch +
          z1 * cosPitch;
  
        if (z2 <= 0.012) continue;
  
        var screenX =
          CX +
          x1 * R;
  
        var screenY =
          CY -
          y2 * R;
  
        if (
          screenX < -cull ||
          screenX > VW + cull ||
          screenY < -cull ||
          screenY > VH + cull
        ) {
          continue;
        }
  
        var lighting =
          (
            x1 * lx +
            y2 * ly +
            z2 * lz +
            CFG.wrap
          ) /
          (1 + CFG.wrap);
  
        if (lighting <= 0.02) continue;
        if (lighting > 1) lighting = 1;
  
        var brightnessBucket =
          (
            lighting *
            Math.min(1, z2 / 0.14) *
            BK
          ) | 0;
  
        if (brightnessBucket >= BK) {
          brightnessBucket = BK - 1;
        }
  
        if (brightnessBucket < 0) {
          brightnessBucket = 0;
        }
  
        var widthIndex =
          (DJ[i] * WM) | 0;
  
        if (widthIndex >= WM) {
          widthIndex = WM - 1;
        }
  
        var bucketIndex =
          brightnessBucket *
          WM +
          widthIndex;
  
        bx[bucketIndex].push(screenX);
        by[bucketIndex].push(screenY);
  
        bz[bucketIndex].push(
          0.55 +
          0.45 * z2 +
          (DJ[i] - 0.5) * 0.5
        );
      }
  
      var dark = CFG.dotDark;
      var light = CFG.dotLit;
      var warm = CFG.dotWarm;
      var TAU = Math.PI * 2;
  
      var baseSize = Math.max(
        0.5,
        R / 250 * CFG.dotSize
      );
  
      var k;
      var widthGroup;
      var count;
      var pointIndex;
  
      for (k = 0; k < BK; k++) {
        var brightness =
          (k + 0.5) / BK;
  
        var shade = Math.pow(
          brightness,
          CFG.dotContrast
        );
  
        var red =
          dark[0] +
          (light[0] - dark[0]) *
          shade;
  
        var green =
          dark[1] +
          (light[1] - dark[1]) *
          shade;
  
        var blue =
          dark[2] +
          (light[2] - dark[2]) *
          shade;
  
        var alpha =
          (
            0.2 +
            0.8 *
            Math.pow(brightness, 0.85)
          ) *
          CFG.dotAlpha;
  
        var size =
          baseSize *
          (
            0.8 +
            0.35 * brightness
          );
  
        for (
          widthGroup = 0;
          widthGroup < WM;
          widthGroup++
        ) {
          var dotBucket =
            k * WM +
            widthGroup;
  
          count = bx[dotBucket].length;
  
          if (!count) continue;
  
          var warmAmount =
            (
              widthGroup /
              (WM - 1)
            ) *
            CFG.dotJitter;
  
          ctx.fillStyle =
            "rgba(" +
            Math.round(
              red +
              (warm[0] - red) *
              warmAmount
            ) +
            "," +
            Math.round(
              green +
              (warm[1] - green) *
              warmAmount
            ) +
            "," +
            Math.round(
              blue +
              (warm[2] - blue) *
              warmAmount
            ) +
            "," +
            alpha.toFixed(3) +
            ")";
  
          ctx.beginPath();
  
          var pointsX = bx[dotBucket];
          var pointsY = by[dotBucket];
          var pointsZ = bz[dotBucket];
  
          for (
            pointIndex = 0;
            pointIndex < count;
            pointIndex++
          ) {
            var radius =
              size *
              (
                1 -
                CFG.dotFalloff +
                CFG.dotFalloff *
                pointsZ[pointIndex]
              ) *
              0.5;
  
            ctx.moveTo(
              pointsX[pointIndex] + radius,
              pointsY[pointIndex]
            );
  
            ctx.arc(
              pointsX[pointIndex],
              pointsY[pointIndex],
              radius,
              0,
              TAU
            );
          }
  
          ctx.fill();
        }
      }
  
      /*
       * Dot bloom.
       */
      if (CFG.bloom > 0.01) {
        ctx.globalCompositeOperation =
          "lighter";
  
        for (k = BK - 3; k < BK; k++) {
          var bloomBrightness =
            (k + 0.5) / BK;
  
          var bloomAlpha =
            0.05 *
            CFG.bloom *
            (
              (k - (BK - 4)) /
              3
            );
  
          if (bloomAlpha < 0.004) {
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
            bloomAlpha.toFixed(3) +
            ")";
  
          ctx.beginPath();
  
          for (
            widthGroup = 0;
            widthGroup < WM;
            widthGroup++
          ) {
            var bloomBucket =
              k * WM +
              widthGroup;
  
            var bloomX =
              bx[bloomBucket];
  
            var bloomY =
              by[bloomBucket];
  
            var bloomRadius =
              baseSize *
              (
                0.8 +
                0.35 * bloomBrightness
              ) *
              1.9;
  
            for (
              pointIndex = 0;
              pointIndex < bloomX.length;
              pointIndex++
            ) {
              ctx.moveTo(
                bloomX[pointIndex] +
                bloomRadius,
                bloomY[pointIndex]
              );
  
              ctx.arc(
                bloomX[pointIndex],
                bloomY[pointIndex],
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
  
      /*
       * Connection arcs.
       */
      var arcColor = CFG.arcColor;
  
      ctx.lineWidth = Math.max(
        0.5,
        R / 620
      );
  
      ctx.lineCap = "round";
  
      for (
        var arcIndex = 0;
        arcIndex < ARCS.length;
        arcIndex++
      ) {
        var arcPoints = ARCS[arcIndex];
        var previousVisible = false;
        var previousPointX = 0;
        var previousPointY = 0;
  
        for (
          pointIndex = 0;
          pointIndex < arcPoints.length;
          pointIndex++
        ) {
          var arcPoint =
            arcPoints[pointIndex];
  
          var arcX =
            arcPoint[0] * cosYaw +
            arcPoint[2] * sinYaw;
  
          var arcZ =
            -arcPoint[0] * sinYaw +
            arcPoint[2] * cosYaw;
  
          var arcY =
            arcPoint[1] * cosPitch -
            arcZ * sinPitch;
  
          var arcDepth =
            arcPoint[1] * sinPitch +
            arcZ * cosPitch;
  
          var projectedX =
            CX +
            arcX * R;
  
          var projectedY =
            CY -
            arcY * R;
  
          var visible = arcDepth > 0;
  
          if (
            visible &&
            previousVisible
          ) {
            var depthFade = Math.min(
              1,
              arcDepth * 2.2
            );
  
            ctx.strokeStyle =
              "rgba(" +
              arcColor[0] +
              "," +
              arcColor[1] +
              "," +
              arcColor[2] +
              "," +
              (
                (
                  0.18 +
                  0.82 * depthFade
                ) *
                CFG.arcAlpha
              ).toFixed(3) +
              ")";
  
            ctx.beginPath();
  
            ctx.moveTo(
              previousPointX,
              previousPointY
            );
  
            ctx.lineTo(
              projectedX,
              projectedY
            );
  
            ctx.stroke();
          }
  
          previousPointX = projectedX;
          previousPointY = projectedY;
          previousVisible = visible;
        }
      }
  
      /*
       * Markers and DOM pins.
       */
      var markerColor = CFG.markerColor;
  
      for (
        pointIndex = 0;
        pointIndex < CFG.markers.length;
        pointIndex++
      ) {
        var marker =
          CFG.markers[pointIndex];
  
        var markerVector =
          v3(
            marker.loc[0],
            marker.loc[1]
          );
  
        var markerX =
          markerVector[0] * cosYaw +
          markerVector[2] * sinYaw;
  
        var markerZ =
          -markerVector[0] * sinYaw +
          markerVector[2] * cosYaw;
  
        var markerY =
          markerVector[1] * cosPitch -
          markerZ * sinPitch;
  
        var markerDepth =
          markerVector[1] * sinPitch +
          markerZ * cosPitch;
  
        var markerScreenX =
          CX +
          markerX * R;
  
        var markerScreenY =
          CY -
          markerY * R;
  
        var markerFade = Math.min(
          1,
          Math.max(
            0,
            markerDepth - 0.03
          ) / 0.25
        );
  
        var pin =
          pinEls[pointIndex] ||
          null;
  
        if (pin) {
          var onScreen =
            markerScreenX > -200 &&
            markerScreenX < VW + 200 &&
            markerScreenY > -200 &&
            markerScreenY < VH + 200;
  
          if (
            markerDepth <= 0.03 ||
            !onScreen
          ) {
            pin.style.opacity = "0";
            pin.style.pointerEvents = "none";
          } else {
            pin.style.opacity =
              markerFade.toFixed(3);
  
            pin.style.pointerEvents =
              markerFade > 0.6
                ? "auto"
                : "none";
  
            pin.style.transform =
              "translate3d(" +
              markerScreenX.toFixed(1) +
              "px," +
              markerScreenY.toFixed(1) +
              "px,0) " +
              "translate(-50%,-50%) " +
              "scale(" +
              (
                0.75 +
                0.25 * markerFade
              ).toFixed(3) +
              ")";
  
            pin.style.zIndex = String(
              1000 +
              Math.round(
                markerDepth * 1000
              )
            );
          }
        }
  
        if (
          markerDepth <= 0.02 ||
          !CFG.canvasDots
        ) {
          continue;
        }
  
        var markerRadius = Math.max(
          0.8,
          (marker.size || 0.045) *
          R *
          0.55 *
          CFG.markerSize
        );
  
        if (CFG.pulse > 0.01) {
          var pulseProgress =
            (
              (
                frames * 0.011 +
                pointIndex * 0.37
              ) %
              1 +
              1
            ) %
            1;
  
          var pulseAlpha =
            Math.max(
              0,
              1 - pulseProgress
            ) *
            0.3 *
            markerFade *
            CFG.pulse *
            3.3;
  
          if (pulseAlpha > 0.005) {
            ctx.beginPath();
  
            ctx.arc(
              markerScreenX,
              markerScreenY,
              Math.max(
                0,
                markerRadius *
                (
                  1 +
                  pulseProgress * 3.2
                )
              ),
              0,
              TAU
            );
  
            ctx.strokeStyle =
              "rgba(" +
              markerColor[0] +
              "," +
              markerColor[1] +
              "," +
              markerColor[2] +
              "," +
              Math.min(
                0.6,
                pulseAlpha
              ).toFixed(3) +
              ")";
  
            ctx.lineWidth =
              Math.max(
                0.5,
                R / 650
              );
  
            ctx.stroke();
          }
        }
  
        if (CFG.markerGlow > 0.01) {
          var glowRadius =
            markerRadius *
            4.5 *
            CFG.markerGlow;
  
          var gradient =
            ctx.createRadialGradient(
              markerScreenX,
              markerScreenY,
              0,
              markerScreenX,
              markerScreenY,
              glowRadius
            );
  
          gradient.addColorStop(
            0,
            "rgba(" +
            markerColor[0] +
            "," +
            markerColor[1] +
            "," +
            markerColor[2] +
            "," +
            (
              0.45 *
              markerFade *
              CFG.markerGlow
            ).toFixed(3) +
            ")"
          );
  
          gradient.addColorStop(
            0.45,
            "rgba(" +
            markerColor[0] +
            "," +
            markerColor[1] +
            "," +
            markerColor[2] +
            "," +
            (
              0.12 *
              markerFade *
              CFG.markerGlow
            ).toFixed(3) +
            ")"
          );
  
          gradient.addColorStop(
            1,
            "rgba(" +
            markerColor[0] +
            "," +
            markerColor[1] +
            "," +
            markerColor[2] +
            ",0)"
          );
  
          ctx.beginPath();
  
          ctx.arc(
            markerScreenX,
            markerScreenY,
            glowRadius,
            0,
            TAU
          );
  
          ctx.fillStyle = gradient;
          ctx.fill();
        }
  
        ctx.beginPath();
  
        ctx.arc(
          markerScreenX,
          markerScreenY,
          markerRadius,
          0,
          TAU
        );
  
        ctx.fillStyle =
          "rgba(" +
          Math.min(
            255,
            markerColor[0] + 70
          ) +
          "," +
          Math.min(
            255,
            markerColor[1] + 40
          ) +
          "," +
          Math.min(
            255,
            markerColor[2] + 40
          ) +
          "," +
          (
            0.55 +
            0.45 * markerFade
          ).toFixed(3) +
          ")";
  
        ctx.fill();
      }
  
      ctx.globalAlpha = 1;
    }
  
    /*
     * Interactive dot-grid cards.
    * Add the custom attribute data-dot-hover to any Webflow div.
     */
    function initDotHoverCards() {
      var dotConfig = CFG.tuning.dotGrid;
      var statsConfig = CFG.tuning.statsCards;
      var mobileBreakpoint = CFG.tuning.mobileBreakpoint;

      if (!document.getElementById("sp-dot-hover-styles")) {
        var dotStyles = document.createElement("style");
        dotStyles.id = "sp-dot-hover-styles";
        dotStyles.textContent =
          '[data-dot-hover]{' +
            'position:relative;' +
            'isolation:isolate;' +
            'overflow:hidden;' +
            '--dot-x:' + dotConfig.defaultX + ';' +
            '--dot-y:' + dotConfig.defaultY + ';' +
            '--dot-size:' + dotConfig.sizePx + 'px;' +
            '--dot-gap:' + dotConfig.gapPx + 'px;' +
            '--dot-radius-x:' + dotConfig.radiusXpx + 'px;' +
            '--dot-radius-y:' + dotConfig.radiusYpx + 'px;' +
          '}' +
          '[data-dot-hover]::before,' +
          '[data-dot-hover]::after{' +
            'content:"";' +
            'position:absolute;' +
            'inset:0;' +
            'z-index:0;' +
            'pointer-events:none;' +
            'background-size:var(--dot-gap) var(--dot-gap);' +
            'background-position:center;' +
          '}' +
          '[data-dot-hover]::before{' +
            'background-image:radial-gradient(' +
              'circle,' +
              dotConfig.baseColor + ' 0 var(--dot-size),' +
              'transparent calc(var(--dot-size) + ' +
                dotConfig.edgeFeatherPx + 'px)' +
            ');' +
            'opacity:' + dotConfig.baseOpacity + ';' +
          '}' +
          '[data-dot-hover]::after{' +
            'background-image:radial-gradient(' +
              'circle,' +
              dotConfig.hoverColor + ' 0 var(--dot-size),' +
              'transparent calc(var(--dot-size) + ' +
                dotConfig.edgeFeatherPx + 'px)' +
            ');' +
            '-webkit-mask-image:' + dotConfig.spotlightMask + ';' +
            'mask-image:' + dotConfig.spotlightMask + ';' +
            'opacity:0;' +
            'transition:opacity ' + dotConfig.fadeSeconds + 's ease;' +
          '}' +
          '[data-dot-hover]:hover::after{' +
            'opacity:' + dotConfig.hoverOpacity + ';' +
          '}' +
          '[data-dot-hover]>*{' +
            'position:relative;' +
            'z-index:1;' +
          '}' +
        '[data-globe="2"]{' +
          'z-index:11;' +
          'height:auto;' +
          'pointer-events:none;' +
        '}' +
          '[data-globe="2"] .stats_component{' +
            'position:sticky;' +
            'top:0;' +
            'height:100svh;' +
          '}' +
          '[data-stats="scrolloffset"]{' +
            'height:' + statsConfig.scrollHeightSvh + 'svh;' +
            'pointer-events:none;' +
          '}' +
          '[data-stats="list"]{' +
            'position:relative;' +
            'display:block;' +
            'width:100%;' +
            'height:100%;' +
            'padding:0;' +
          '}' +
        '[data-stats="item"]{' +
          'position:absolute;' +
          'width:' + statsConfig.width + ';' +
          'transform-origin:center;' +
          'pointer-events:auto;' +
          'will-change:left,top,transform,opacity;' +
            'transition:opacity ' + statsConfig.cardFadeSeconds + 's linear;' +
          '}' +
          '[data-stats="item"] .stats_item_para,' +
          '[data-stats="item"] .stats_item_bg_wrap{' +
            'opacity:0;' +
            'transition:opacity ' + statsConfig.stateFadeSeconds + 's ease;' +
          '}' +
          '[data-stats="item"].is-active .stats_item_para,' +
          '[data-stats="item"].is-active .stats_item_bg_wrap{' +
            'opacity:1;' +
          '}' +
          '@media (pointer:coarse){' +
            '[data-dot-hover]::after{' +
              'opacity:' + dotConfig.touchOpacity + ';' +
            '}' +
          '}' +
          '@media (max-width:' + mobileBreakpoint + 'px){' +
            '[data-globe="2"]{' +
              'height:auto;' +
              'min-height:100vh;' +
            '}' +
            '[data-globe="2"] .stats_component{' +
              'position:relative;' +
              'top:auto;' +
              'height:auto;' +
            '}' +
            '[data-stats="scrolloffset"]{' +
              'display:none;' +
            '}' +
            '[data-stats="list"]{' +
              'display:flex;' +
              'flex-direction:column;' +
              'gap:' + statsConfig.mobileGapRem + 'rem;' +
              'padding:' + statsConfig.mobilePadding + ';' +
            '}' +
            '[data-stats="item"]{' +
              'position:relative;' +
              'left:auto !important;' +
              'top:auto !important;' +
              'width:100%;' +
              'max-width:' + statsConfig.mobileMaxWidth + ';' +
              'margin-inline:auto;' +
              'opacity:1 !important;' +
              'transform:none !important;' +
            '}' +
            '[data-stats="item"] .stats_item_para,' +
            '[data-stats="item"] .stats_item_bg_wrap{' +
              'opacity:1;' +
            '}' +
          '}';
        document.head.appendChild(dotStyles);
      }
  
      var dotCards = document.querySelectorAll("[data-dot-hover]");
  
      dotCards.forEach(function (card) {
        if (card.dataset.dotHoverReady === "true") return;
        card.dataset.dotHoverReady = "true";
  
        card.addEventListener("pointermove", function (event) {
          var rect = card.getBoundingClientRect();
          var x = event.clientX - rect.left;
          var y = event.clientY - rect.top;
  
          card.style.setProperty("--dot-x", x.toFixed(1) + "px");
          card.style.setProperty("--dot-y", y.toFixed(1) + "px");
        });
      });
    }
  
    initDotHoverCards();
  
    /*
     * Scroll-driven radial stats carousel.
     *
     * Relative card states:
     *  - negative: the card has passed, grows, then leaves the viewport
     *  - zero:     active card
     *  - positive: upcoming cards, progressively smaller
     */
    function initRadialStats() {
      var statsConfig = CFG.tuning.statsCards;
      var mobileBreakpoint = CFG.tuning.mobileBreakpoint;
      var statsSection = document.querySelector('[data-globe="2"]');
      var scrollOffset = document.querySelector('[data-stats="scrolloffset"]');
      var statsList = document.querySelector('[data-stats="list"]');
  
      if (!statsSection || !scrollOffset || !statsList) return;
  
      var cards = Array.prototype.slice.call(
        statsList.querySelectorAll('[data-stats="item"]')
      );
  
      if (!cards.length) return;
  
      function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
      }
  
      function sampleRadialPath(distance) {
        /*
         * Every card is sampled from the same true ellipse.
         *
         * The active card is at -25 degrees. Each relative card position advances
         * another 28 degrees clockwise around the ellipse.
         */
        var d = clamp(
          distance,
          statsConfig.minDistance,
          statsConfig.maxDistance
        );
        var angle =
          (
            statsConfig.activeAngleDeg +
            d * statsConfig.angleStepDeg
          ) *
          Math.PI /
          180;
  
        var centerX = statsConfig.centerX;
        var centerY = statsConfig.centerY;
        var radiusX = statsConfig.radiusX;
        var radiusY = statsConfig.radiusY;
  
        var scale;
        var opacity;
  
        if (d < 0) {
          /*
           * Passed cards grow as they travel toward the upper-left exit.
           */
          var past = clamp(-d, 0, 1);
          scale =
            1 +
            past * statsConfig.pastScaleGrowth;
          opacity = 1 - past;
        } else {
          /*
           * Upcoming cards become progressively smaller along the lower arc.
           */
          scale =
            1 /
            (
              1 +
              d * statsConfig.upcomingScaleRate
            );
          opacity = Math.max(
            statsConfig.minimumUpcomingOpacity,
            1 /
              (
                1 +
                d * statsConfig.upcomingOpacityRate
              )
          );
        }
  
        return {
          x: centerX + Math.cos(angle) * radiusX,
          y: centerY + Math.sin(angle) * radiusY,
          scale: scale,
          opacity: opacity
        };
      }
  
      var frameRequested = false;
  
      function renderRadialStats() {
        frameRequested = false;
  
        if (window.innerWidth <= mobileBreakpoint) {
          cards.forEach(function (card) {
            card.classList.remove("is-active");
            card.removeAttribute("data-stats-state");
            card.style.removeProperty("left");
            card.style.removeProperty("top");
            card.style.removeProperty("transform");
            card.style.removeProperty("opacity");
            card.style.removeProperty("z-index");
  
            var mobileBackground = card.querySelector(".stats_item_bg_wrap");
            if (mobileBackground) {
              mobileBackground.style.removeProperty("opacity");
            }
          });
  
          return;
        }
  
        var sectionTop =
          statsSection.getBoundingClientRect().top +
          window.pageYOffset;
  
        var travel = Math.max(1, scrollOffset.offsetHeight);
        var sectionProgress = clamp(
          (window.pageYOffset - sectionTop) / travel,
          0,
          1
        );
  
        var cardProgress = sectionProgress * (cards.length - 1);
        var activeIndex = Math.round(cardProgress);
  
        cards.forEach(function (card, index) {
          var distance = index - cardProgress;
          var state = sampleRadialPath(distance);
          var isActive = index === activeIndex;
          var background = card.querySelector(".stats_item_bg_wrap");
  
          card.style.left = state.x.toFixed(3) + "%";
          card.style.top = state.y.toFixed(3) + "%";
          card.style.transform =
            "translate(-50%,-50%) scale(" +
            state.scale.toFixed(4) +
            ")";
          card.style.opacity = state.opacity.toFixed(4);
          card.style.zIndex = String(100 - Math.round(Math.abs(distance) * 10));
  
          card.classList.toggle("is-active", isActive);
          card.setAttribute(
            "data-stats-state",
            isActive ? "active" : (distance < 0 ? "past" : "upcoming")
          );
  
          if (background) {
            /*
             * Visibility is controlled by the is-active class so non-active
             * cards contain only their heading.
             */
            background.style.removeProperty("opacity");
          }
        });
      }
  
      function requestRadialRender() {
        if (frameRequested) return;
        frameRequested = true;
        requestAnimationFrame(renderRadialStats);
      }
  
      window.addEventListener("scroll", requestRadialRender, { passive:true });
      window.addEventListener("resize", requestRadialRender);
  
      renderRadialStats();
    }
  
    initRadialStats();
  
    resize();
    measure();
  
    setTimeout(measure, 600);
    setTimeout(measure, 1800);
  
    requestAnimationFrame(loop);
  })();
  
  
