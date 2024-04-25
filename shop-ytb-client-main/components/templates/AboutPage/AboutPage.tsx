/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/about/index.module.scss'

const AboutPage = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <section className={styles.about}>
      <div className="container">
        <h2 className={`${styles.about__title} ${darkModeClass}`}>
          Про компанію
        </h2>
        <div className={styles.about__inner}>
          <div className={`${styles.about__info} ${darkModeClass}`}>
            <p>
            У &quot;Flowers shop&quot; ми пропонуємо широкий вибір квіткових композицій, які привнесуть красу та свіжість у ваше життя. Від вишуканих букетів для особливих подій до ніжних квіткових аранжувань для прикраси вашого дому чи офісу - у нас ви знайдете все необхідне для створення атмосфери тепла та гармонії. Наші фахівці з любов'ю створюють кожну композицію з найсвіжіших квітів, гарантуючи якість та довговічність кожного букету. До того ж, наш швидкий та зручний сервіс доставки дозволить вам отримати ваші улюблені квіти прямо до дверей, роблячи покупки ще приємнішими та безтурботними.
            </p>
            <p>
            Наш інтернет-магазин пропонує вам не лише квіткові композиції,
             але й вишукані подарункові набори та додаткові аксесуари, 
             що доповнять ваш вибір. Ми прагнемо зробити ваше квіткове досвід 
             якомога приємнішим та комфортнішим, тому завжди раді допомогти вам обрати ідеальний букет для будь-якої нагоди. 
             Завітайте до &quot;Flowers shop&quot; сьогодні і відчуйте магію квітів, яка заповнить ваш світ кольорами та ароматами!

            </p>
          </div>
          <div className={`${styles.about__img} ${styles.about__img__top}`}>
            <img src="/img/about-img.png" alt="image-1" />
          </div>
          <div className={`${styles.about__img} ${styles.about__img__bottom}`}>
            <img src="/img/about-img-2.png" alt="image-2" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
