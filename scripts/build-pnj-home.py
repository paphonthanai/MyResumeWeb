"""Build the PNJ Tech homepage from ThreeUI's Sublevel Studio landing page.

Reads the byte-exact source, public/landing-pages/sublevel-studio.html, and
writes two adapted copies with PNJ Tech's own content:

    public/landing-pages/pnj-home.html      (Thai, served at /)
    public/landing-pages/pnj-home-en.html   (English, served at /en)

Only content changes: brand names, copy, project cards, client names,
capabilities, contact details, links, the text drawn on the 3D scene's
signs, and the CRT portfolio (now our own photos). Layout, styles, shaders,
the 3D room and all interactions stay as authored.

Photos are copied from src/components/image/work/ to
public/landing-pages/pnj/ and loaded by URL instead of being inlined.

Run from the repository root:  python scripts/build-pnj-home.py
"""
import html
import json
import re
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'public/landing-pages/sublevel-studio.html'
OUT_DIR = ROOT / 'public/landing-pages'
IMG_OUT = OUT_DIR / 'pnj'
WORK = ROOT / 'src/components/image/work'
EMAIL = 'Pj06052538@gmail.com'

ARROW = '<svg viewBox="0 0 20 20"><path d="m11.1075 14.2752 4.2763-4.29004-4.2625-4.2625h1.9112l4.2625 4.27625-4.2763 4.27629h-1.9112ZM2.5 10.8102V9.17391h13.8188v1.63629H2.5Z"/></svg>'
CORNERS = '<i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>'

# ---------------------------------------------------------------- content

CLIENTS = {
    'th': ['เฟิร์สท เทเลคอม ซีสเต็ม', 'เคียวเออิ (ประเทศไทย)', 'โฮม ดี ดี', 'โฮดากะ อีเอส (ประเทศไทย)', 'มิตรกาญ', 'สหกรณ์ออมทรัพย์ ตชด. 24'],
    'en': ['First Telecom System', 'Kyoei (Thailand)', 'Home DD', 'Hodaka ES (Thailand)', 'Mitkarn', 'BPP24 Savings Cooperative'],
}

# (photo id, link, {lang: (categories, title, description)})
PROJECTS = [
    ('driver-app', '/skills', {
        'th': ('Web · Mobile · ขนส่ง', 'Grab-Truck', 'ระบบบริหารงานขนส่งและงานภายในองค์กร ทั้งเว็บแพลตฟอร์มและแอปมือถือ ใช้งานจริงที่บริษัทมิตรกาญ'),
        'en': ('Web · Mobile · Logistics', 'Grab-Truck', 'A web platform and mobile app for transport and internal operations, in daily use at Mitkarn.'),
    }),
    ('coop-app-home', '/projects', {
        'th': ('Flutter · OTP · แบบฟอร์ม', 'แอปสหกรณ์ ตชด. 24', 'แอปของสหกรณ์ออมทรัพย์ตำรวจตระเวนชายแดนที่ 24 กรอกฟอร์มทีละขั้นและเข้าใช้งานด้วย OTP'),
        'en': ('Flutter · OTP · Forms', 'BPP24 Cooperative App', 'A savings cooperative app with step-by-step forms and OTP sign-in, built for the Border Patrol Police cooperative.'),
    }),
    ('web-vue', '/skills', {
        'th': ('Vue · Firebase · Dashboard', 'First Telecom', 'แดชบอร์ดหลายบทบาท อัปเดตแบบเรียลไทม์ พร้อมกฎความปลอดภัยของ Firestore ให้บริษัท เฟิร์สท เทเลคอม ซีสเต็ม'),
        'en': ('Vue · Firebase · Dashboard', 'First Telecom', 'Multi-role, real-time dashboards with Firestore security rules for First Telecom System.'),
    }),
    ('cctv-mount', '/gallery', {
        'th': ('CCTV · Network · หน้างาน', 'กล้องวงจรปิดและเครือข่าย', 'ติดตั้งกล้อง เดินสายสัญญาณ และตั้งค่าเครื่องบันทึก NVR ที่หน้างานจริง'),
        'en': ('CCTV · Network · On site', 'CCTV & networking', 'Mounting cameras, running cable and setting up NVR recorders on real sites.'),
    }),
    ('robot-arm-red', '/iot', {
        'th': ('IoT · Robotics · R&D', 'แขนกลและหุ่นยนต์', 'ออกแบบ พิมพ์ชิ้นส่วน 3 มิติ เดินสาย และเขียนโปรแกรมควบคุมเองทุกขั้นตอน'),
        'en': ('IoT · Robotics · R&D', 'Robot arms & robots', 'Designed, 3D printed, wired and programmed in-house, every step of the way.'),
    }),
    ('app-flow', '/skills', {
        'th': ('API · Backend · การเงิน', 'Home DD', 'ระบบ API เชื่อมต่อธนาคารเพื่อค้นหาสินเชื่อ ให้บริษัท โฮม ดี ดี'),
        'en': ('API · Backend · Finance', 'Home DD', 'An API that connects to banks to search for loans, built for Home DD.'),
    }),
    ('board-repair', '/gallery', {
        'th': ('ซ่อม · อัปเกรด · ฮาร์ดแวร์', 'ซ่อมและอัปเกรดเครื่อง', 'ซ่อมบอร์ด อัปเกรดการ์ดจอ แรม และ SSD ให้เครื่องเก่ากลับมาใช้งานได้'),
        'en': ('Repair · Upgrade · Hardware', 'Repair & upgrades', 'Board repair and GPU, RAM and SSD upgrades that bring old machines back.'),
    }),
    ('ctf-group', '/gallery', {
        'th': ('Security · CTF · อบรม', 'Cyber Security', 'อบรมและแข่ง CTF พร้อมวิเคราะห์ช่องโหว่และวางมาตรการรักษาความปลอดภัยให้องค์กร'),
        'en': ('Security · CTF · Training', 'Cyber Security', 'CTF training and competitions, plus vulnerability reviews and security measures for companies.'),
    }),
]

# (link, {lang: (title, description, [tags])})
CAPS = [
    ('/projects', {
        'th': ('แอป Android และ iOS', 'แอปสำหรับองค์กรและหน่วยงาน ตั้งแต่ฟอร์มทีละขั้น การเข้าใช้งานด้วย OTP ไปจนถึงระบบที่กรรมการอนุมัติใช้งานจริง', ['Flutter', 'Dart', 'OTP', 'Firebase']),
        'en': ('Android & iOS apps', 'Apps for companies and agencies, from step-by-step forms and OTP sign-in to systems approved by the board.', ['Flutter', 'Dart', 'OTP', 'Firebase']),
    }),
    ('/website-builder', {
        'th': ('เว็บไซต์ ซอฟต์แวร์ และระบบจัดการ', 'เว็บบริษัท แดชบอร์ดหลายบทบาท API และระบบหลังบ้าน พร้อม CI/CD ให้ส่งมอบงานได้เร็ว', ['Vue.js', 'PHP', 'API', 'CI/CD']),
        'en': ('Websites, software & management systems', 'Company sites, multi-role dashboards, APIs and back offices, with CI/CD for fast, steady delivery.', ['Vue.js', 'PHP', 'API', 'CI/CD']),
    }),
    ('/gallery', {
        'th': ('กล้องวงจรปิดและระบบเครือข่าย', 'ติดตั้งกล้อง เดินสาย ตั้งค่า NVR และเราเตอร์ ให้ระบบดูภาพได้ทั้งหน้างานและบนมือถือ', ['CCTV', 'NVR', 'Router', 'เดินสาย']),
        'en': ('CCTV & networking', 'Cameras, cabling, NVR and router setup, so footage works on site and on your phone.', ['CCTV', 'NVR', 'Router', 'Cabling']),
    }),
    ('/iot', {
        'th': ('IoT แขนกล และหุ่นยนต์', 'งานวิจัยและพัฒนาที่ลงมือทำจริง ตั้งแต่เซนเซอร์ตัวเดียวไปจนถึงแขนกลทั้งชุด', ['Arduino', '3D Printing', 'Sensors', 'R&D']),
        'en': ('IoT, robot arms & robots', 'Hands-on R&D, from a single sensor to a complete robot arm.', ['Arduino', '3D Printing', 'Sensors', 'R&D']),
    }),
]

PAGES = {
    'th': [('#top', 'หน้าแรก'), ('/projects', 'ผลงาน'), ('/gallery', 'แกลเลอรี'), ('/skills', 'ทักษะ'), ('/process', 'ขั้นตอน'), ('/pricing', 'ราคา'), ('/iot', 'IoT'), ('/website-builder', 'สร้างเว็บไซต์'), ('/blog', 'บทความ'), ('/pricing#inquiry', 'ติดต่อ')],
    'en': [('#top', 'Home'), ('/projects', 'Projects'), ('/gallery', 'Gallery'), ('/skills', 'Skills'), ('/process', 'Process'), ('/pricing', 'Pricing'), ('/iot', 'IoT'), ('/en/website-builder', 'Website Builder'), ('/blog', 'Blog'), ('/pricing#inquiry', 'Contact')],
}

COPY = {
    'th': {
        'lang': 'th',
        'title': 'ปพนธนัย ใจมา (PNJ Tech) | Fullstack Developer Portfolio',
        'description': 'พอร์ตโฟลิโอของปพนธนัย ใจมา (PNJ Tech) นักพัฒนาฟรีแลนซ์ แอป Android และ iOS เว็บไซต์และระบบจัดการ กล้องวงจรปิดและเครือข่าย IoT แขนกล และหุ่นยนต์',
        'nav': ['Home', 'Work', 'Services', 'Lab'],
        'eyebrow': ('PNJ Tech — studio index', 'Freelance · 5+ ปี'),
        'h1': 'นักพัฒนาที่สร้างระบบใช้งานจริง ตั้งแต่เว็บ แอป ไปจนถึงหุ่นยนต์',
        'lede': 'ทำงานกับธุรกิจ องค์กร และหน่วยงาน เปลี่ยนโจทย์จริงให้เป็นแอป เว็บไซต์ ระบบเครือข่าย และงาน IoT ที่ส่งมอบและใช้งานได้จริง',
        'trusted': 'ลูกค้าที่เคยร่วมงาน',
        'featured': 'ผลงานที่ส่งมอบจริง',
        'featuredSub': 'แปดงานจากลูกค้าจริงและห้อง R&D ตั้งแต่ระบบขนส่ง แอปสหกรณ์ ไปจนถึงแขนกลและกล้องวงจรปิด',
        'view': 'ดูเพิ่มเติม',
        'caps': 'บริการ',
        'big': ('สร้างระบบที่ใช้งานได้จริง', 'ไม่มีทางลัด มีแต่งานที่ละเอียด ทดสอบกับการใช้งานจริง และดูแลต่อหลังส่งมอบ'),
        'contact': 'ติดต่อ',
        'contactLead': 'มาสร้างระบบที่ใช้ได้จริงด้วยกัน',
        'cardTag': 'ใบเสนอราคา — ไม่มีค่าใช้จ่าย',
        'cardTitle': 'มีโปรเจกต์ในใจ?',
        'cardSub': 'เล่าโจทย์มาได้เลย ตั้งแต่เว็บไซต์หน้าเดียวไปจนถึงระบบองค์กรหรือแขนกลทั้งชุด',
        'cardBtn': 'ขอใบเสนอราคา',
        'cardBtnSub': 'Quote',
        'cardFine': 'ราคาขึ้นกับขอบเขตงานจริง ประเมินแล้วส่งใบเสนอราคาให้',
        'menuFoot': ('Thailand · remote', 'Freelance · Web · App · IoT'),
        'loading': 'loading pnj tech',
        'copy': '© 2026 PNJ Tech. All rights reserved.',
    },
    'en': {
        'lang': 'en',
        'title': 'Paphonthanai Jaima (PNJ Tech) | Fullstack Developer Portfolio',
        'description': 'Portfolio of Paphonthanai Jaima (PNJ Tech), a freelance developer building Android and iOS apps, websites and management systems, CCTV and networks, IoT, robot arms and robots.',
        'nav': ['Home', 'Work', 'Services', 'Lab'],
        'eyebrow': ('PNJ Tech — studio index', 'Freelance · 5+ yrs'),
        'h1': 'A developer building real, working systems, from web and apps to robots',
        'lede': 'I work with businesses, companies and public agencies to turn real problems into apps, websites, networks and IoT that ship and stay in use.',
        'trusted': 'Clients I have worked with',
        'featured': 'Work that shipped',
        'featuredSub': 'Eight builds from real clients and the R&D bench, from a transport system and a cooperative app to robot arms and CCTV.',
        'view': 'See more',
        'caps': 'Services',
        'big': ('Systems that work in real use.', 'No shortcuts: careful work, tested against real use, and supported after handover.'),
        'contact': 'Contact',
        'contactLead': "Let's build something that works.",
        'cardTag': 'Quotation — free of charge',
        'cardTitle': 'Got a project in mind?',
        'cardSub': 'Tell me what you need, from a one-page website to a company system or a complete robot arm.',
        'cardBtn': 'Request a quote',
        'cardBtnSub': 'Quote',
        'cardFine': 'Pricing depends on the real scope. I estimate it and send a quotation.',
        'menuFoot': ('Thailand · remote', 'Freelance · Web · App · IoT'),
        'loading': 'loading pnj tech',
        'copy': '© 2026 PNJ Tech. All rights reserved.',
    },
}

# Plain-text index shown in the CRT "machine view" (and its screen-reader copy).
BANNER = [
    '████  █   █      █   █████ █████  ████ █   █',
    '█   █ ██  █      █     █   █     █     █   █',
    '████  █ █ █      █     █   ████  █     █████',
    '█     █  ██  █   █     █   █     █     █   █',
    '█     █   █   ███      █   █████  ████ █   █',
]
INDEX = [
    ('', 'p'),
    ('/PROJECTS  /GALLERY  /SKILLS  /PROCESS  /PRICING  /IOT  /BLOG', 'a'),
    ('', 'p'),
    ('PNJ TECH :: MACHINE-READABLE INDEX', 'p'),
    ('', 'p'),
    ('# PLAIN-TEXT MIRROR OF PNJ TECH FOR AI AGENTS, CRAWLERS, AND HUMANS WHO', 'd'),
    ('  PREFER IT RAW.', 'd'),
    ('', 'p'),
    ('── ABOUT ─────────────────────────────────────────────────────────', 'd'),
    ('NAME .......... PNJ TECH', 'p'),
    ('PERSON ........ PAPHONTHANAI JAIMA', 'p'),
    ('AKA ........... PNJ, NPJ.TECH', 'p'),
    ('LOCATION ...... THAILAND', 'p'),
    ('AREA_SERVED ... THAILAND, REMOTE', 'p'),
    ('EXPERIENCE .... 5+ YEARS FREELANCE, 10 YEARS IN ORGANIZATIONS,', 'p'),
    ('  20+ YEARS WITH COMPUTERS', 'p'),
    ('SERVICES ...... ANDROID AND IOS APPS, WEBSITES AND MANAGEMENT SYSTEMS,', 'p'),
    ('  CCTV AND NETWORKING, IOT, ROBOT ARMS AND ROBOTS', 'p'),
    ('CLIENTS ....... FIRST TELECOM SYSTEM, KYOEI (THAILAND), HOME DD,', 'p'),
    ('  HODAKA ES (THAILAND), MITKARN, BPP24 SAVINGS COOPERATIVE', 'p'),
    ('KNOWS_ABOUT ... VUE, FLUTTER, FIREBASE, PHP, PYTHON, API, CI/CD,', 'p'),
    ('  CCTV, NETWORKING, ARDUINO, SECURITY, CTF', 'p'),
    ('', 'p'),
    ('── CAPABILITIES ──────────────────────────────────────────────────', 'd'),
    ('* ANDROID & IOS APPS', 'p'),
    ('  [FLUTTER] [DART] [OTP] [FIREBASE]', 'd'),
    ('* WEBSITES, SOFTWARE & MANAGEMENT SYSTEMS', 'p'),
    ('  [VUE.JS] [PHP] [API] [CI/CD]', 'd'),
    ('* CCTV & NETWORKING', 'p'),
    ('  [CCTV] [NVR] [ROUTER] [CABLING]', 'd'),
    ('* IOT, ROBOT ARMS & ROBOTS', 'p'),
    ('  [ARDUINO] [3D PRINTING] [SENSORS] [R&D]', 'd'),
    ('', 'p'),
    ('── SELECTED_WORK ─────────────────────────────────────────────────', 'd'),
    ('- GRAB-TRUCK — TRANSPORT AND OPERATIONS SYSTEM, WEB AND MOBILE (MITKARN)', 'p'),
    ('- BPP24 COOPERATIVE APP — FLUTTER APP WITH STEP FORMS AND OTP SIGN-IN', 'p'),
    ('- FIRST TELECOM — MULTI-ROLE REAL-TIME DASHBOARDS ON VUE AND FIREBASE', 'p'),
    ('- HOME DD — BANK-CONNECTED API FOR LOAN SEARCH', 'p'),
    ('', 'p'),
    ('── LAB ───────────────────────────────────────────────────────────', 'd'),
    ('- PNJ DEFENDER — PLAYABLE ON THE ARCADE CABINET IN THE 3D LOBBY (CLICK IT).', 'p'),
    ('- PNJ SHOT — DRAG-TO-THROW BASKETBALL ON THE LOBBY HOOP (CLICK THE BOARD).', 'p'),
    ('', 'p'),
    ('── CONTACT ───────────────────────────────────────────────────────', 'd'),
    ('EMAIL ......... ' + EMAIL.upper(), 'p'),
    ('MESSENGER ..... M.ME/PAPHONTHANAI.NAME', 'p'),
    ('GITHUB ........ GITHUB.COM/PAPHONTHANAI', 'p'),
    ('QUOTE ......... /PRICING#INQUIRY', 'p'),
    ('', 'p'),
    ('pnj@lobby:~$ ', 'p'),
]

# Photos shown on the CRTs in the 3D room: (photo id, {lang: (title, kind, desc)})
SCREENS = [
    ('driver-app', {'th': ('Grab-Truck', 'Web · Mobile', 'ระบบงานขนส่ง ใช้งานจริงที่มิตรกาญ'), 'en': ('Grab-Truck', 'Web · Mobile', 'Transport system in daily use at Mitkarn.')}),
    ('coop-app-home', {'th': ('แอปสหกรณ์ ตชด. 24', 'Flutter · App', 'ฟอร์มทีละขั้นและ OTP'), 'en': ('BPP24 Cooperative App', 'Flutter · App', 'Step-by-step forms and OTP sign-in.')}),
    ('cctv-mount', {'th': ('กล้องวงจรปิด', 'CCTV · Network', 'ติดตั้งกล้องและเดินสายหน้างาน'), 'en': ('CCTV installs', 'CCTV · Network', 'Cameras and cabling on site.')}),
    ('robot-arm-red', {'th': ('แขนกล', 'IoT · Robotics', 'แขนกลพร้อมชุดควบคุม'), 'en': ('Robot arm', 'IoT · Robotics', 'A robot arm with its controller.')}),
    ('board-repair', {'th': ('ซ่อมบอร์ด', 'Hardware', 'ซ่อมและอัปเกรดเครื่อง'), 'en': ('Board repair', 'Hardware', 'Repairs and upgrades.')}),
    ('ctf-group', {'th': ('Cyber Security', 'Security · CTF', 'อบรมและแข่ง CTF'), 'en': ('Cyber Security', 'Security · CTF', 'CTF training and competitions.')}),
]

FACEBOOK = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M11.2 18v-6.6h2.2l.35-2.6H11.2V7.2c0-.75.2-1.26 1.28-1.26h1.37V3.62A18 18 0 0 0 11.86 3.5c-1.98 0-3.33 1.2-3.33 3.42v1.9H6.3v2.6h2.23V18h2.67Z"/></svg>'


# ---------------------------------------------------------------- helpers

def rep(s, old, new, count=1):
    n = s.count(old)
    if n != count:
        raise SystemExit(f'expected {count} x {old[:70]!r}, found {n}')
    return s.replace(old, new)


def sub(s, pattern, new, count=1, flags=re.S):
    out, n = re.subn(pattern, new, s, flags=flags)
    if n != count:
        raise SystemExit(f'expected {count} x /{pattern[:70]}/, found {n}')
    return out


def esc(text):
    return html.escape(text, quote=True)


def photo(pid):
    return f'/landing-pages/pnj/{pid}.webp'


def copy_photos():
    IMG_OUT.mkdir(parents=True, exist_ok=True)
    ids = {p for p, *_ in PROJECTS} | {p for p, _ in SCREENS}
    for pid in ids:
        if pid == 'web-vue':
            # The dashboard screenshot only exists as a large PNG; convert it once
            src = ROOT / 'src/components/image/Project/web-vue/01.png'
            for name, width in (('web-vue.webp', 1400), ('web-vue-t.webp', 640)):
                subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', str(src), '-vf', f'scale={width}:-2',
                                '-quality', '80', '-map_metadata', '-1', str(IMG_OUT / name)], check=True)
        else:
            shutil.copyfile(WORK / f'{pid}.webp', IMG_OUT / f'{pid}.webp')
            shutil.copyfile(WORK / f'{pid}-t.webp', IMG_OUT / f'{pid}-t.webp')


def top(href):
    """Links that leave this document open in the main window."""
    return '' if href.startswith('#') else ' target="_top"'


# ---------------------------------------------------------------- build

def build(lang):
    c = COPY[lang]
    s = SRC.read_text(encoding='utf-8')

    # Head: language, title, description, Thai-capable fonts
    s = rep(s, '<html lang="en">', f'<html lang="{c["lang"]}">')
    s = sub(s, r'<title>.*?</title>', f'<title>{esc(c["title"])}</title>')
    s = sub(s, r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{esc(c["description"])}">')
    s = rep(s, 'family=Geist:wght@400;500;600;700&', 'family=Geist:wght@400;500;600;700&family=Kanit:wght@400;500;600;700&')
    s = rep(s, '--sans:"Geist","Geist Fallback",', '--sans:"Geist","Kanit","Geist Fallback",')
    # Client names are set as wordmarks where the template had logo images
    s = rep(s, '.logos .cell img{', '.logos .cell .wm{position:relative;z-index:2;font:600 clamp(13px,1.15vw,17px)/1.25 var(--sans);color:var(--w1);text-align:center;opacity:.92}\n.logos .cell img{')

    # Loader, top bar
    s = rep(s, '<span>loading sublevel</span>', f'<span>{c["loading"]}</span>')
    s = rep(s, '<a class="logo" href="#top" aria-label="sublevel.studio"><span class="wordmark">sublevel<i>.</i></span></a>', '<a class="logo" href="#top" aria-label="PNJ Tech"><span class="wordmark">pnj<i>.</i></span></a>')
    s = rep(s, '<a class="blink" href="#lab">Lab</a>\n    </div>', '<a class="blink" href="/lab" target="_top">Lab</a>\n    </div>')
    s = rep(s, '<span class="prompt">agent@sublevel</span>', '<span class="prompt">agent@pnj</span>')
    s = rep(s, 'href="mailto:hello@sublevel.studio" aria-label="Contact us" title="Contact us"', f'href="mailto:{EMAIL}" target="_top" aria-label="Email PNJ Tech" title="Email"')

    # Full menu
    s = rep(s, '<button class="menu-close" type="button" aria-label="Close menu"><span class="wordmark">sublevel<i>.</i></span></button>', '<button class="menu-close" type="button" aria-label="Close menu"><span class="wordmark">pnj<i>.</i></span></button>')
    links = ''.join(f'<a href="{h}"{top(h)}>{esc(t)}</a>' for h, t in PAGES[lang])
    s = sub(s, r'<div class="menu-nav">\s*.*?\s*</div>', f'<div class="menu-nav">\n        {links}\n      </div>')
    s = sub(s, r'<div class="menu-foot">.*?</div>', f'<div class="menu-foot">\n        <p><b>{EMAIL}</b></p>\n        <p>{esc(c["menuFoot"][0])}</p>\n        <p>{esc(c["menuFoot"][1])}</p>\n      </div>')

    # Hero
    s = rep(s, '<span>Sublevel — studio index</span><hr class="rule" data-line><span>Est. 2019</span>', f'<span>{esc(c["eyebrow"][0])}</span><hr class="rule" data-line><span>{esc(c["eyebrow"][1])}</span>')
    s = sub(s, r'<h1 class="f-h0" data-ps>.*?</h1>', f'<h1 class="f-h0" data-ps>{esc(c["h1"])}</h1>')
    s = sub(s, r'<p class="f-h4" data-ps>We team up with ambitious founders.*?</p>', f'<p class="f-h4" data-ps>{esc(c["lede"])}</p>')

    # Clients
    s = rep(s, '<h2 class="f-h3" data-ps>Trusted by the builders</h2>', f'<h2 class="f-h3" data-ps>{esc(c["trusted"])}</h2>')
    cells = '\n'.join(
        f'      <a href="/skills" target="_top" aria-label="{esc(n)}"><div class="cell with-dots"><div class="lines with-diagonal-lines"></div><span class="wm" data-ps>{esc(n)}</span></div></a>'
        for n in CLIENTS[lang])
    s = sub(s, r'(<section class="grid-layout logos" id="showcase">.*?<div class="grid">\n).*?(\n    </div>\n  </section>)', lambda m: m.group(1) + cells + m.group(2))

    # Featured projects
    s = rep(s, '<h2 class="f-h1" data-ps>Featured Projects</h2>', f'<h2 class="f-h1" data-ps>{esc(c["featured"])}</h2>')
    s = sub(s, r'<p class="f-h4" data-ps>Eight selected builds.*?</p>', f'<p class="f-h4" data-ps>{esc(c["featuredSub"])}</p>')
    cards = []
    for pid, link, text in PROJECTS:
        cats, title, desc = text[lang]
        cards.append(
            f'''      <article class="card">
        <a class="shot" href="{link}" target="_top" aria-label="{esc(title)}" data-ps><img alt="{esc(title)}" src="{photo(pid)}"></a>
        <div class="meta framed">{CORNERS}
          <p class="cats" data-ps>{esc(cats)}</p>
          <h3 class="f-h3" data-ps>{esc(title)}</h3>
          <p class="desc f-p" data-ps>{esc(desc)}</p>
          <a class="go f-p" href="{link}" target="_top" data-ps><span>{esc(c["view"])}</span>{ARROW}</a>
        </div>
      </article>''')
    s = sub(s, r'(<div class="masonry">\n).*?(\n    </div>\n  </div>\n\n  <div class="grid-layout caps")', lambda m: m.group(1) + '\n'.join(cards) + m.group(2))

    # Capabilities
    s = rep(s, '<h2 class="f-h3" data-ps>Capabilities</h2>', f'<h2 class="f-h3" data-ps>{esc(c["caps"])}</h2>')
    s = rep(s, "<p data-ps>We're here to make the extraordinary.</p>", f'<p data-ps>{esc(c["big"][0])}</p>')
    s = rep(s, '<p data-ps>No shortcuts — just bold, precise work that raises the bar &amp; leaves a mark.</p>', f'<p data-ps>{esc(c["big"][1])}</p>')
    caps = []
    for link, text in CAPS:
        title, desc, tags = text[lang]
        tag_html = ''.join(f'<span>{esc(t)}</span>' for t in tags)
        caps.append(
            f'''        <div class="cap framed">{CORNERS}
          <h3 class="f-h4" data-ps><a class="actionable" href="{link}" target="_top">{esc(title)}</a></h3>
          <p class="f-h4" data-ps>{esc(desc)}</p>
          <div class="tags f-p">{tag_html}</div>
        </div>''')
    s = sub(s, r'(<div class="cols">\n      <div class="inner">\n).*?(\n      </div>\n    </div>\n  </div>\n\n  <hr class="rule grid-layout")', lambda m: m.group(1) + '\n'.join(caps) + m.group(2))

    # Contact
    s = rep(s, '<h2 class="f-h3" data-ps>Contact</h2>', f'<h2 class="f-h3" data-ps>{esc(c["contact"])}</h2>')
    s = rep(s, '<p class="lead f-h1" data-ps>Let\'s build something loud.</p>', f'<p class="lead f-h1" data-ps>{esc(c["contactLead"])}</p>')
    s = rep(s, '<div class="mail f-h1" data-ps><a href="mailto:hello@sublevel.studio"><span class="actionable">hello@sublevel.studio</span></a></div>',
            f'<div class="mail f-h1" data-ps><a href="mailto:{EMAIL}" target="_top"><span class="actionable">{EMAIL}</span></a></div>')
    # The address is longer than the template's; let it shrink instead of overflowing
    s = rep(s, '.contact .mail{position:relative;grid-column:span 5;grid-row:3;display:flex;align-items:center;color:var(--w1);white-space:nowrap}',
            '.contact .mail{position:relative;grid-column:span 5;grid-row:3;display:flex;align-items:center;color:var(--w1);white-space:nowrap;font-size:min(1em,5.4vw);min-width:0}')

    # Footer card: the newsletter becomes a quote request that opens the pricing page's form
    s = rep(s, '<p class="tag">Newsletter — dispatch 026</p>', f'<p class="tag">{esc(c["cardTag"])}</p>')
    s = rep(s, '<h3 class="f-h2" data-ps>Want the good stuff first?</h3>', f'<h3 class="f-h2" data-ps>{esc(c["cardTitle"])}</h3>')
    s = rep(s, '<p class="sub f-h4" data-ps>Drops, experiments and the occasional bad idea, sent no more than once a month.</p>', f'<p class="sub f-h4" data-ps>{esc(c["cardSub"])}</p>')
    s = rep(s, '<form class="signup" novalidate>\n        <input type="email" name="email" placeholder="you@studio.com" aria-label="Email address" required autocomplete="email">\n', '<div class="signup">\n')
    s = rep(s, '<button class="threeui-page-button threeui-page-button--ember-keycap" type="submit">', '<a class="threeui-page-button threeui-page-button--ember-keycap" href="/pricing#inquiry" target="_top">')
    s = rep(s, '<span class="lbl">Count me in</span>\n              <span class="threeui-page-button__price">Monthly</span>\n            </button>',
            f'<span class="lbl">{esc(c["cardBtn"])}</span>\n              <span class="threeui-page-button__price">{esc(c["cardBtnSub"])}</span>\n            </a>')
    s = rep(s, '        </div>\n      </form>\n      <p class="fine">No spam. Unsubscribe in one click.</p>', f'        </div>\n      </div>\n      <p class="fine">{esc(c["cardFine"])}</p>')
    s = rep(s, '.threeui-page-button{', '.threeui-page-button{text-decoration:none;') if '.threeui-page-button{' in s else s

    # Wordmark, footer links, social, copyright
    s = rep(s, 'aria-label="SUBLEVEL.26"', 'aria-label="PNJ.TECH"')
    s = rep(s, 'letter-spacing="-6">SUBLEVEL.26</text>', 'letter-spacing="-6">PNJ.TECH</text>')
    flinks = ''.join(f'<a class="blink" href="{h}"{top(h)}>{esc(t)}</a>' for h, t in PAGES[lang] if h not in ('/process', '/website-builder', '/en/website-builder'))
    s = sub(s, r'<div class="links f-h3">.*?</div>', f'<div class="links f-h3">{flinks}</div>')
    social = (
        f'<a href="https://www.facebook.com/Paphonthanai.name" target="_top" aria-label="Facebook" title="Facebook">{FACEBOOK}</a>'
    )
    s = sub(s, r'<div class="social"><a href="#lab" aria-label="X" title="X">.*?</a><a href="#lab" aria-label="Instagram" title="Instagram">.*?</a><a href="#lab" aria-label="GitHub" title="GitHub">',
            social + '<a href="https://github.com/paphonthanai" target="_top" aria-label="GitHub" title="GitHub">')
    s = rep(s, '<a href="#lab" aria-label="LinkedIn" title="LinkedIn">', '<a href="https://www.linkedin.com/in/%E0%B8%9B%E0%B8%9E%E0%B8%99%E0%B8%98%E0%B8%99%E0%B8%B1%E0%B8%A2-%E0%B9%83%E0%B8%88%E0%B8%A1%E0%B8%B2-aa57b2269/" target="_top" aria-label="LinkedIn" title="LinkedIn">')
    s = rep(s, '<p class="copy f-p">© sublevel.studio LLC 2026 all rights reserved</p>', f'<p class="copy f-p">{esc(c["copy"])}</p>')

    # Machine-readable index: screen-reader copy and the CRT log
    lines = [(b, 'p') for b in BANNER] + INDEX
    pre = '\n'.join(t for t, _ in lines[:-1])
    s = sub(s, r'(<pre class="sr-only">).*?(</pre>)', lambda m: m.group(1) + esc(pre) + m.group(2))
    s = sub(s, r'const SUBLEVEL_LOG = \[\[.*?\]\]\.map\(', lambda m: 'const SUBLEVEL_LOG = ' + json.dumps([[t, k] for t, k in lines], ensure_ascii=False) + '.map(')
    s = rep(s, "location.href = 'mailto:hello@sublevel.studio';", f"window.top.location.href = 'mailto:{EMAIL}';")

    # Text drawn on the 3D scene's signs, arcade and ticker
    s = rep(s, "strokeText('sublevel.', w / 2, h / 2 + 8)", "strokeText('pnj.', w / 2, h / 2 + 8)", count=2)
    s = rep(s, "fillText('sublevel.', w / 2, h / 2 + 8)", "fillText('pnj.', w / 2, h / 2 + 8)")
    s = rep(s, "fillText('SUBLEVEL   ///   WE BUILD THE STUFF PEOPLE REMEMBER   ///   OPEN LATE   ///   NOW PLAYING: SUBLEVEL DEFENDER   ///   ', 0, 34)",
            "fillText('PNJ TECH   ///   WEB · APP · CCTV · IOT · ROBOTICS   ///   SYSTEMS THAT WORK IN REAL USE   ///   NOW PLAYING: PNJ DEFENDER   ///   ', 0, 34)")
    s = s.replace("fillText('SUBLEVEL DEFENDER'", "fillText('PNJ DEFENDER'")
    s = s.replace("fillText('SUBLEVEL'", "fillText('PNJ TECH'")
    s = s.replace("strokeText('SBLVL'", "strokeText('PNJ'").replace("fillText('SBLVL'", "fillText('PNJ'")
    s = rep(s, "g.fillText('S', 244, 51)", "g.fillText('P', 244, 51)")
    if re.search(r"Text\('(SUBLEVEL|SBLVL|sublevel)", s):
        raise SystemExit('brand text left on a 3D texture')

    # CRT portfolio: our photos instead of the template's drawn sites; the arcade demo stays
    defender = re.search(r"  \{ title: 'Sublevel Defender'.*?\n  \} \},\n", s, re.S).group(0)
    defender = defender.replace("title: 'Sublevel Defender'", "title: 'PNJ Defender'")
    shots = json.dumps([{'title': t[lang][0], 'kind': t[lang][1], 'desc': t[lang][2], 'src': photo(pid).replace('.webp', '-t.webp')} for pid, t in SCREENS], ensure_ascii=False)
    portfolio = f'''const PORTFOLIO = [
  ...{shots}.map((s) => {{
    const img = new Image(); img.src = s.src;
    return {{ title: s.title, kind: s.kind, desc: s.desc, draw(g, w, h, t) {{
      g.fillStyle = '#0a0a0a'; g.fillRect(0, 0, w, h);
      if (img.complete && img.naturalWidth) {{
        const k = Math.max(w / img.naturalWidth, h / img.naturalHeight) * (1.08 + Math.sin(t * 0.25) * 0.04);
        const iw = img.naturalWidth * k, ih = img.naturalHeight * k;
        g.drawImage(img, (w - iw) / 2 + Math.sin(t * 0.18) * 12, (h - ih) / 2, iw, ih);
      }}
      g.fillStyle = 'rgba(0,0,0,0.62)'; g.fillRect(0, h - 74, w, 74);
      g.fillStyle = '#ff4d00'; g.fillRect(24, h - 58, 6, 42);
      g.textAlign = 'left'; g.textBaseline = 'middle';
      g.fillStyle = '#e6e6e6'; g.font = '700 26px "Geist", "Kanit", sans-serif'; g.fillText(s.title, 44, h - 46);
      g.fillStyle = '#ff9a6a'; g.font = '600 14px "Geist Mono", "Kanit", monospace'; g.fillText(s.kind.toUpperCase(), 44, h - 20);
    }} }};
  }}),
{defender}];
'''
    s = sub(s, r"const PORTFOLIO = \[\n.*?\n\];\n", lambda m: portfolio)

    if re.search(r'sublevel\.studio|hello@sublevel', s):
        left = sorted(set(re.findall(r'.{30}(?:sublevel\.studio|hello@sublevel).{30}', s)))
        raise SystemExit('template contact/brand left: ' + repr(left[:5]))
    return s


def main():
    copy_photos()
    for lang, name in (('th', 'pnj-home.html'), ('en', 'pnj-home-en.html')):
        out = build(lang)
        (OUT_DIR / name).write_text(out, encoding='utf-8', newline='')
        print(f'{name}: {len(out.encode()):,} bytes')


if __name__ == '__main__':
    main()
