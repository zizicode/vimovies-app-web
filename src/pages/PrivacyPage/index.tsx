import { SEO } from '../../hooks/useSEO'
import { useI18n } from '../../store/locate.store'
import './PrivacyPage.scss'

export default function PrivacyPage() {
  const { locale } = useI18n()
  const isEnglish = locale === 'en'

  return (
    <div className="PrivacyPage">
      <SEO
        title={isEnglish ? 'Privacy Policy | ViMovies' : 'Política de Privacidad | ViMovies'}
        description={isEnglish ? 'Learn how Viovies collects, uses, and protects your personal information.' : 'Aprende cómo Vimovies recopila, usa y protege tu información personal.'}
        canonical={isEnglish ? 'https://vimovies.com/privacy' : 'https://vimovies.com/privacidad'}
        type="website"
        alternates={{
          es: 'https://vimovies.com/privacidad',
          en: 'https://vimovies.com/privacy'
        }}
      />
      {/* Header */}
      <div className="PrivacyPage__header">
        <div className="PrivacyPage__header-content">
          <h1 className="PrivacyPage__title">
            {isEnglish ? 'Privacy Policy' : 'Política de Privacidad'}
          </h1>
          <p className="PrivacyPage__subtitle">
            {isEnglish ? 'Last updated: June 2026' : 'Última actualización: Junio 2026'}
          </p>
        </div>
      </div>

      <div className="PrivacyPage__container">
        {/* Welcome Section */}
        <div className="PrivacyPage__section">
          <div className="PrivacyPage__welcome-card">
            <h2 className="PrivacyPage__welcome-title">
              {isEnglish ? 'Your Privacy Matters' : 'En Vimovies creemos que la privacidad es un derecho, no un trámite'}
            </h2>
            <p className="PrivacyPage__welcome-text">
              {isEnglish
                ? 'This policy clearly explains what information we collect, how we use it, and what control you have over it.'
                : 'Esta política explica de forma clara qué información recopilamos, para qué la usamos y qué control tienes sobre ella.'}
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="PrivacyPage__content">
          {/* Section 1 */}
          <div className="PrivacyPage__card">
            <div className="PrivacyPage__card-header">
              <span className="PrivacyPage__card-number">1</span>
              <h3 className="PrivacyPage__card-title">
                {isEnglish ? 'What Information We Collect' : 'Qué información recopilamos'}
              </h3>
            </div>
            <div className="PrivacyPage__card-content">
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'Vimovies does not request or store personal data such as name, email or phone number unless you voluntarily provide it (for example, through a contact form).'
                  : 'Vimovies no solicita ni almacena datos personales como nombre, correo electrónico o número de teléfono a menos que tú los proporciones voluntariamente (por ejemplo, a través de un formulario de contacto).'}
              </p>
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'Automatically, during navigation, we may collect non-identifiable technical information such as:'
                  : 'De forma automática, durante la navegación, podemos recopilar información técnica no identificable de forma individual, como:'}
              </p>
              <ul className="PrivacyPage__card-list">
                <li>
                  {isEnglish
                    ? 'Browser type and device'
                    : 'Tipo de navegador y dispositivo'}
                </li>
                <li>
                  {isEnglish
                    ? 'Operating system'
                    : 'Sistema operativo'}
                </li>
                <li>
                  {isEnglish
                    ? 'Pages visited and time spent'
                    : 'Páginas visitadas y tiempo de permanencia'}
                </li>
                <li>
                  {isEnglish
                    ? 'Country or region of access (not exact address)'
                    : 'País o región de acceso (no dirección exacta)'}
                </li>
                <li>
                  {isEnglish
                    ? 'Traffic source (search, direct link, social media, etc.)'
                    : 'Fuente de tráfico (búsqueda, enlace directo, redes sociales, etc.)'}
                </li>
              </ul>
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'This information is collected in an aggregated and anonymous way solely to understand how the site is used and improve it.'
                  : 'Esta información se recopila de forma agregada y anónima con el único fin de entender cómo se usa el sitio y mejorarlo.'}
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="PrivacyPage__card">
            <div className="PrivacyPage__card-header">
              <span className="PrivacyPage__card-number">2</span>
              <h3 className="PrivacyPage__card-title">
                {isEnglish ? 'How We Use That Information' : 'Cómo usamos esa información'}
              </h3>
            </div>
            <div className="PrivacyPage__card-content">
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'The technical information collected is used exclusively to:'
                  : 'La información técnica recopilada se utiliza exclusivamente para:'}
              </p>
              <ul className="PrivacyPage__card-list">
                <li>
                  {isEnglish
                    ? 'Analyze site performance and traffic'
                    : 'Analizar el rendimiento y tráfico del sitio'}
                </li>
                <li>
                  {isEnglish
                    ? 'Detect technical errors and improve browsing experience'
                    : 'Detectar errores técnicos y mejorar la experiencia de navegación'}
                </li>
                <li>
                  {isEnglish
                    ? 'Maintain platform security and stability'
                    : 'Mantener la seguridad y estabilidad de la plataforma'}
                </li>
                <li>
                  {isEnglish
                    ? 'Understand what content is most useful or relevant to our visitors'
                    : 'Entender qué contenido resulta más útil o relevante para nuestros visitantes'}
                </li>
              </ul>
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'We do not use this information to create individual user profiles or make automated decisions about people.'
                  : 'No usamos esta información para crear perfiles individuales de usuarios ni para tomar decisiones automatizadas sobre personas.'}
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="PrivacyPage__card">
            <div className="PrivacyPage__card-header">
              <span className="PrivacyPage__card-number">3</span>
              <h3 className="PrivacyPage__card-title">
                {isEnglish ? 'Cookies' : 'Cookies'}
              </h3>
            </div>
            <div className="PrivacyPage__card-content">
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'Vimovies uses cookies, which are small text files saved on your device when you visit the site. The cookies we use fall into three categories:'
                  : 'Vimovies utiliza cookies, que son pequeños archivos de texto que se guardan en tu dispositivo al visitar el sitio. Las cookies que utilizamos se dividen en tres categorías:'}
              </p>
              <p className="PrivacyPage__card-text">
                <strong>{isEnglish ? 'Technical Cookies (necessary)' : 'Cookies técnicas (necesarias)'}</strong>
              </p>
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'Essential for the basic functioning of the site. They do not require your consent and do not collect personal information.'
                  : 'Imprescindibles para el funcionamiento básico del sitio. No requieren tu consentimiento y no recopilan información personal.'}
              </p>
              <p className="PrivacyPage__card-text">
                <strong>{isEnglish ? 'Analytical Cookies' : 'Cookies analíticas'}</strong>
              </p>
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'They help us understand how visitors interact with the site anonymously and in aggregate. We use tools like Google Analytics for this purpose.'
                  : 'Nos ayudan a entender cómo los visitantes interactúan con el sitio de forma anónima y agregada. Usamos herramientas como Google Analytics para este fin.'}
              </p>
              <p className="PrivacyPage__card-text">
                <strong>{isEnglish ? 'Advertising Cookies' : 'Cookies publicitarias'}</strong>
              </p>
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'Vimovies uses Google AdSense to display ads. Google may use cookies to show ads based on previous visits to this or other sites. You can review and manage Google advertising preferences in Google Account — Ad Settings.'
                  : 'Vimovies utiliza Google AdSense para mostrar publicidad. Google puede usar cookies para mostrar anuncios basados en visitas anteriores a este u otros sitios. Puedes consultar y gestionar las preferencias publicitarias de Google en Mi cuenta de Google — Configuración de anuncios.'}
              </p>
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'When you enter the site for the first time, we present a cookie notice where you can accept, reject or customize your preferences. You can change that choice at any time from the "Cookie Settings" link in the footer.'
                  : 'Al ingresar al sitio por primera vez, te presentamos un aviso de cookies donde puedes aceptar, rechazar o personalizar tus preferencias. Puedes cambiar esa elección en cualquier momento desde el enlace "Configuración de cookies" en el pie de página.'}
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="PrivacyPage__card">
            <div className="PrivacyPage__card-header">
              <span className="PrivacyPage__card-number">4</span>
              <h3 className="PrivacyPage__card-title">
                {isEnglish ? 'Advertising: Google AdSense' : 'Publicidad: Google AdSense'}
              </h3>
            </div>
            <div className="PrivacyPage__card-content">
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'Vimovies displays ads through Google AdSense. As part of this service, Google and its partners may use cookies to display relevant ads based on your browsing activity.'
                  : 'Vimovies muestra anuncios a través de Google AdSense. Como parte de este servicio, Google y sus socios pueden utilizar cookies para mostrar anuncios relevantes según tu actividad de navegación.'}
              </p>
              <p className="PrivacyPage__card-text">
                <strong>{isEnglish ? 'What you should know:' : 'Lo que debes saber:'}</strong>
              </p>
              <ul className="PrivacyPage__card-list">
                <li>
                  {isEnglish
                    ? 'Google operates as an external provider and is governed by its own Privacy Policy.'
                    : 'Google opera como proveedor externo y se rige por su propia Política de Privacidad.'}
                </li>
                <li>
                  {isEnglish
                    ? 'Ads may be personalized based on browsing history if the user has not opted out of personalization.'
                    : 'Los anuncios pueden ser personalizados según el historial de navegación si el usuario no ha optado por salir de la personalización.'}
                </li>
                <li>
                  {isEnglish
                    ? 'You can disable Google personalized advertising at adssettings.google.com.'
                    : 'Puedes desactivar la publicidad personalizada de Google en adssettings.google.com.'}
                </li>
                <li>
                  {isEnglish
                    ? 'You can also opt out of third-party advertising networks at aboutads.info (Digital Advertising Alliance).'
                    : 'También puedes optar por salir de redes publicitarias de terceros en aboutads.info (Digital Advertising Alliance).'}
                </li>
              </ul>
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'Vimovies does not have access to the data that Google collects through AdSense.'
                  : 'Vimovies no tiene acceso a los datos que Google recopila a través de AdSense.'}
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="PrivacyPage__card">
            <div className="PrivacyPage__card-header">
              <span className="PrivacyPage__card-number">5</span>
              <h3 className="PrivacyPage__card-title">
                {isEnglish ? 'Third-Party Services' : 'Servicios de terceros'}
              </h3>
            </div>
            <div className="PrivacyPage__card-content">
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'In addition to Google AdSense and Google Analytics, the site may integrate external services such as video players, social widgets or content sources. Each of these services operates under its own privacy policy and may set its own cookies when interacting with them.'
                  : 'Además de Google AdSense y Google Analytics, el sitio puede integrar servicios externos como reproductores de video, widgets sociales o fuentes de contenido. Cada uno de estos servicios opera bajo su propia política de privacidad y puede establecer sus propias cookies al interactuar con ellos.'}
              </p>
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'We recommend reviewing the privacy policies of any external service you interact with from our site.'
                  : 'Te recomendamos revisar las políticas de privacidad de cualquier servicio externo con el que interactúes desde nuestro sitio.'}
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="PrivacyPage__card">
            <div className="PrivacyPage__card-header">
              <span className="PrivacyPage__card-number">6</span>
              <h3 className="PrivacyPage__card-title">
                {isEnglish ? 'When We Share Information' : 'Cuándo compartimos información'}
              </h3>
            </div>
            <div className="PrivacyPage__card-content">
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'We do not sell, rent or commercialize information about our visitors.'
                  : 'No vendemos, alquilamos ni comercializamos información de nuestros visitantes.'}
              </p>
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'We may share information only in the following cases:'
                  : 'Podríamos compartir información únicamente en los siguientes casos:'}
              </p>
              <ul className="PrivacyPage__card-list">
                <li>
                  {isEnglish
                    ? 'When required by a competent legal or judicial authority'
                    : 'Cuando sea requerido por una autoridad legal o judicial competente'}
                </li>
                <li>
                  {isEnglish
                    ? 'To protect the integrity, security or legal rights of the site and its users'
                    : 'Para proteger la integridad, seguridad o derechos legales del sitio y sus usuarios'}
                </li>
                <li>
                  {isEnglish
                    ? 'With technical service providers that help us operate the site, under confidentiality agreements'
                    : 'Con proveedores de servicios técnicos que nos ayudan a operar el sitio, bajo acuerdos de confidencialidad'}
                </li>
              </ul>
            </div>
          </div>

          {/* Section 7 */}
          <div className="PrivacyPage__card">
            <div className="PrivacyPage__card-header">
              <span className="PrivacyPage__card-number">7</span>
              <h3 className="PrivacyPage__card-title">
                {isEnglish ? 'Your Rights and Options' : 'Tus derechos y opciones'}
              </h3>
            </div>
            <div className="PrivacyPage__card-content">
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'You have control over your experience on Vimovies. You can:'
                  : 'Tienes el control sobre tu experiencia en Vimovies. Puedes:'}
              </p>
              <ul className="PrivacyPage__card-list">
                <li>
                  {isEnglish
                    ? 'Manage cookies from your browser settings or our preferences panel'
                    : 'Gestionar cookies desde la configuración de tu navegador o nuestro panel de preferencias'}
                </li>
                <li>
                  {isEnglish
                    ? 'Disable Google personalized advertising at adssettings.google.com'
                    : 'Desactivar la publicidad personalizada de Google en adssettings.google.com'}
                </li>
                <li>
                  {isEnglish
                    ? 'Request information about technical data associated with your session by writing to the contact email'
                    : 'Solicitar información sobre los datos técnicos asociados a tu sesión escribiéndonos al correo de contacto'}
                </li>
                <li>
                  {isEnglish
                    ? 'Browse with more privacy using your browser\'s incognito mode, although this does not completely eliminate third-party cookies'
                    : 'Navegar con mayor privacidad usando el modo incógnito de tu navegador, aunque esto no elimina completamente las cookies de terceros'}
                </li>
              </ul>
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'If you are in the European Union or the United Kingdom, you have additional rights under the GDPR, including the right of access, rectification and deletion of data. You can exercise them by contacting us directly.'
                  : 'Si te encuentras en la Unión Europea o el Reino Unido, tienes derechos adicionales bajo el GDPR, incluyendo el derecho de acceso, rectificación y supresión de datos. Puedes ejercerlos contactándonos directamente.'}
              </p>
            </div>
          </div>

          {/* Section 8 */}
          <div className="PrivacyPage__card">
            <div className="PrivacyPage__card-header">
              <span className="PrivacyPage__card-number">8</span>
              <h3 className="PrivacyPage__card-title">
                {isEnglish ? 'Data Retention' : 'Retención de datos'}
              </h3>
            </div>
            <div className="PrivacyPage__card-content">
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'Technical data collected through analytics tools is retained according to the deadlines configured in each tool (by default, Google Analytics retains data for 14 months). Vimovies does not store its own logs of individual user sessions.'
                  : 'Los datos técnicos recopilados a través de herramientas analíticas se conservan según los plazos configurados en cada herramienta (por defecto, Google Analytics conserva los datos durante 14 meses). Vimovies no almacena registros propios de sesiones individuales de usuarios.'}
              </p>
            </div>
          </div>

          {/* Section 9 */}
          <div className="PrivacyPage__card">
            <div className="PrivacyPage__card-header">
              <span className="PrivacyPage__card-number">9</span>
              <h3 className="PrivacyPage__card-title">
                {isEnglish ? 'Security' : 'Seguridad'}
              </h3>
            </div>
            <div className="PrivacyPage__card-content">
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'We apply reasonable technical measures to protect the integrity of the site and prevent unauthorized access. However, no system on the internet is completely infallible. If we detect any incident that could affect your data, we will act diligently to resolve it.'
                  : 'Aplicamos medidas técnicas razonables para proteger la integridad del sitio y prevenir accesos no autorizados. Sin embargo, ningún sistema en internet es completamente infalible. En caso de detectar algún incidente que pudiera afectar tus datos, actuaremos con diligencia para resolverlo.'}
              </p>
            </div>
          </div>

          {/* Section 10 */}
          <div className="PrivacyPage__card">
            <div className="PrivacyPage__card-header">
              <span className="PrivacyPage__card-number">10</span>
              <h3 className="PrivacyPage__card-title">
                {isEnglish ? 'Changes to This Policy' : 'Cambios a esta política'}
              </h3>
            </div>
            <div className="PrivacyPage__card-content">
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'We may update this policy when necessary, for example, due to legal changes, new site features or modifications to third-party services we use. When we do, we will update the date at the top.'
                  : 'Podemos actualizar esta política cuando sea necesario, por ejemplo, ante cambios legales, nuevas funcionalidades del sitio o modificaciones en los servicios de terceros que usamos. Cuando lo hagamos, actualizaremos la fecha en la parte superior.'}
              </p>
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'We invite you to review it occasionally. Continued use of the site implies acceptance of the current version.'
                  : 'Te invitamos a revisarla ocasionalmente. El uso continuado del sitio implica la aceptación de la versión vigente.'}
              </p>
            </div>
          </div>

          {/* Section 11 */}
          <div className="PrivacyPage__card">
            <div className="PrivacyPage__card-header">
              <span className="PrivacyPage__card-number">11</span>
              <h3 className="PrivacyPage__card-title">
                {isEnglish ? 'Contact' : 'Contacto'}
              </h3>
            </div>
            <div className="PrivacyPage__card-content">
              <p className="PrivacyPage__card-text">
                {isEnglish
                  ? 'If you have questions about this policy or want to exercise any of your rights, write to us:'
                  : 'Si tienes dudas sobre esta política o quieres ejercer alguno de tus derechos, escríbenos:'}
              </p>
              <div className="PrivacyPage__contact-info">
                <a href="/contacto" className="PrivacyPage__contact-link">
                  📧 {isEnglish ? '[contact email]' : '[correo de contacto]'}
                </a>
                <a href="/contacto" className="PrivacyPage__contact-link">
                  🌐 {isEnglish ? '[contact form on the site]' : '[formulario de contacto en el sitio]'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="PrivacyPage__footer">
          <p className="PrivacyPage__footer-text">
            Vimovies — {isEnglish ? 'Your privacy matters as much as good cinema' : 'Tu privacidad importa tanto como el buen cine'}
          </p>
        </div>
      </div>
    </div>
  )
}
