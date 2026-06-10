import { SEO } from '../../hooks/useSEO'
import { useI18n } from '../../store/locate.store'
import './TermsPage.scss'

export default function TermsPage() {
  const { locale } = useI18n()
  const isEnglish = locale === 'en'

  return (
    <div className="TermsPage">
      <SEO
        title={isEnglish ? 'Terms of Service | ViMovies' : 'Términos y Condiciones | ViMovies'}
        description={isEnglish ? 'Read our Terms of Service to understand your rights and responsibilities when using ViMovies.' : 'Lee nuestros Términos y Condiciones para entender tus derechos y responsabilidades al usar ViMovies.'}
        canonical={isEnglish ? 'https://vimovies.com/terms' : 'https://vimovies.com/terminos'}
        type="website"
        alternates={{
          es: 'https://vimovies.com/terminos',
          en: 'https://vimovies.com/terms'
        }}
      />
      {/* Header */}
      <div className="TermsPage__header">
        <div className="TermsPage__header-content">
          <h1 className="TermsPage__title">
            {isEnglish ? 'Terms and Conditions' : 'Términos y Condiciones'}
          </h1>
          <p className="TermsPage__subtitle">
            {isEnglish ? 'Last updated: June 2026' : 'Última actualización: Junio 2026'}
          </p>
        </div>
      </div>

      <div className="TermsPage__container">
        {/* Welcome Section */}
        <div className="TermsPage__section">
          <div className="TermsPage__welcome-card">
            <h2 className="TermsPage__welcome-title">
              {isEnglish ? 'Welcome to Vimovies' : 'Bienvenido a Vimovies'}
            </h2>
            <p className="TermsPage__welcome-text">
              {isEnglish
                ? 'Thank you for visiting Vimovies. By using this site, you accept the terms described below. We recommend reading them carefully; they are written in clear language so you know exactly what to expect from us and what we expect from you.'
                : 'Gracias por visitar Vimovies. Al utilizar este sitio, aceptas los términos descritos a continuación. Te recomendamos leerlos con calma; están escritos en lenguaje claro para que sepas exactamente qué puedes esperar de nosotros y qué esperamos de ti.'}
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="TermsPage__content">
          {/* Section 1 */}
          <div className="TermsPage__card">
            <div className="TermsPage__card-header">
              <span className="TermsPage__card-number">1</span>
              <h3 className="TermsPage__card-title">
                {isEnglish ? 'What is Vimovies' : 'Qué es Vimovies'}
              </h3>
            </div>
            <div className="TermsPage__card-content">
              <p className="TermsPage__card-text">
                {isEnglish
                  ? 'Vimovies is an editorial platform dedicated to the world of cinema and series. Here you will find reviews, rankings, recommendations, opinion articles, information about movies, actors and directors, and audiovisual content of an informational and cultural nature.'
                  : 'Vimovies es una plataforma editorial dedicada al mundo del cine y las series. Aquí encontrarás reseñas, rankings, recomendaciones, artículos de opinión, información sobre películas, actores y directores, y contenido audiovisual de carácter informativo y cultural.'}
              </p>
              <p className="TermsPage__card-text">
                {isEnglish
                  ? 'All published content is for informational and editorial purposes. The ratings, reviews and opinions represent the site\'s editorial criteria and do not constitute professional advice of any kind.'
                  : 'Todo el contenido publicado tiene fines informativos y editoriales. Las calificaciones, reseñas y opiniones representan el criterio editorial del sitio y no constituyen asesoramiento profesional de ningún tipo.'}
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="TermsPage__card">
            <div className="TermsPage__card-header">
              <span className="TermsPage__card-number">2</span>
              <h3 className="TermsPage__card-title">
                {isEnglish ? 'Acceptable Use' : 'Uso aceptable'}
              </h3>
            </div>
            <div className="TermsPage__card-content">
              <p className="TermsPage__card-text">
                {isEnglish
                  ? 'Vimovies is designed to be a useful, respectful and safe space. By using it, you commit to:'
                  : 'Vimovies está diseñado para ser un espacio útil, respetuoso y seguro. Al utilizarlo, te comprometes a:'}
              </p>
              <ul className="TermsPage__card-list">
                <li>
                  {isEnglish
                    ? 'Access the content for personal, informational or educational purposes.'
                    : 'Acceder al contenido con fines personales, informativos o educativos.'}
                </li>
                <li>
                  {isEnglish
                    ? 'Not attempt to interfere with the technical operation of the site.'
                    : 'No intentar interferir con el funcionamiento técnico del sitio.'}
                </li>
                <li>
                  {isEnglish
                    ? 'Not reproduce, distribute or commercialize the site\'s content without prior authorization.'
                    : 'No reproducir, distribuir ni comercializar el contenido del sitio sin autorización previa.'}
                </li>
                <li>
                  {isEnglish
                    ? 'Behave respectfully if the site enables interaction features (comments, ratings, etc.).'
                    : 'Comportarte de manera respetuosa si el sitio habilita funciones de interacción (comentarios, valoraciones, etc.).'}
                </li>
              </ul>
              <p className="TermsPage__card-text">
                {isEnglish
                  ? 'We do not track your activities beyond what is necessary for the operation of the site and the improvement of the user experience.'
                  : 'No realizamos seguimiento de tus actividades más allá de lo necesario para el funcionamiento del sitio y la mejora de la experiencia de usuario.'}
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="TermsPage__card">
            <div className="TermsPage__card-header">
              <span className="TermsPage__card-number">3</span>
              <h3 className="TermsPage__card-title">
                {isEnglish ? 'Intellectual Property' : 'Propiedad intelectual'}
              </h3>
            </div>
            <div className="TermsPage__card-content">
              <p className="TermsPage__card-text">
                {isEnglish
                  ? 'The texts, designs, logos and original content published on Vimovies are property of the site or its respective authors and are protected by applicable copyright legislation.'
                  : 'Los textos, diseños, logotipos y contenidos originales publicados en Vimovies son propiedad del sitio o de sus respectivos autores y están protegidos por la legislación de derechos de autor aplicable.'}
              </p>
              <p className="TermsPage__card-text">
                {isEnglish
                  ? 'Movie titles, actor names, promotional images and other third-party elements are used for informational and reference purposes under the fair use principle. Vimovies does not claim ownership of such elements.'
                  : 'Los títulos de películas, nombres de actores, imágenes promocionales y demás elementos de terceros se utilizan con fines informativos y referenciales bajo el principio de uso justo (fair use). Vimovies no reclama propiedad sobre dichos elementos.'}
              </p>
              <p className="TermsPage__card-text">
                {isEnglish
                  ? 'If you are a rights holder and consider that any content should be reviewed, you can contact us directly.'
                  : 'Si eres titular de algún derecho y consideras que algún contenido debe ser revisado, puedes contactarnos directamente.'}
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="TermsPage__card">
            <div className="TermsPage__card-header">
              <span className="TermsPage__card-number">4</span>
              <h3 className="TermsPage__card-title">
                {isEnglish ? 'Third-Party Content and External Links' : 'Contenido de terceros y enlaces externos'}
              </h3>
            </div>
            <div className="TermsPage__card-content">
              <p className="TermsPage__card-text">
                {isEnglish
                  ? 'Vimovies may include links to external sites such as streaming platforms, film databases or news sources. These links are offered as a useful reference for the user.'
                  : 'Vimovies puede incluir enlaces a sitios externos como plataformas de streaming, bases de datos cinematográficas o fuentes de noticias. Estos enlaces se ofrecen como referencia útil para el usuario.'}
              </p>
              <p className="TermsPage__card-text">
                {isEnglish
                  ? 'We do not control nor are we responsible for the content, privacy policies or practices of those sites. We recommend reviewing their own terms before interacting with them.'
                  : 'No controlamos ni somos responsables del contenido, políticas de privacidad ni prácticas de esos sitios. Te recomendamos revisar sus propios términos antes de interactuar con ellos.'}
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="TermsPage__card">
            <div className="TermsPage__card-header">
              <span className="TermsPage__card-number">5</span>
              <h3 className="TermsPage__card-title">
                {isEnglish ? 'Privacy and Cookies' : 'Privacidad y cookies'}
              </h3>
            </div>
            <div className="TermsPage__card-content">
              <p className="TermsPage__card-text">
                {isEnglish
                  ? 'We respect your privacy. Vimovies may use technical and analytical cookies to improve the browsing experience and understand how the site is used in an aggregated and anonymous way.'
                  : 'Respetamos tu privacidad. Vimovies puede utilizar cookies técnicas y analíticas para mejorar la experiencia de navegación y entender cómo se usa el sitio de forma agregada y anónima.'}
              </p>
              <p className="TermsPage__card-text">
                {isEnglish
                  ? 'We do not sell or share personal data with third parties for commercial purposes. For more information, see our [Privacy Policy].'
                  : 'No vendemos ni compartimos datos personales con terceros con fines comerciales. Para más información, consulta nuestra [Política de Privacidad].'}
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="TermsPage__card">
            <div className="TermsPage__card-header">
              <span className="TermsPage__card-number">6</span>
              <h3 className="TermsPage__card-title">
                {isEnglish ? 'Limitation of Liability' : 'Limitación de responsabilidad'}
              </h3>
            </div>
            <div className="TermsPage__card-content">
              <p className="TermsPage__card-text">
                {isEnglish
                  ? 'Vimovies takes great care to offer accurate and up-to-date information, but does not guarantee that the content is free of errors at all times given the volume and dynamic nature of film information.'
                  : 'Vimovies pone todo el cuidado en ofrecer información precisa y actualizada, pero no garantizamos que el contenido esté libre de errores en todo momento dado el volumen y la naturaleza dinámica de la información cinematográfica.'}
              </p>
              <p className="TermsPage__card-text">
                {isEnglish
                  ? 'The site is offered "as is". We are not responsible for decisions made based on the published content, nor for temporary service interruptions due to technical or maintenance reasons.'
                  : 'El sitio se ofrece "tal como está". No somos responsables por decisiones tomadas con base en el contenido publicado, ni por interrupciones temporales del servicio por causas técnicas o de mantenimiento.'}
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="TermsPage__card">
            <div className="TermsPage__card-header">
              <span className="TermsPage__card-number">7</span>
              <h3 className="TermsPage__card-title">
                {isEnglish ? 'Modifications to These Terms' : 'Modificaciones a estos términos'}
              </h3>
            </div>
            <div className="TermsPage__card-content">
              <p className="TermsPage__card-text">
                {isEnglish
                  ? 'We may update these Terms and Conditions when necessary to reflect changes in the site, applicable legislation or our practices. When we make relevant changes, we will update the date at the beginning of this document.'
                  : 'Podemos actualizar estos Términos y Condiciones cuando sea necesario para reflejar cambios en el sitio, en la legislación aplicable o en nuestras prácticas. Cuando hagamos cambios relevantes, actualizaremos la fecha al inicio de este documento.'}
              </p>
              <p className="TermsPage__card-text">
                {isEnglish
                  ? 'We invite you to review this page occasionally. Continued use of the site after an update implies that you have read and accepted the new terms.'
                  : 'Te invitamos a revisar esta página ocasionalmente. El uso continuado del sitio después de una actualización implica que has leído y aceptado los nuevos términos.'}
              </p>
            </div>
          </div>

          {/* Section 8 */}
          <div className="TermsPage__card">
            <div className="TermsPage__card-header">
              <span className="TermsPage__card-number">8</span>
              <h3 className="TermsPage__card-title">
                {isEnglish ? 'Contact' : 'Contacto'}
              </h3>
            </div>
            <div className="TermsPage__card-content">
              <p className="TermsPage__card-text">
                {isEnglish
                  ? 'If you have questions, suggestions or any concern related to these terms, you can write to us at:'
                  : 'Si tienes preguntas, sugerencias o alguna inquietud relacionada con estos términos, puedes escribirnos a:'}
              </p>
              <div className="TermsPage__contact-info">
                <a href="/contacto" className="TermsPage__contact-link">
                  📧 {isEnglish ? '[contact email]' : '[correo de contacto]'}
                </a>
                <a href="/contacto" className="TermsPage__contact-link">
                  🌐 {isEnglish ? '[contact form on the site]' : '[formulario de contacto en el sitio]'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="TermsPage__footer">
          <p className="TermsPage__footer-text">
            Vimovies — {isEnglish ? 'Content for those who love cinema' : 'Contenido para quienes aman el cine'}
          </p>
        </div>
      </div>
    </div>
  )
}
