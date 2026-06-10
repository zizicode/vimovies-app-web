// FaqAccordion.tsx actualizado

import { useState } from 'react'
import { useLocale } from '../../../store/locate.store'
import type { Media } from '../../../lib/api/types'
import { MOCK_FAQS } from '../../../mocks/faqs.mock'

interface FaqAccordionProps {
  movie: Media
}

export default function FaqAccordion({ movie }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const locale = useLocale()
  const isEnglish = locale === 'en'

  const faqs = movie.faqs?.length ? movie.faqs : MOCK_FAQS

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="faq-accordion">
      <div className="faq-accordion__container">

        <p className="faq-accordion__label">FAQ</p>
        <h2 className="faq-accordion__title">Preguntas Frecuentes</h2>

        <div className="faq-accordion__list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={`faq-accordion__item ${isOpen ? 'faq-accordion__item--open' : ''}`}
              >
                <button
                  className="faq-accordion__question"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-accordion__question-text">
                    {isEnglish ? faq.question_en : faq.question_es}
                  </span>
                  <span className="faq-accordion__icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <div className={`faq-accordion__answer-wrap ${isOpen ? 'faq-accordion__answer-wrap--open' : ''}`}>
                  <div className="faq-accordion__answer">
                    {isEnglish ? faq.answer_en : faq.answer_es}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}