import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getBestsellersOrNewPartsFx } from '@/app/api/boilerParts'
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider'
import { IBoilerParts } from '@/types/boilerparts'
import styles from '@/styles/dashboard/index.module.scss'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import { $shoppingCart } from '@/context/shopping-cart'
import { AnimatePresence, motion } from 'framer-motion'
import CartAlert from '@/components/modules/DashboardPage/CartAlert'

const DashboardPage = () => {
  const [newParts, setNewParts] = useState<IBoilerParts>({} as IBoilerParts)
  const [bestsellers, setBestsellers] = useState<IBoilerParts>(
    {} as IBoilerParts
  )
  const [spinner, setSpinner] = useState(false)
  const shoppingCart = useStore($shoppingCart)
  const [showAlert, setShowAlert] = useState(!!shoppingCart.length)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    loadBoilerParts()
  }, [])

  useEffect(() => {
    if (shoppingCart.length) {
      setShowAlert(true)
      return
    }

    setShowAlert(false)
  }, [shoppingCart.length])

  const loadBoilerParts = async () => {
    try {
      setSpinner(true)
      const bestsellers = await getBestsellersOrNewPartsFx(
        '/boiler-parts/bestsellers'
      )
      const newParts = await getBestsellersOrNewPartsFx('/boiler-parts/new')

      setBestsellers(bestsellers)
      setNewParts(newParts)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const closeAlert = () => setShowAlert(false)

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${styles.dashboard__alert} ${darkModeClass}`}
            >
              <CartAlert
                count={shoppingCart.reduce(
                  (defaultCount, item) => defaultCount + item.count,
                  0
                )}
                closeAlert={closeAlert}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className={styles.dashboard__brands}>
          <BrandsSlider />
        </div>
        <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>
          Квіти
        </h2>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
          Хіти продаж
          </h3>
          <DashboardSlider items={bestsellers.rows || []} spinner={spinner} />
        </div>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
          Новинки
          </h3>
          <DashboardSlider items={newParts.rows || []} spinner={spinner} />
        </div>
        <div className={styles.dashboard__about}>
          <h3
            className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}
          >
            Про компанію
          </h3>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
          "Інструкція з користування квітами":

Поговоріть з ними: Квіти - це не просто рослини, вони є вашими новими зеленими друзями! Проведіть з ними якомога більше часу, діліться з ними своїми думками, надихайте їх на ріст і процвітання. Хто знає, можливо, вони також будуть раді вашій компанії!
Зробіть їх щасливими: Пам'ятайте, що кожна рослина має свої вподобання. Деяким подобається більше світла, іншим - менше. Деякі люблять більше води, інші - менше. Спробуйте зрозуміти, що ваші квіти потребують для щастя, і надайте їм це!
Організовуйте їм концерти: Нічне виконання на гітарі або легка класична музика можуть стати ідеальним супроводом для вашого квітника. Хто знає, можливо, вони навіть почнуть танцювати під вашу музику!
Не переїдають!: Незважаючи на спокусу, ніколи не годуйте свої квіти піцою або бургерами. Вони люблять тільки свіже повітря, воду та світло.
          </p>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
