import { spawn } from 'node:child_process'
import { cp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { SiteSnapshot } from '@pnjtech/schema'
import { renderFfContent, renderSiteJs } from './content-modules.ts'

function run(cmd: string, args: string[], cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Windows ต้องใช้ shell เพื่อเรียก npm.cmd — ส่งเป็นคำสั่งเดียว (args เป็นค่าคงที่ในไฟล์นี้ ไม่ได้มาจากผู้ใช้)
    const p = process.platform === 'win32'
      ? spawn([cmd, ...args].join(' '), { cwd, stdio: ['ignore', 'pipe', 'pipe'], shell: true })
      : spawn(cmd, args, { cwd, stdio: ['ignore', 'pipe', 'pipe'] })
    let log = ''
    p.stdout.on('data', (d) => (log += d))
    p.stderr.on('data', (d) => (log += d))
    p.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} ล้มเหลว (${code})\n${log.slice(-3000)}`))))
  })
}

// คัดลอกแม่แบบโดยไม่เอา node_modules / dist / ไฟล์ชั่วคราว
async function copyTemplate(templateDir: string, to: string) {
  await rm(to, { recursive: true, force: true })
  await cp(templateDir, to, {
    recursive: true,
    filter: (src) => !/[\\/](node_modules|dist|\.vite-ssg-temp|\.og-tmp|\.firebase)([\\/]|$)/.test(src),
  })
}

/**
 * build แม่แบบตามเดิม (ใช้เป็นค่าอ้างอิง) — ติดตั้ง dependency ด้วย npm ci ครั้งเดียว
 * แล้วใช้ node_modules ชุดนี้ร่วมกับการ build จาก snapshot
 */
export async function buildBaseline(templateDir: string, workDir: string): Promise<string> {
  const dir = join(workDir, 'baseline')
  await copyTemplate(templateDir, dir)
  await run('npm', ['ci', '--no-audit', '--no-fund'], dir)
  await run('npm', ['run', 'build'], dir)
  return dir
}

/** build แม่แบบโดยแทนไฟล์เนื้อหาด้วยไฟล์ที่สร้างจาก snapshot */
export async function buildFromSnapshot(
  templateDir: string,
  workDir: string,
  snapshot: SiteSnapshot,
  nodeModulesFrom: string,
): Promise<string> {
  const dir = join(workDir, 'from-snapshot')
  await copyTemplate(templateDir, dir)
  const content = join(dir, 'src', 'content')
  const ff = await readFile(join(content, 'ff-content.js'), 'utf8')
  await writeFile(join(content, 'ff-content.js'), renderFfContent(snapshot, ff))
  await writeFile(join(content, 'site.js'), renderSiteJs(snapshot))
  // junction ใช้ได้บน Windows โดยไม่ต้องสิทธิ์ admin
  await symlink(join(nodeModulesFrom, 'node_modules'), join(dir, 'node_modules'), 'junction')
  await run('npm', ['run', 'build'], dir)
  return dir
}

export async function ensureDir(d: string) {
  if (!existsSync(d)) await mkdir(d, { recursive: true })
}
