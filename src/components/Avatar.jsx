import { useEffect, useRef } from 'react'
import { useMotion } from '../hooks/motion'

// Vector portrait. The eyes follow the pointer and blink, the cords are the two strands.
export function Avatar() {
  const ref = useRef(null)
  const motion = useMotion()

  useEffect(() => {
    const svg = ref.current
    if (!motion || !matchMedia('(pointer: fine)').matches) return
    const look = (e) => {
      const box = svg.getBoundingClientRect()
      const dx = e.clientX - (box.left + box.width / 2)
      const dy = e.clientY - (box.top + box.height * 0.36)
      const far = Math.hypot(dx, dy) || 1
      const reach = Math.min(1, far / 260)
      svg.style.setProperty('--gx', `${((dx / far) * 7 * reach).toFixed(1)}px`)
      svg.style.setProperty('--gy', `${((dy / far) * 4 * reach).toFixed(1)}px`)
    }
    addEventListener('pointermove', look, { passive: true })
    return () => {
      removeEventListener('pointermove', look)
      svg.style.removeProperty('--gx')
      svg.style.removeProperty('--gy')
    }
  }, [motion])

  return (
    <svg ref={ref} className="avatar" viewBox="0 0 704 704" role="img" aria-label="Illustrated portrait of Huzaifa Naseer">
      <defs>
        <clipPath id="av-disc"><circle cx="352" cy="352" r="352" /></clipPath>
        <clipPath id="av-face"><path d="M250 190C247 262 250 318 266 356C284 398 322 432 358 432C394 432 434 400 450 356C466 314 470 262 466 190C440 120 276 120 250 190Z" /></clipPath>
        <clipPath id="av-eye-l"><path d="M267 258C276 241 310 239 322 256C312 270 280 272 267 258Z" /></clipPath>
        <clipPath id="av-eye-r"><path d="M378 256C390 239 424 240 433 257C421 271 389 270 378 256Z" /></clipPath>
      </defs>
      <g clipPath="url(#av-disc)">
        <rect width="704" height="704" fill="#9be7be" />
        <g className="av-net" stroke="#6fcf9d" strokeWidth="5" fill="#9be7be">
          <path d="M70 190L190 110L120 350L-10 420M190 110L350 20M540 90L640 210L590 360L720 430M540 90L350 20M640 210L720 160M120 350L70 190" />
          <circle cx="70" cy="190" r="11" /><circle cx="190" cy="110" r="14" /><circle cx="120" cy="350" r="12" />
          <circle cx="540" cy="90" r="14" /><circle cx="640" cy="210" r="12" /><circle cx="590" cy="360" r="11" />
        </g>
        <path d="M196 520C190 440 240 396 300 392L420 392C486 398 532 440 522 520L360 640Z" fill="#0c3a29" />
        <path d="M30 720C40 620 84 560 152 532C200 512 238 500 266 478C300 530 420 530 454 476C484 500 520 514 566 534C632 562 668 620 678 720Z" fill="#17573d" />
        <path d="M566 534C632 562 668 620 678 720H560C566 650 572 590 566 534ZM152 532C148 600 150 660 160 720H120C118 650 128 580 152 532Z" fill="#114630" />
        <path d="M302 380H426V468C426 500 396 520 364 520C332 520 302 500 302 468Z" fill="#c97b4a" />
        <path d="M302 396C330 436 396 440 426 392V420C400 462 330 462 302 424Z" fill="#a85f34" />
        <path d="M292 462C310 510 416 512 436 460L452 486C430 556 300 558 276 488Z" fill="#f3f6f1" />
        <path d="M266 470C240 486 226 506 232 530C262 586 320 612 352 628C330 586 286 548 276 486Z" fill="#1f6d4d" />
        <path d="M456 468C486 484 500 506 494 530C464 588 396 612 352 628C380 584 440 548 452 486Z" fill="#1a6044" />
        <path d="M352 628V720" stroke="#0f4630" strokeWidth="5" />
        <path className="av-cord" d="M300 576C292 612 304 640 296 684" stroke="#ff8a2b" strokeWidth="13" strokeLinecap="round" fill="none" />
        <path className="av-cord av-cord-r" d="M408 576C416 612 404 640 412 684" stroke="#c9f5dc" strokeWidth="13" strokeLinecap="round" fill="none" />
        <circle cx="300" cy="574" r="10" fill="#0a2419" /><circle cx="408" cy="574" r="10" fill="#0a2419" />
        <path d="M252 254C232 240 222 258 225 286C228 318 242 338 260 330Z" fill="#dd9360" />
        <path d="M247 270C236 268 235 286 240 302C243 312 250 316 254 314Z" fill="#b96a3c" />
        <path d="M466 252C486 238 498 256 495 284C492 316 478 336 459 328Z" fill="#c97b4a" />
        <path d="M472 268C483 266 484 284 479 300C476 310 469 314 465 312Z" fill="#a85f34" />
        <path d="M250 190C247 262 250 318 266 356C284 398 322 432 358 432C394 432 434 400 450 356C466 314 470 262 466 190C440 120 276 120 250 190Z" fill="#eda872" />
        <g clipPath="url(#av-face)">
          <path d="M480 120V450H330C392 436 424 392 432 340C438 290 428 220 436 120Z" fill="#dd9360" />
          <path d="M240 150C300 200 420 200 480 150V120H240Z" fill="#c97b4a" opacity=".55" />
          <ellipse cx="284" cy="308" rx="25" ry="15" fill="#f08a5c" opacity=".4" />
          <ellipse cx="424" cy="306" rx="23" ry="15" fill="#e0764a" opacity=".4" />
          <path d="M282 372C310 440 410 440 440 368L450 450H270Z" fill="#b8744a" opacity=".34" />
        </g>
        <path d="M357 250C362 280 368 296 372 308C374 320 360 326 347 324C336 323 328 317 331 309" fill="none" stroke="#b96a3c" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <g className="av-eye">
          <path d="M267 258C276 241 310 239 322 256C312 270 280 272 267 258Z" fill="#fff" />
          <g clipPath="url(#av-eye-l)"><g className="av-pupil"><circle cx="296" cy="255" r="15" fill="#3b2416" /><circle cx="296" cy="255" r="7" fill="#0c0805" /><circle cx="301" cy="249" r="4" fill="#fff" /></g></g>
          <path d="M265 259C275 240 311 237 324 256" fill="none" stroke="#1a100a" strokeWidth="6" strokeLinecap="round" />
        </g>
        <g className="av-eye">
          <path d="M378 256C390 239 424 240 433 257C421 271 389 270 378 256Z" fill="#fff" />
          <g clipPath="url(#av-eye-r)"><g className="av-pupil"><circle cx="406" cy="254" r="15" fill="#3b2416" /><circle cx="406" cy="254" r="7" fill="#0c0805" /><circle cx="411" cy="248" r="4" fill="#fff" /></g></g>
          <path d="M376 256C389 237 425 238 435 258" fill="none" stroke="#1a100a" strokeWidth="6" strokeLinecap="round" />
        </g>
        <path d="M256 234C260 218 272 214 290 213L322 216C328 220 328 230 324 233C300 226 278 227 256 234Z" fill="#14110f" />
        <path d="M444 232C440 216 428 212 410 211L374 215C368 219 368 229 372 232C396 225 422 225 444 232Z" fill="#14110f" />
        <path d="M322 366C340 372 368 372 386 364C376 384 336 386 322 366Z" fill="#c4614a" />
        <path d="M298 360C308 342 326 332 342 333C348 334 352 337 354 338C357 336 361 333 367 332C383 331 400 340 410 357C392 354 374 357 355 354C336 359 318 356 298 360Z" fill="#14110f" />
        <path d="M250 300C240 280 236 250 232 226C218 200 216 168 236 148C238 100 274 68 330 58C400 44 464 72 482 116C504 148 500 196 490 228C486 256 478 284 468 300C468 268 466 236 458 208C452 186 446 172 438 162C410 152 384 160 350 168C320 172 296 160 276 162C262 180 256 206 253 232C251 258 251 280 250 300Z" fill="#14110f" />
        <path d="M262 140C284 98 330 78 384 80M290 152C308 118 350 98 408 102M330 160C352 130 392 118 440 128M400 152C424 138 452 140 470 158" fill="none" stroke="#3a332e" strokeWidth="7" strokeLinecap="round" />
      </g>
    </svg>
  )
}
