export function setAttribute(node, name, value) {
  value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
}