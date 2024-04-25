import { IFeedbackInput } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'

const NameInput = ({ register, errors, darkModeClass }: IFeedbackInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>Імя *</span>
    <input
      className={styles.feedback_form__form__input}
      type="text"
      placeholder="Иван"
      {...register('name', {
        required: 'Введіть Ім\'я!',
        pattern: {
          value: /^[а-яА-Яa-zA-ZёЁ]*$/,
          message: 'Недопустиме значення',
        },
        minLength: 2,
        maxLength: 15,
      })}
    />
    {errors.name && (
      <span className={styles.error_alert}>{errors.name?.message}</span>
    )}
    {errors.name && errors.name.type === 'minLength' && (
      <span className={styles.error_alert}>Мінімум 20 символов!</span>
    )}
    {errors.name && errors.name.type === 'maxLength' && (
      <span className={styles.error_alert}>Не більше 15 символов!</span>
    )}
  </label>
)

export default NameInput
