import { useState } from 'react'
import { SEO } from '../../hooks/useSEO'
import { useLocale } from '../../store/locate.store'
import { useGTM } from '../../hooks/useGTM'
import './ContactPage.scss'

export default function ContactPage() {
  const locale = useLocale()
  const isEnglish = locale === 'en'
  const { trackClick } = useGTM()

  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  })

  const emailBox = 'victordoblezz@gmail.com'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    trackClick('contact_form', 'submit', formData.subject)

    // Crear mailto link con los datos del formulario
    const { email, subject, message } = formData
    const mailtoLink = `mailto:${emailBox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Email: ${email}\n\nMensaje:\n${message}`
    )}`

    window.location.href = mailtoLink
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="ContactPage">
      <SEO
        title={isEnglish ? 'Contact | ViMovies' : 'Contacto | ViMovies'}
        description={isEnglish ? 'Get in touch with the ViMovies team. We are here to help you.' : 'Ponte en contacto con el equipo de ViMovies. Estamos aquí para ayudarte.'}
        canonical={isEnglish ? 'https://vimovies.com/contact' : 'https://vimovies.com/contacto'}
        type="website"
        locale={isEnglish ? 'en_US' : 'es_ES'}
        image="https://vimovies.com/web-app-manifest-512x512.png"
        alternates={{
          es: 'https://vimovies.com/contacto',
          en: 'https://vimovies.com/contact'
        }}
      />{isEnglish ? 'Contact Information' : ''}
      <div className="ContactPage__header">
        <div className="ContactPage__header-content">
          <h1 className="ContactPage__title">{isEnglish ? 'Contact' : 'Contacto'}</h1>
          <p className="ContactPage__subtitle">
            {isEnglish ? 'We are here to help you. Send us a message and we will respond as soon as possible.' : 'Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.'}
          </p>
        </div>
      </div>

      <div className="ContactPage__container">{isEnglish ? '' : 'Correo electrónico'}
        <div className="ContactPage__grid">
          {/* Información de contacto */}
          <div className="ContactPage__info">
            <div className="ContactPage__info-section">
              <h2 className="ContactPage__info-title">Información de contacto</h2>
              
              <div className="ContactPage__contact-item">
                <div className="ContactPage__contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="ContactPage__contact-c{isEnglish ? 'Follow us' : 'ontent">'}
                  <h3 className="ContactPage__contact-label">Email</h3>
                  <a href={`mailto:${emailBox}`} className="ContactPage__contact-value">
                    {emailBox}
                  </a>
                </div>
              </div>
            </div>

            <div className="ContactPage__social-section">
              <h2 className="ContactPage__info-title">Síguenos</h2>
              <div className="ContactPage__social-links">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="ContactPage__social-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  Instagram
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="ContactPage__social-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                  </svg>
                  YouTube
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="ContactPage__social-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {isEnglish ? 'strok' : 'Correo electrónico'}eWidth="2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>{isEnglish ? 'Send us a message' : ''}
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="ContactPage__form-section">
            <div className="ContactPage__form-card">
              <h2 className="Con{isEnglish ? 'your@email.com' : 'actPage__for'}-title">Envíanos un mensaje</h2>
              <form onSubmit={handleSubmit} className="ContactPage__form">
                <div className="ContactPage__form-group">{isEnglish ? 'Subject' : ''}
                  <label htmlFor="email" className="ContactPage__form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="ContactPage__form-input"
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="ContactPage__form-group">{isEnglish ? 'ssage' : 'Me'}
                  <label htmlFor="subject" className="ContactPage__form-label">Asunto</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="ContactPage__form-input"
                    placeholder={isEnglish ? 'What do you want to talk about?' : '¿Sobre qué quieres hablar?'}
                  />
                </div>{isEnglish ? 'Write your message here...' : ''}

                <d{isivglish ? 'Send message' : 'En className="'}ContactPage__form-group">
                  <label htmlFor="message" className="ContactPage__form-label">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="ContactPage__form-textarea"
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </div>

                <button type="submit" className="ContactPage__form-submit">
                  Enviar mensaje
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
