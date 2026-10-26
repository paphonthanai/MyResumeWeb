// Real on-site and desk photos for the "ผลงานจริง" gallery (th/en).
//
// Image files live in src/components/image/work/: `<id>.webp` (full, ≤1400px)
// and `<id>-t.webp` (grid thumbnail, ≤640px). They were exported from the
// owner's own photos/videos with all EXIF/GPS metadata stripped; video
// entries are still frames taken from the clip.

export const categories = [
  { id: 'all', th: 'ทั้งหมด', en: 'All' },
  { id: 'robotics', th: 'หุ่นยนต์และอิเล็กทรอนิกส์', en: 'Robotics & electronics' },
  { id: 'network', th: 'กล้องวงจรปิดและเครือข่าย', en: 'CCTV & networking' },
  { id: 'hardware', th: 'ซ่อมและอัปเกรดฮาร์ดแวร์', en: 'Hardware repair' },
  { id: 'software', th: 'ซอฟต์แวร์และระบบ', en: 'Software & systems' },
  { id: 'security', th: 'Cybersecurity / CTF', en: 'Cybersecurity / CTF' },
  { id: 'design', th: 'ออกแบบกราฟิก', en: 'Graphic design' },
]

export const items = [
  { id: 'robot-arm-tracked', cat: 'robotics', th: 'แขนกลบนฐานตีนตะขาบ', en: 'Robot arm on a tracked chassis' },
  { id: 'robot-wiring', cat: 'robotics', th: 'ประกอบและเดินสายหุ่นยนต์', en: 'Assembling and wiring a robot' },
  { id: 'robot-arm-red', cat: 'robotics', th: 'แขนกลพร้อมชุดควบคุม', en: 'Robotic arm with its controller' },
  { id: 'robot-arduino', cat: 'robotics', th: 'วงจรควบคุมด้วย Arduino', en: 'Arduino control wiring' },
  { id: 'robot-test', cat: 'robotics', th: 'ทดสอบระบบขับเคลื่อน', en: 'Testing the drive system' },
  { id: 'pcb-solder', cat: 'robotics', th: 'บัดกรีบอร์ดวงจร', en: 'Soldering a circuit board' },
  { id: 'printer-3d', cat: 'robotics', th: 'พิมพ์ชิ้นส่วนด้วย 3D Printer', en: '3D printing parts' },
  { id: 'robot-arm-kit', cat: 'robotics', th: 'ชุดแขนกลสำหรับสอน', en: 'Robot arm teaching kit' },

  { id: 'cctv-mount', cat: 'network', th: 'ติดตั้งกล้องวงจรปิดหน้างาน', en: 'Mounting CCTV cameras on site' },
  { id: 'cctv-cable', cat: 'network', th: 'เดินสายสัญญาณตามแนวชายคา', en: 'Running cable along the eaves' },
  { id: 'cctv-nvr', cat: 'network', th: 'ติดตั้งเครื่องบันทึก NVR', en: 'Installing the NVR recorder' },
  { id: 'cctv-high', cat: 'network', th: 'ติดตั้งอุปกรณ์บนจุดสูง', en: 'Installing equipment up high' },
  { id: 'cctv-feeds', cat: 'network', th: 'ตรวจภาพกล้องทุกจุดก่อนส่งมอบ', en: 'Checking every feed before handover' },
  { id: 'cctv-monitor', cat: 'network', th: 'จอมอนิเตอร์กล้องวงจรปิด', en: 'CCTV monitoring station' },
  { id: 'network-blueprint', cat: 'network', th: 'ผังระบบเครือข่ายและกล้อง', en: 'Network & CCTV logical blueprint' },
  { id: 'router-config', cat: 'network', th: 'ตั้งค่าเราเตอร์และเครือข่าย', en: 'Router and network configuration' },

  { id: 'pc-build', cat: 'hardware', th: 'จัดสเปกและประกอบคอมพิวเตอร์', en: 'Custom PC build' },
  { id: 'server-dell', cat: 'hardware', th: 'ดูแลเซิร์ฟเวอร์ Dell PowerEdge', en: 'Servicing a Dell PowerEdge server' },
  { id: 'laptop-os', cat: 'hardware', th: 'ลงระบบปฏิบัติการโน้ตบุ๊ก', en: 'Reinstalling a laptop OS' },
  { id: 'ssd-upgrade', cat: 'hardware', th: 'อัปเกรด SSD โน้ตบุ๊ก', en: 'Laptop SSD upgrade' },
  { id: 'board-repair', cat: 'hardware', th: 'ตรวจซ่อมเมนบอร์ด', en: 'Motherboard diagnosis' },
  { id: 'laptop-board', cat: 'hardware', th: 'ซ่อมบอร์ดโน้ตบุ๊ก', en: 'Laptop board repair' },
  { id: 'desktop-gpu', cat: 'hardware', th: 'ตรวจเช็กคอมพิวเตอร์ตั้งโต๊ะ', en: 'Desktop PC servicing' },
  { id: 'appliance-repair', cat: 'hardware', th: 'ซ่อมเครื่องใช้ไฟฟ้า', en: 'Appliance repair' },

  { id: 'flutter-dev', cat: 'software', th: 'พัฒนาแอปมือถือด้วย Flutter', en: 'Building a Flutter mobile app' },
  { id: 'cctv-app', cat: 'software', th: 'แอป Operator ดูภาพกล้องและ ANPR', en: 'Operator app with CCTV and ANPR' },
  { id: 'cctv-web', cat: 'software', th: 'เว็บแดชบอร์ดกล้องวงจรปิด', en: 'CCTV web dashboard' },
  { id: 'driver-app', cat: 'software', th: 'แอปคนขับสำหรับระบบขนส่ง', en: 'Driver app for a transport system' },
  { id: 'karaoke-studio', cat: 'software', th: 'โปรแกรม Karaoke DVD Studio', en: 'Karaoke DVD Studio desktop app' },
  { id: 'algo-flowchart', cat: 'software', th: 'ออกแบบ Flowchart อัลกอริทึม', en: 'Algorithm flowchart design' },
  { id: 'app-flow', cat: 'software', th: 'ผังการทำงานของแอป', en: 'App screen flow' },
  { id: 'data-analysis', cat: 'software', th: 'วิเคราะห์ข้อมูลด้วย Python', en: 'Data analysis in Python' },

  { id: 'ctf-group', cat: 'security', th: 'ร่วมกิจกรรมแข่งขัน Cybersecurity', en: 'Cybersecurity competition' },
  { id: 'ctf-room', cat: 'security', th: 'บรรยากาศห้องแข่งขัน CTF', en: 'In the CTF competition room' },
  { id: 'ctf-flag', cat: 'security', th: 'ถอดรหัสหา Flag', en: 'Decoding a CTF flag' },
  { id: 'ctf-setup', cat: 'security', th: 'โต๊ะทำงานฝึก Ethical Hacking', en: 'Ethical hacking practice setup' },
  { id: 'ctf-pin', cat: 'security', th: 'ได้รับเข็มกลัดจากการแข่งขัน', en: 'Competition pin' },

  { id: 'design-ragnarok', cat: 'design', th: 'ออกแบบโลโก้และแบนเนอร์เกม', en: 'Game logo and banner design' },
  { id: 'design-mascot', cat: 'design', th: 'ออกแบบมาสคอต', en: 'Mascot illustration' },
  { id: 'design-logo', cat: 'design', th: 'ออกแบบตราสัญลักษณ์', en: 'Emblem design' },
]
