const APP_CACHE_NAME = 'piano-chord-trainer-pwa';
const STATIC_CACHE_NAME = 'piano-chord-trainer-pwa-static'
//$staticAssets = Get-ChildItem -Recurse -Path . | Where-Object {!$_.PSIsContainer -and $_.Extension -in @(".js", ".css", ".html", ".jpg", ".png")}
//$staticAssetPaths = $staticAssets.FullName
//Write-Output $staticAssetPaths

const staticAssets = [
'/favicon-16x16.png',
'/favicon.ico',
'/index.html',
'/LICENSE',
'/apple-touch-icon.png',
'/logo512.png',
'/README.md',
'/styles',
'/styles/main.css',
'/manifest.json4',
'/scripts',
'/scripts/piano',
'/scripts/piano/As1.mp3',
'/scripts/piano/F5.wav',
'/scripts/piano/G1.wav',
'/scripts/piano/G5.ogg',
'/scripts/piano/Cs3.mp3',
'/scripts/piano/F1.ogg',
'/scripts/piano/B6.mp3',
'/scripts/piano/C2.mp3',
'/scripts/piano/C3.mp3',
'/scripts/piano/F0.ogg',
'/scripts/piano/Cs2.mp3',
'/scripts/piano/G4.ogg',
'/scripts/piano/G0.wav',
'/scripts/piano/F4.wav',
'/scripts/piano/As0.mp3',
'/scripts/piano/Gs6.mp3',
'/scripts/piano/Gs4.mp3',
'/scripts/piano/As2.mp3',
'/scripts/piano/G2.wav',
'/scripts/piano/F6.wav',
'/scripts/piano/Cs0.mp3',
'/scripts/piano/F2.ogg',
'/scripts/piano/G6.ogg',
'/scripts/piano/C1.mp3',
'/scripts/piano/B5.mp3',
'/scripts/piano/B4.mp3',
'/scripts/piano/C0.mp3',
'/scripts/piano/F3.ogg',
'/scripts/piano/Cs1.mp3',
'/scripts/piano/G3.wav',
'/scripts/piano/As3.mp3',
'/scripts/piano/Gs5.mp3',
'/scripts/piano/Gs1.mp3',
'/scripts/piano/F3.wav',
'/scripts/piano/Cs5.mp3',
'/scripts/piano/G3.ogg',
'/scripts/piano/C4.mp3',
'/scripts/piano/B0.mp3',
'/scripts/piano/B1.mp3',
'/scripts/piano/C5.mp3',
'/scripts/piano/G2.ogg',
'/scripts/piano/F6.ogg',
'/scripts/piano/Cs4.mp3',
'/scripts/piano/As6.mp3',
'/scripts/piano/F2.wav',
'/scripts/piano/G6.wav',
'/scripts/piano/Gs0.mp3',
'/scripts/piano/Gs2.mp3',
'/scripts/piano/F0.wav',
'/scripts/piano/G4.wav',
'/scripts/piano/As4.mp3',
'/scripts/piano/G0.ogg',
'/scripts/piano/Cs6.mp3',
'/scripts/piano/F4.ogg',
'/scripts/piano/B3.mp3',
'/scripts/piano/C7.mp3',
'/scripts/piano/C6.mp3',
'/scripts/piano/B2.mp3',
'/scripts/piano/F5.ogg',
'/scripts/piano/G1.ogg',
'/scripts/piano/As5.mp3',
'/scripts/piano/G5.wav',
'/scripts/piano/F1.wav',
'/scripts/piano/Gs3.mp3',
'/scripts/piano/Fs4.mp3',
'/scripts/piano/A2.wav',
'/scripts/piano/A6.ogg',
'/scripts/piano/Ds6.mp3',
'/scripts/piano/D5.mp3',
'/scripts/piano/E1.mp3',
'/scripts/piano/E0.mp3',
'/scripts/piano/D4.mp3',
'/scripts/piano/A3.wav',
'/scripts/piano/Fs5.mp3',
'/scripts/piano/A1.wav',
'/scripts/piano/Ds5.mp3',
'/scripts/piano/A5.ogg',
'/scripts/piano/E2.mp3',
'/scripts/piano/D6.mp3',
'/scripts/piano/E3.mp3',
'/scripts/piano/A4.ogg',
'/scripts/piano/Ds4.mp3',
'/scripts/piano/A0.wav',
'/scripts/piano/Fs6.mp3',
'/scripts/piano/A4.wav',
'/scripts/piano/Fs2.mp3',
'/scripts/piano/Ds0.mp3',
'/scripts/piano/A0.ogg',
'/scripts/piano/D3.mp3',
'/scripts/piano/D2.mp3',
'/scripts/piano/E6.mp3',
'/scripts/piano/A1.ogg',
'/scripts/piano/Ds1.mp3',
'/scripts/piano/Fs3.mp3',
'/scripts/piano/A5.wav',
'/scripts/piano/Fs1.mp3',
'/scripts/piano/A3.ogg',
'/scripts/piano/Ds3.mp3',
'/scripts/piano/D0.mp3',
'/scripts/piano/E4.mp3',
'/scripts/piano/E5.mp3',
'/scripts/piano/D1.mp3',
'/scripts/piano/Ds2.mp3',
'/scripts/piano/A2.ogg',
'/scripts/piano/Fs0.mp3',
'/scripts/piano/A6.wav',
'/scripts/piano/Gs6.wav',
'/scripts/piano/Gs2.ogg',
'/scripts/piano/C3.wav',
'/scripts/piano/As4.ogg',
'/scripts/piano/Cs2.wav',
'/scripts/piano/C7.ogg',
'/scripts/piano/B3.ogg',
'/scripts/piano/F4.mp3',
'/scripts/piano/Cs6.ogg',
'/scripts/piano/G0.mp3',
'/scripts/piano/As0.wav',
'/scripts/piano/As1.wav',
'/scripts/piano/G1.mp3',
'/scripts/piano/F5.mp3',
'/scripts/piano/B2.ogg',
'/scripts/piano/C6.ogg',
'/scripts/piano/Cs3.wav',
'/scripts/piano/As5.ogg',
'/scripts/piano/C2.wav',
'/scripts/piano/B6.wav',
'/scripts/piano/Gs3.ogg',
'/scripts/piano/Gs5.wav',
'/scripts/piano/Gs1.ogg',
'/scripts/piano/C0.wav',
'/scripts/piano/B4.wav',
'/scripts/piano/Cs1.wav',
'/scripts/piano/B0.ogg',
'/scripts/piano/C4.ogg',
'/scripts/piano/G3.mp3',
'/scripts/piano/Cs5.ogg',
'/scripts/piano/As3.wav',
'/scripts/piano/As2.wav',
'/scripts/piano/Cs4.ogg',
'/scripts/piano/F6.mp3',
'/scripts/piano/G2.mp3',
'/scripts/piano/C5.ogg',
'/scripts/piano/B1.ogg',
'/scripts/piano/Cs0.wav',
'/scripts/piano/As6.ogg',
'/scripts/piano/B5.wav',
'/scripts/piano/C1.wav',
'/scripts/piano/Gs0.ogg',
'/scripts/piano/Gs4.wav',
'/scripts/piano/Gs0.wav',
'/scripts/piano/Gs4.ogg',
'/scripts/piano/C5.wav',
'/scripts/piano/B1.wav',
'/scripts/piano/Cs4.wav',
'/scripts/piano/As2.ogg',
'/scripts/piano/B5.ogg',
'/scripts/piano/C1.ogg',
'/scripts/piano/As6.wav',
'/scripts/piano/G6.mp3',
'/scripts/piano/F2.mp3',
'/scripts/piano/Cs0.ogg',
'/scripts/piano/Cs1.ogg',
'/scripts/piano/F3.mp3',
'/scripts/piano/C0.ogg',
'/scripts/piano/B4.ogg',
'/scripts/piano/As3.ogg',
'/scripts/piano/Cs5.wav',
'/scripts/piano/B0.wav',
'/scripts/piano/C4.wav',
'/scripts/piano/Gs5.ogg',
'/scripts/piano/Gs1.wav',
'/scripts/piano/Gs3.wav',
'/scripts/piano/B2.wav',
'/scripts/piano/C6.wav',
'/scripts/piano/As1.ogg',
'/scripts/piano/C2.ogg',
'/scripts/piano/B6.ogg',
'/scripts/piano/As5.wav',
'/scripts/piano/F1.mp3',
'/scripts/piano/Cs3.ogg',
'/scripts/piano/G5.mp3',
'/scripts/piano/G4.mp3',
'/scripts/piano/Cs2.ogg',
'/scripts/piano/F0.mp3',
'/scripts/piano/As4.wav',
'/scripts/piano/C3.ogg',
'/scripts/piano/As0.ogg',
'/scripts/piano/Cs6.wav',
'/scripts/piano/C7.wav',
'/scripts/piano/B3.wav',
'/scripts/piano/Gs6.ogg',
'/scripts/piano/Gs2.wav',
'/scripts/piano/D4.wav',
'/scripts/piano/E0.wav',
'/scripts/piano/Fs1.ogg',
'/scripts/piano/E4.ogg',
'/scripts/piano/D0.ogg',
'/scripts/piano/Ds3.ogg',
'/scripts/piano/A3.mp3',
'/scripts/piano/Fs5.wav',
'/scripts/piano/Fs4.wav',
'/scripts/piano/A2.mp3',
'/scripts/piano/Ds2.ogg',
'/scripts/piano/D1.ogg',
'/scripts/piano/E5.ogg',
'/scripts/piano/Ds6.wav',
'/scripts/piano/Fs0.ogg',
'/scripts/piano/E1.wav',
'/scripts/piano/D5.wav',
'/scripts/piano/E3.wav',
'/scripts/piano/Fs2.ogg',
'/scripts/piano/Ds4.wav',
'/scripts/piano/D3.ogg',
'/scripts/piano/A0.mp3',
'/scripts/piano/Ds0.ogg',
'/scripts/piano/Fs6.wav',
'/scripts/piano/Ds1.ogg',
'/scripts/piano/A1.mp3',
'/scripts/piano/E6.ogg',
'/scripts/piano/D2.ogg',
'/scripts/piano/Ds5.wav',
'/scripts/piano/Fs3.ogg',
'/scripts/piano/D6.wav',
'/scripts/piano/E2.wav',
'/scripts/piano/E6.wav',
'/scripts/piano/D2.wav',
'/scripts/piano/Ds1.wav',
'/scripts/piano/D6.ogg',
'/scripts/piano/E2.ogg',
'/scripts/piano/Fs3.wav',
'/scripts/piano/A5.mp3',
'/scripts/piano/Ds5.ogg',
'/scripts/piano/Ds4.ogg',
'/scripts/piano/A4.mp3',
'/scripts/piano/Fs2.wav',
'/scripts/piano/E3.ogg',
'/scripts/piano/Fs6.ogg',
'/scripts/piano/Ds0.wav',
'/scripts/piano/D3.wav',
'/scripts/piano/D1.wav',
'/scripts/piano/E5.wav',
'/scripts/piano/Ds2.wav',
'/scripts/piano/Fs4.ogg',
'/scripts/piano/E1.ogg',
'/scripts/piano/D5.ogg',
'/scripts/piano/Fs0.wav',
'/scripts/piano/Ds6.ogg',
'/scripts/piano/A6.mp3',
'/scripts/piano/Fs1.wav',
'/scripts/piano/D4.ogg',
'/scripts/piano/E0.ogg',
'/scripts/piano/Fs5.ogg',
'/scripts/piano/Ds3.wav',
'/scripts/piano/E4.wav',
'/scripts/piano/D0.wav',
'/scripts/Tone.js',
'/scripts/custom-piano-keys.min.js',
'/scripts/Tonejs-Instruments.js',
'/scripts/sm.js',
'/scripts/db.js',
'/scripts/main.js',
'/scripts/chords.js',
'/scripts/cookie.js',
'/manifest.json',
'/service-worker.js',
'/logo192.png',
'/sw.js',
'/favicon-32x32.png',
];

const modified = {'/index.html':true,'/scripts/main.js':true,'/style/main.css':true,'/scripts/chords.js':true}
const version = "0.3";

self.addEventListener('install', async event => {
    //event.waitUntil(self.skipWaiting());
    const cache = await caches.open(APP_CACHE_NAME);
    await cache.addAll(staticAssets.map(f=>modified[f]?f+"?v="+version:f));
});

async function cacheFirst(req) {
    const cache = await caches.open(APP_CACHE_NAME);
    const cachedResponse = await cache.match(req);
    return cachedResponse || fetch(req);
}

self.addEventListener('fetch', async event => {
    const req = event.request;
    event.respondWith(cacheFirst(req));
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        Promise.all([
            self.clients.claim(),
            caches.keys().then(function (cacheNames) {
                return Promise.all(
                    cacheNames.map(function (cacheName) {
                        if (cacheName !== APP_CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
                            console.log('deleting', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});


