export function RGBAToHex(_r: number,_g: number,_b: number,_a: number): string {
  let r = _r.toString(16)
  let g = _g.toString(16)
  let b = _b.toString(16)
  let a = Math.round(_a * 255).toString(16)

  if (r.length == 1)
    r = "0" + r
  if (g.length == 1)
    g = "0" + g
  if (b.length == 1)
    b = "0" + b
  if (a.length == 1)
    a = "0" + a

  return "#" + r + g + b + a
}
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export function hexToRGBA(hex: string, opacity: number): string {
  return "rgba(" + (hex = hex.replace("#", "")).match(new RegExp("(.{" + hex.length / 3 + "})", "g")).map(function(l) { return parseInt(hex.length % 2 ? l + l : l, 16) })
    .concat(isFinite(opacity) ? opacity : 1)
    .join(",") + ")"
}
