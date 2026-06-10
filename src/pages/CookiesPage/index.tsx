import { SEO } from '../../hooks/useSEO'
import { useI18n } from '../../store/locate.store'
import './CookiesPage.scss'

export default function CookiesPage() {
  const { locale } = useI18n()
  const isEnglish = locale === 'en'

  return (
    <div className="CookiesPage">
      <SEO
        title={isEnglish ? 'Cookie Policy | ViMovies' : 'Política de Cookies | ViMovies'}
        description={isEnglish ? 'Learn about the cookies Vimovies uses, why we use them, and how you can manage your preferences.' : 'Aprende sobre las cookies que usa Vimovies, por qué las usamos y cómo puedes gestionar tus preferencias.'}
        canonical={isEnglish ? 'https://vimovies.com/cookies' : 'https://vimovies.com/cookies'}
        type="website"
        alternates={{
          es: 'https://vimovies.com/cookies',
          en: 'https://vimovies.com/cookies'
        }}
      />
      {/* Header */}
      <div className="CookiesPage__header">
        <div className="CookiesPage__header-content">
          <h1 className="CookiesPage__title">
            {isEnglish ? 'Cookies Policy' : 'Política de Cookies'}
          </h1>
          <p className="CookiesPage__subtitle">
            {isEnglish ? 'Last updated: June 2026' : 'Última actualización: Junio 2026'}
          </p>
        </div>
      </div>

      <div className="CookiesPage__container">
        {/* Welcome Section */}
        <div className="CookiesPage__section">
          <div className="CookiesPage__welcome-card">
            <h2 className="CookiesPage__welcome-title">
              {isEnglish ? 'How We Use Cookies' : 'En Vimovies usamos cookies para que el sitio funcione bien'}
            </h2>
            <p className="CookiesPage__welcome-text">
              {isEnglish
                ? 'We use cookies to make the site work properly, to understand how visitors use it, and to show ads that help keep the content free. This page explains exactly what cookies we use, why, and how you can control them.'
                : 'Para entender cómo lo usan nuestros visitantes y para mostrar publicidad que ayuda a mantener el contenido gratuito. Esta página explica exactamente qué cookies usamos, por qué y cómo puedes controlarlas.'}
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="CookiesPage__content">
          {/* Section 1 */}
          <div className="CookiesPage__card">
            <div className="CookiesPage__card-header">
              <span className="CookiesPage__card-number">1</span>
              <h3 className="CookiesPage__card-title">
                {isEnglish ? 'What is a Cookie?' : '¿Qué es una cookie?'}
              </h3>
            </div>
            <div className="CookiesPage__card-content">
              <p className="CookiesPage__card-text">
                {isEnglish
                  ? 'A cookie is a small text file that a website saves on your device (computer, phone or tablet) when you visit it. Cookies allow the site to remember certain preferences or recognize your browser on subsequent visits.'
                  : 'Una cookie es un pequeño archivo de texto que un sitio web guarda en tu dispositivo (computadora, teléfono o tablet) cuando lo visitas. Las cookies permiten que el sitio recuerde ciertas preferencias o reconozca tu navegador en visitas posteriores.'}
              </p>
              <p className="CookiesPage__card-text">
                {isEnglish
                  ? 'Not all cookies are the same or have the same purpose. Below we explain which ones we use and why.'
                  : 'No todas las cookies son iguales ni tienen el mismo propósito. A continuación te explicamos cuáles usamos y para qué.'}
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="CookiesPage__card">
            <div className="CookiesPage__card-header">
              <span className="CookiesPage__card-number">2</span>
              <h3 className="CookiesPage__card-title">
                {isEnglish ? 'Types of Cookies We Use' : 'Tipos de cookies que utilizamos'}
              </h3>
            </div>
            <div className="CookiesPage__card-content">
              {/* 2.1 */}
              <p className="CookiesPage__card-text">
                <strong>{isEnglish ? '2.1 Technical or Necessary Cookies' : '2.1 Cookies técnicas o necesarias'}</strong>
              </p>
              <p className="CookiesPage__card-text">
                {isEnglish
                  ? 'They are essential for the site to function correctly. Without them, basic functions like navigation between pages or the cookie preferences panel would not be available.'
                  : 'Son indispensables para que el sitio funcione correctamente. Sin ellas, funciones básicas como la navegación entre páginas o el panel de preferencias de cookies no estarían disponibles.'}
              </p>
              <div className="CookiesPage__table">
                <table>
                  <thead>
                    <tr>
                      <th>{isEnglish ? 'Cookie' : 'Cookie'}</th>
                      <th>{isEnglish ? 'Provider' : 'Proveedor'}</th>
                      <th>{isEnglish ? 'Purpose' : 'Propósito'}</th>
                      <th>{isEnglish ? 'Duration' : 'Duración'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>cookie_preferences</td>
                      <td>Vimovies</td>
                      <td>{isEnglish ? 'Remembers your choice about cookie usage' : 'Recuerda tu elección sobre el uso de cookies'}</td>
                      <td>{isEnglish ? '12 months' : '12 meses'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="CookiesPage__card-text">
                {isEnglish
                  ? 'These cookies do not collect personal information and do not require your prior consent.'
                  : 'Estas cookies no recopilan información personal y no requieren tu consentimiento previo.'}
              </p>

              {/* 2.2 */}
              <p className="CookiesPage__card-text">
                <strong>{isEnglish ? '2.2 Analytical Cookies' : '2.2 Cookies analíticas'}</strong>
              </p>
              <p className="CookiesPage__card-text">
                {isEnglish
                  ? 'They help us understand how visitors interact with the site: which pages they visit most, how long they stay, where they come from, and what content is most useful. This information is processed anonymously and in aggregate; it never identifies individual users.'
                  : 'Nos ayudan a entender cómo los visitantes interactúan con el sitio: qué páginas visitan más, cuánto tiempo permanecen, desde dónde llegan y qué contenido resulta más útil. Esta información se procesa de forma anónima y agregada; nunca identifica a usuarios individuales.'}
              </p>
              <div className="CookiesPage__table">
                <table>
                  <thead>
                    <tr>
                      <th>{isEnglish ? 'Cookie' : 'Cookie'}</th>
                      <th>{isEnglish ? 'Provider' : 'Proveedor'}</th>
                      <th>{isEnglish ? 'Purpose' : 'Propósito'}</th>
                      <th>{isEnglish ? 'Duration' : 'Duración'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>_ga</td>
                      <td>Google Analytics</td>
                      <td>{isEnglish ? 'Distinguishes unique users anonymously' : 'Distingue usuarios únicos de forma anónima'}</td>
                      <td>{isEnglish ? '2 years' : '2 años'}</td>
                    </tr>
                    <tr>
                      <td>_ga_*</td>
                      <td>Google Analytics</td>
                      <td>{isEnglish ? 'Maintains analytics session state' : 'Mantiene el estado de la sesión analítica'}</td>
                      <td>{isEnglish ? '2 years' : '2 años'}</td>
                    </tr>
                    <tr>
                      <td>_gid</td>
                      <td>Google Analytics</td>
                      <td>{isEnglish ? 'Identifies individual sessions anonymously' : 'Identifica sesiones individuales de forma anónima'}</td>
                      <td>{isEnglish ? '24 hours' : '24 horas'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="CookiesPage__card-text">
                {isEnglish
                  ? 'You can consult Google Analytics privacy policy at policies.google.com/privacy.'
                  : 'Puedes consultar la política de privacidad de Google Analytics en policies.google.com/privacy.'}
              </p>

              {/* 2.3 */}
              <p className="CookiesPage__card-text">
                <strong>{isEnglish ? '2.3 Advertising Cookies' : '2.3 Cookies publicitarias'}</strong>
              </p>
              <p className="CookiesPage__card-text">
                {isEnglish
                  ? 'Vimovies displays ads through Google AdSense. This advertising directly contributes to the economic sustainability of the site and allows us to offer content for free.'
                  : 'Vimovies muestra publicidad a través de Google AdSense. Esta publicidad contribuye directamente al sostenimiento económico del sitio y nos permite ofrecer contenido de forma gratuita.'}
              </p>
              <p className="CookiesPage__card-text">
                {isEnglish
                  ? 'Google and its advertising partners may use cookies to:'
                  : 'Google y sus socios publicitarios pueden usar cookies para:'}
              </p>
              <ul className="CookiesPage__card-list">
                <li>
                  {isEnglish
                    ? 'Show relevant ads based on your browsing history on this and other sites'
                    : 'Mostrar anuncios relevantes según tu historial de navegación en este y otros sitios'}
                </li>
                <li>
                  {isEnglish
                    ? 'Measure the effectiveness of displayed ads'
                    : 'Medir la efectividad de los anuncios mostrados'}
                </li>
                <li>
                  {isEnglish
                    ? 'Limit the number of times you see the same ad'
                    : 'Limitar la cantidad de veces que ves el mismo anuncio'}
                </li>
                <li>
                  {isEnglish
                    ? 'Prevent you from seeing ads that are no longer relevant to you'
                    : 'Evitar que veas anuncios que ya no son relevantes para ti'}
                </li>
              </ul>
              <div className="CookiesPage__table">
                <table>
                  <thead>
                    <tr>
                      <th>{isEnglish ? 'Cookie' : 'Cookie'}</th>
                      <th>{isEnglish ? 'Provider' : 'Proveedor'}</th>
                      <th>{isEnglish ? 'Purpose' : 'Propósito'}</th>
                      <th>{isEnglish ? 'Duration' : 'Duración'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>__gads</td>
                      <td>Google AdSense</td>
                      <td>{isEnglish ? 'Registers ad interactions' : 'Registra interacciones con anuncios'}</td>
                      <td>{isEnglish ? '13 months' : '13 meses'}</td>
                    </tr>
                    <tr>
                      <td>__gpi</td>
                      <td>Google AdSense</td>
                      <td>{isEnglish ? 'Stores advertising preferences' : 'Almacena preferencias publicitarias'}</td>
                      <td>{isEnglish ? '13 months' : '13 meses'}</td>
                    </tr>
                    <tr>
                      <td>IDE</td>
                      <td>Google DoubleClick</td>
                      <td>{isEnglish ? 'Cross-site personalized advertising' : 'Publicidad personalizada entre sitios'}</td>
                      <td>{isEnglish ? '13 months' : '13 meses'}</td>
                    </tr>
                    <tr>
                      <td>DSID</td>
                      <td>Google</td>
                      <td>{isEnglish ? 'Identifies Google registered users for personalization' : 'Identifica usuarios registrados en Google para personalización'}</td>
                      <td>{isEnglish ? 'Session' : 'Sesión'}</td>
                    </tr>
                    <tr>
                      <td>NID</td>
                      <td>Google</td>
                      <td>{isEnglish ? 'Stores user preferences for ads' : 'Almacena preferencias del usuario para anuncios'}</td>
                      <td>{isEnglish ? '6 months' : '6 meses'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="CookiesPage__card-text">
                {isEnglish
                  ? 'These cookies are only activated if you accept advertising cookies in our consent panel.'
                  : 'Estas cookies solo se activan si aceptas las cookies publicitarias en nuestro panel de consentimiento.'}
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="CookiesPage__card">
            <div className="CookiesPage__card-header">
              <span className="CookiesPage__card-number">3</span>
              <h3 className="CookiesPage__card-title">
                {isEnglish ? 'Additional Third-Party Cookies' : 'Cookies de terceros adicionales'}
              </h3>
            </div>
            <div className="CookiesPage__card-content">
              <p className="CookiesPage__card-text">
                {isEnglish
                  ? 'Some elements of the site, such as embedded video players, social media buttons or external content, may set their own cookies when you interact with them. These providers operate under their own privacy policies, over which Vimovies has no direct control.'
                  : 'Algunos elementos del sitio, como reproductores de video embebidos, botones de redes sociales o contenido externo, pueden establecer sus propias cookies al interactuar con ellos. Estos proveedores operan bajo sus propias políticas de privacidad, sobre las cuales Vimovies no tiene control directo.'}
              </p>
              <p className="CookiesPage__card-text">
                <strong>{isEnglish ? 'Providers that may be present:' : 'Proveedores que pueden estar presentes:'}</strong>
              </p>
              <ul className="CookiesPage__card-list">
                <li>YouTube / Google — policies.google.com/privacy</li>
                <li>Twitter / X — twitter.com/privacy</li>
                <li>Facebook / Meta — facebook.com/privacy/policy</li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div className="CookiesPage__card">
            <div className="CookiesPage__card-header">
              <span className="CookiesPage__card-number">4</span>
              <h3 className="CookiesPage__card-title">
                {isEnglish ? 'How to Manage Your Cookies' : 'Cómo gestionar tus cookies'}
              </h3>
            </div>
            <div className="CookiesPage__card-content">
              <p className="CookiesPage__card-text">
                {isEnglish
                  ? 'You have several ways to control the use of cookies:'
                  : 'Tienes varias formas de controlar el uso de cookies:'}
              </p>

              <p className="CookiesPage__card-text">
                <strong>{isEnglish ? 'Vimovies Preferences Panel' : 'Panel de preferencias de Vimovies'}</strong>
              </p>
              <p className="CookiesPage__card-text">
                {isEnglish
                  ? 'When you visit the site for the first time, you will see a notice where you can accept all cookies, reject non-essential ones, or customize your choice category by category. You can change this preference at any time from the "Cookie Settings" link in the footer.'
                  : 'Al visitar el sitio por primera vez verás un aviso donde puedes aceptar todas las cookies, rechazar las no esenciales o personalizar tu elección categoría por categoría. Puedes cambiar esta preferencia en cualquier momento desde el enlace "Configuración de cookies" en el pie de página.'}
              </p>

              <p className="CookiesPage__card-text">
                <strong>{isEnglish ? 'Your Browser Settings' : 'Configuración de tu navegador'}</strong>
              </p>
              <p className="CookiesPage__card-text">
                {isEnglish
                  ? 'All modern browsers allow you to manage cookies directly:'
                  : 'Todos los navegadores modernos permiten gestionar cookies directamente:'}
              </p>
              <ul className="CookiesPage__card-list">
                <li>Google Chrome</li>
                <li>Mozilla Firefox</li>
                <li>Safari</li>
                <li>Microsoft Edge</li>
              </ul>
              <p className="CookiesPage__card-text">
                {isEnglish
                  ? 'Keep in mind that blocking all cookies may affect the functioning of some parts of the site.'
                  : 'Ten en cuenta que bloquear todas las cookies puede afectar el funcionamiento de algunas partes del sitio.'}
              </p>

              <p className="CookiesPage__card-text">
                <strong>{isEnglish ? 'Google Personalized Advertising' : 'Publicidad personalizada de Google'}</strong>
              </p>
              <p className="CookiesPage__card-text">
                {isEnglish
                  ? 'You can disable Google ad personalization at any time from:'
                  : 'Puedes desactivar la personalización de anuncios de Google en cualquier momento desde:'}
              </p>
              <p className="CookiesPage__card-text">
                👉 adssettings.google.com
              </p>

              <p className="CookiesPage__card-text">
                <strong>{isEnglish ? 'Third-Party Advertising Networks' : 'Redes publicitarias de terceros'}</strong>
              </p>
              <p className="CookiesPage__card-text">
                {isEnglish
                  ? 'To opt out of participating advertising networks globally:'
                  : 'Para optar por salir de las redes publicitarias participantes a nivel global:'}
              </p>
              <ul className="CookiesPage__card-list">
                <li>👉 aboutads.info/choices — Digital Advertising Alliance</li>
                <li>👉 youronlinechoices.com — {isEnglish ? 'For users in Europe' : 'Para usuarios en Europa'}</li>
              </ul>
            </div>
          </div>

          {/* Section 5 */}
          <div className="CookiesPage__card">
            <div className="CookiesPage__card-header">
              <span className="CookiesPage__card-number">5</span>
              <h3 className="CookiesPage__card-title">
                {isEnglish ? 'Consent and Legal Basis' : 'Consentimiento y base legal'}
              </h3>
            </div>
            <div className="CookiesPage__card-content">
              <p className="CookiesPage__card-text">
                {isEnglish
                  ? 'In accordance with the General Data Protection Regulation (GDPR) and similar legislation, non-essential cookies require your prior, explicit and informed consent before being activated.'
                  : 'De acuerdo con el Reglamento General de Protección de Datos (GDPR) y legislaciones similares, las cookies no esenciales requieren tu consentimiento previo, explícito e informado antes de activarse.'}
              </p>
              <p className="CookiesPage__card-text">
                {isEnglish ? 'In Vimovies:' : 'En Vimovies:'}
              </p>
              <ul className="CookiesPage__card-list">
                <li>
                  {isEnglish
                    ? 'Technical cookies are activated automatically when the site loads, without requiring consent.'
                    : 'Las cookies técnicas se activan automáticamente al cargar el sitio, sin necesidad de consentimiento.'}
                </li>
                <li>
                  {isEnglish
                    ? 'Analytical and advertising cookies are only activated if you accept them through our consent panel.'
                    : 'Las cookies analíticas y publicitarias solo se activan si las aceptas mediante nuestro panel de consentimiento.'}
                </li>
                <li>
                  {isEnglish
                    ? 'You can withdraw your consent at any time without this affecting the legality of what was previously processed.'
                    : 'Puedes retirar tu consentimiento en cualquier momento sin que esto afecte la legalidad de lo procesado anteriormente.'}
                </li>
              </ul>
            </div>
          </div>

          {/* Section 6 */}
          <div className="CookiesPage__card">
            <div className="CookiesPage__card-header">
              <span className="CookiesPage__card-number">6</span>
              <h3 className="CookiesPage__card-title">
                {isEnglish ? 'Updates to This Policy' : 'Actualizaciones de esta política'}
              </h3>
            </div>
            <div className="CookiesPage__card-content">
              <p className="CookiesPage__card-text">
                {isEnglish
                  ? 'This policy may be updated to reflect changes in the cookies we use, third-party services, or applicable legislation. When we do so, we will update the date at the top and, if the changes are significant, we will indicate it visibly on the site.'
                  : 'Esta política puede actualizarse para reflejar cambios en las cookies que usamos, en los servicios de terceros o en la legislación aplicable. Cuando lo hagamos, actualizaremos la fecha en la parte superior y, si los cambios son significativos, lo indicaremos de forma visible en el sitio.'}
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="CookiesPage__card">
            <div className="CookiesPage__card-header">
              <span className="CookiesPage__card-number">7</span>
              <h3 className="CookiesPage__card-title">
                {isEnglish ? 'Contact' : 'Contacto'}
              </h3>
            </div>
            <div className="CookiesPage__card-content">
              <p className="CookiesPage__card-text">
                {isEnglish
                  ? 'If you have questions about the use of cookies on Vimovies or want to exercise your privacy rights, you can contact us at:'
                  : 'Si tienes preguntas sobre el uso de cookies en Vimovies o quieres ejercer tus derechos de privacidad, puedes contactarnos en:'}
              </p>
              <div className="CookiesPage__contact-info">
                <a href="/contacto" className="CookiesPage__contact-link">
                  📧 {isEnglish ? '[contact email]' : '[correo de contacto]'}
                </a>
                <a href="/contacto" className="CookiesPage__contact-link">
                  🌐 {isEnglish ? '[contact form on the site]' : '[formulario de contacto en el sitio]'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="CookiesPage__footer">
          <p className="CookiesPage__footer-text">
            Vimovies — {isEnglish ? 'Transparent about cookies' : 'Transparencia en el uso de cookies'}
          </p>
        </div>
      </div>
    </div>
  )
}
