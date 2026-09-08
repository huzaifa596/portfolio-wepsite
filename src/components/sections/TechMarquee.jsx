import { marqueeItems } from '../../data/portfolio'
import { Icon } from '../ui/Icon'

function Track({ reverse = false }) {
  const repeatedItems = [...marqueeItems, ...marqueeItems]

  return (
    <div className={`marquee__track ${reverse ? 'marquee__track--reverse' : ''}`}>
      {repeatedItems.map((item, index) => (
        <span className="marquee__item" key={`${item}-${index}`}>
          <Icon name="spark" size={13} /> {item}
        </span>
      ))}
    </div>
  )
}

export function TechMarquee() {
  return (
    <section className="marquee" aria-label="Technology stack">
      <Track />
      <Track reverse />
    </section>
  )
}
