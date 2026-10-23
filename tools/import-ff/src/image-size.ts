/** อ่านขนาดรูป PNG / JPEG จาก header ของไฟล์ (ไม่ต้องพึ่ง sharp) */
export function imageSize(buf: Buffer): { w: number; h: number } | undefined {
  // PNG: IHDR อยู่ที่ byte 16
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) }
  }
  // JPEG: ไล่ marker จนเจอ SOFn (C0–CF ยกเว้น C4 DHT, C8 JPG, CC DAC)
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let o = 2
    while (o + 9 < buf.length) {
      if (buf[o] !== 0xff) return undefined
      const marker = buf[o + 1]
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { h: buf.readUInt16BE(o + 5), w: buf.readUInt16BE(o + 7) }
      }
      o += 2 + buf.readUInt16BE(o + 2)
    }
  }
  return undefined
}
