let toString = Object.prototype.toString;
let class2type = {};
"Boolean Number String Function Array Date RegExp Object".split(" ").forEach(function (name, i) {
  class2type["[object " + name + "]"] = name.toLowerCase();
});

export function type(obj) {
  return obj == null
      ? String(obj)
      : class2type[toString.call(obj)] || "object";
}