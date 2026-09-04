import { R as React, r as reactExports } from "./react.mjs";
import { P as PropTypes } from "./prop-types.mjs";
import { f as feature } from "./topojson-client.mjs";
import { g as geoPath, a as geoConicEquidistant, b as geoConicEqualArea, c as geoConicConformal, d as geoOrthographic, e as geoAzimuthalEquidistant, f as geoAzimuthalEqualArea, h as geoAlbersUsa, i as geoAlbers, j as geoTransverseMercator, k as geoMercator, l as geoEqualEarth, m as graticule } from "./d3-geo.mjs";
var _extends = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var objectWithoutProperties = function(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
};
var slicedToArray = /* @__PURE__ */ (function() {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = void 0;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
})();
var MapContext = reactExports.createContext();
var projections = {
  geoEqualEarth,
  geoMercator,
  geoTransverseMercator,
  geoAlbers,
  geoAlbersUsa,
  geoAzimuthalEqualArea,
  geoAzimuthalEquidistant,
  geoOrthographic,
  geoConicConformal,
  geoConicEqualArea,
  geoConicEquidistant
};
var makeProjection = function makeProjection2(_ref) {
  var _ref$projectionConfig = _ref.projectionConfig, projectionConfig = _ref$projectionConfig === void 0 ? {} : _ref$projectionConfig, _ref$projection = _ref.projection, projection = _ref$projection === void 0 ? "geoEqualEarth" : _ref$projection, _ref$width = _ref.width, width = _ref$width === void 0 ? 800 : _ref$width, _ref$height = _ref.height, height = _ref$height === void 0 ? 500 : _ref$height;
  var isFunc = typeof projection === "function";
  if (isFunc) return projection;
  var proj = projections[projection]().translate([width / 2, height / 2]);
  var supported = [proj.center ? "center" : null, proj.rotate ? "rotate" : null, proj.scale ? "scale" : null, proj.parallels ? "parallels" : null];
  supported.forEach(function(d) {
    if (!d) return;
    proj = proj[d](projectionConfig[d] || proj[d]());
  });
  return proj;
};
var MapProvider = function MapProvider2(_ref2) {
  var width = _ref2.width, height = _ref2.height, projection = _ref2.projection, projectionConfig = _ref2.projectionConfig, restProps = objectWithoutProperties(_ref2, ["width", "height", "projection", "projectionConfig"]);
  var c = projectionConfig.center || [];
  var r = projectionConfig.rotate || [];
  var p = projectionConfig.parallels || [];
  var s = projectionConfig.scale || null;
  var value = reactExports.useMemo(function() {
    var proj = makeProjection({
      projectionConfig,
      projection,
      width,
      height
    });
    return {
      width,
      height,
      projection: proj,
      path: geoPath().projection(proj)
    };
  }, [width, height, projection, c[0], c[1], r[0], r[1], r[2], p[0], p[1], s]);
  return React.createElement(MapContext.Provider, _extends({ value }, restProps));
};
MapProvider.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  projection: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  projectionConfig: PropTypes.object
};
var ComposableMap = function ComposableMap2(_ref) {
  var _ref$width = _ref.width, width = _ref$width === void 0 ? 800 : _ref$width, _ref$height = _ref.height, height = _ref$height === void 0 ? 600 : _ref$height, _ref$projection = _ref.projection, projection = _ref$projection === void 0 ? "geoEqualEarth" : _ref$projection, _ref$projectionConfig = _ref.projectionConfig, projectionConfig = _ref$projectionConfig === void 0 ? {} : _ref$projectionConfig, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className, restProps = objectWithoutProperties(_ref, ["width", "height", "projection", "projectionConfig", "className"]);
  return React.createElement(
    MapProvider,
    {
      width,
      height,
      projection,
      projectionConfig
    },
    React.createElement("svg", _extends({
      viewBox: "0 0 " + width + " " + height,
      className: "rsm-svg " + className
    }, restProps))
  );
};
ComposableMap.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  projection: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  projectionConfig: PropTypes.object,
  className: PropTypes.string
};
function fetchGeographies(url) {
  return fetch(url).then(function(res) {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res.json();
  }).catch(function(error) {
    console.log("There was a problem when fetching the data: ", error);
  });
}
function getFeatures(geographies, parseGeographies) {
  if (Array.isArray(geographies)) return parseGeographies ? parseGeographies(geographies) : geographies;
  var feats = feature(geographies, geographies.objects[Object.keys(geographies.objects)[0]]).features;
  return parseGeographies ? parseGeographies(feats) : feats;
}
function prepareFeatures(geographies, path) {
  return geographies ? geographies.map(function(d, i) {
    return _extends({}, d, {
      rsmKey: "geo-" + i,
      svgPath: path(d)
    });
  }) : [];
}
function isString(geo) {
  return typeof geo === "string";
}
function useGeographies(_ref) {
  var geography = _ref.geography, parseGeographies = _ref.parseGeographies;
  var _useContext = reactExports.useContext(MapContext), path = _useContext.path;
  var _useState = reactExports.useState(), _useState2 = slicedToArray(_useState, 2), geographies = _useState2[0], setGeographies = _useState2[1];
  reactExports.useEffect(function() {
    if (typeof window === "undefined") return;
    if (isString(geography)) {
      fetchGeographies(geography).then(function(geos) {
        if (geos) setGeographies(getFeatures(geos, parseGeographies));
      });
    } else {
      setGeographies(getFeatures(geography, parseGeographies));
    }
  }, [geography]);
  var output = reactExports.useMemo(function() {
    return prepareFeatures(geographies, path);
  }, [geographies, path]);
  return { geographies: output };
}
var Geographies = function Geographies2(_ref) {
  var geography = _ref.geography, children = _ref.children, parseGeographies = _ref.parseGeographies, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className, restProps = objectWithoutProperties(_ref, ["geography", "children", "parseGeographies", "className"]);
  var _useContext = reactExports.useContext(MapContext), path = _useContext.path, projection = _useContext.projection;
  var _useGeographies = useGeographies({ geography, parseGeographies }), geographies = _useGeographies.geographies;
  return React.createElement(
    "g",
    _extends({ className: "rsm-geographies " + className }, restProps),
    geographies && geographies.length > 0 && children({ geographies, path, projection })
  );
};
Geographies.propTypes = {
  geography: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
  children: PropTypes.func,
  parseGeographies: PropTypes.func,
  className: PropTypes.string
};
var Geography = function Geography2(_ref) {
  var geography = _ref.geography, onMouseEnter = _ref.onMouseEnter, onMouseLeave = _ref.onMouseLeave, onMouseDown = _ref.onMouseDown, onMouseUp = _ref.onMouseUp, onFocus = _ref.onFocus, onBlur = _ref.onBlur, _ref$style = _ref.style, style = _ref$style === void 0 ? {} : _ref$style, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className, restProps = objectWithoutProperties(_ref, ["geography", "onMouseEnter", "onMouseLeave", "onMouseDown", "onMouseUp", "onFocus", "onBlur", "style", "className"]);
  var _useState = reactExports.useState(false), _useState2 = slicedToArray(_useState, 2), isPressed = _useState2[0], setPressed = _useState2[1];
  var _useState3 = reactExports.useState(false), _useState4 = slicedToArray(_useState3, 2), isFocused = _useState4[0], setFocus = _useState4[1];
  function handleMouseEnter(evt) {
    setFocus(true);
    if (onMouseEnter) onMouseEnter(evt);
  }
  function handleMouseLeave(evt) {
    setFocus(false);
    if (isPressed) setPressed(false);
    if (onMouseLeave) onMouseLeave(evt);
  }
  function handleFocus(evt) {
    setFocus(true);
    if (onFocus) onFocus(evt);
  }
  function handleBlur(evt) {
    setFocus(false);
    if (isPressed) setPressed(false);
    if (onBlur) onBlur(evt);
  }
  function handleMouseDown(evt) {
    setPressed(true);
    if (onMouseDown) onMouseDown(evt);
  }
  function handleMouseUp(evt) {
    setPressed(false);
    if (onMouseUp) onMouseUp(evt);
  }
  return React.createElement("path", _extends({
    role: "geography",
    tabIndex: "0",
    className: "rsm-geography " + className,
    d: geography.svgPath,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    style: style[isPressed || isFocused ? isPressed ? "pressed" : "hover" : "default"]
  }, restProps));
};
Geography.propTypes = {
  geography: PropTypes.object,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string
};
var Geography$1 = reactExports.memo(Geography);
var Graticule = function Graticule2(_ref) {
  var _ref$fill = _ref.fill, fill = _ref$fill === void 0 ? "transparent" : _ref$fill, _ref$stroke = _ref.stroke, stroke = _ref$stroke === void 0 ? "currentcolor" : _ref$stroke, _ref$step = _ref.step, step = _ref$step === void 0 ? [10, 10] : _ref$step, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className, restProps = objectWithoutProperties(_ref, ["fill", "stroke", "step", "className"]);
  var _useContext = reactExports.useContext(MapContext), path = _useContext.path;
  return React.createElement("path", _extends({
    d: path(graticule().step(step)()),
    fill,
    stroke,
    className: "rsm-graticule " + className
  }, restProps));
};
Graticule.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  step: PropTypes.array,
  className: PropTypes.string
};
reactExports.memo(Graticule);
({
  render: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  center: PropTypes.array,
  zoom: PropTypes.number,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  zoomSensitivity: PropTypes.number,
  onZoomStart: PropTypes.func,
  onZoomEnd: PropTypes.func,
  onMoveStart: PropTypes.func,
  onMoveEnd: PropTypes.func,
  disablePanning: PropTypes.bool,
  disableZooming: PropTypes.bool,
  className: PropTypes.string
});
var Sphere = function Sphere2(_ref) {
  var _ref$id = _ref.id, id = _ref$id === void 0 ? "rsm-sphere" : _ref$id, _ref$fill = _ref.fill, fill = _ref$fill === void 0 ? "transparent" : _ref$fill, _ref$stroke = _ref.stroke, stroke = _ref$stroke === void 0 ? "currentcolor" : _ref$stroke, _ref$strokeWidth = _ref.strokeWidth, strokeWidth = _ref$strokeWidth === void 0 ? 0.5 : _ref$strokeWidth, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className, restProps = objectWithoutProperties(_ref, ["id", "fill", "stroke", "strokeWidth", "className"]);
  var _useContext = reactExports.useContext(MapContext), path = _useContext.path;
  var spherePath = reactExports.useMemo(function() {
    return path({ type: "Sphere" });
  }, [path]);
  return React.createElement(
    reactExports.Fragment,
    null,
    React.createElement(
      "defs",
      null,
      React.createElement(
        "clipPath",
        { id },
        React.createElement("path", { d: spherePath })
      )
    ),
    React.createElement("path", _extends({
      d: spherePath,
      fill,
      stroke,
      strokeWidth,
      style: { pointerEvents: "none" },
      className: "rsm-sphere " + className
    }, restProps))
  );
};
Sphere.propTypes = {
  id: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  className: PropTypes.string
};
reactExports.memo(Sphere);
var Marker = function Marker2(_ref) {
  var coordinates = _ref.coordinates, children = _ref.children, onMouseEnter = _ref.onMouseEnter, onMouseLeave = _ref.onMouseLeave, onMouseDown = _ref.onMouseDown, onMouseUp = _ref.onMouseUp, onFocus = _ref.onFocus, onBlur = _ref.onBlur, _ref$style = _ref.style, style = _ref$style === void 0 ? {} : _ref$style, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className, restProps = objectWithoutProperties(_ref, ["coordinates", "children", "onMouseEnter", "onMouseLeave", "onMouseDown", "onMouseUp", "onFocus", "onBlur", "style", "className"]);
  var _useContext = reactExports.useContext(MapContext), projection = _useContext.projection;
  var _useState = reactExports.useState(false), _useState2 = slicedToArray(_useState, 2), isPressed = _useState2[0], setPressed = _useState2[1];
  var _useState3 = reactExports.useState(false), _useState4 = slicedToArray(_useState3, 2), isFocused = _useState4[0], setFocus = _useState4[1];
  var _projection = projection(coordinates), _projection2 = slicedToArray(_projection, 2), x = _projection2[0], y = _projection2[1];
  function handleMouseEnter(evt) {
    setFocus(true);
    if (onMouseEnter) onMouseEnter(evt);
  }
  function handleMouseLeave(evt) {
    setFocus(false);
    if (isPressed) setPressed(false);
    if (onMouseLeave) onMouseLeave(evt);
  }
  function handleFocus(evt) {
    setFocus(true);
    if (onFocus) onFocus(evt);
  }
  function handleBlur(evt) {
    setFocus(false);
    if (isPressed) setPressed(false);
    if (onBlur) onBlur(evt);
  }
  function handleMouseDown(evt) {
    setPressed(true);
    if (onMouseDown) onMouseDown(evt);
  }
  function handleMouseUp(evt) {
    setPressed(false);
    if (onMouseUp) onMouseUp(evt);
  }
  return React.createElement(
    "g",
    _extends({
      transform: "translate(" + x + ", " + y + ")",
      className: "rsm-marker " + className,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      style: style[isPressed || isFocused ? isPressed ? "pressed" : "hover" : "default"]
    }, restProps),
    children
  );
};
Marker.propTypes = {
  coordinates: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string
};
({
  from: PropTypes.array,
  to: PropTypes.array,
  coordinates: PropTypes.array,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  fill: PropTypes.string,
  className: PropTypes.string
});
({
  subject: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  dx: PropTypes.number,
  dy: PropTypes.number,
  curve: PropTypes.number,
  connectorProps: PropTypes.object,
  className: PropTypes.string
});
export {
  ComposableMap as C,
  Geographies as G,
  Marker as M,
  Geography$1 as a
};
