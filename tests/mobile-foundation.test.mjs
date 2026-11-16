import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
test('manifest is installable and portrait-first',()=>{const m=JSON.parse(read('manifest.webmanifest'));assert.equal(m.display,'standalone');assert.equal(m.orientation,'portrait-primary');assert.ok(m.icons.length)});
test('offline worker has versioned cache and same-origin guard',()=>{const sw=read('service-worker.js');assert.match(sw,/ninth-tide-v\d+/);assert.match(sw,/origin !== self.location.origin/)});
test('touch controls respect interactive elements',()=>{const js=read('src/mobile-controls.js');assert.match(js,/closest\('button,a/);assert.match(js,/serviceWorker/)});
test('mobile CSS respects reduced motion and safe areas',()=>{const css=read('src/mobile-controls.css');assert.match(css,/prefers-reduced-motion/);assert.match(css,/safe-area-inset-bottom/)});
