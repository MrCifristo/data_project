// src/components/About.jsx

import React from 'react';
import {useLocation} from "react-router-dom";

const About = () => {
    const location = useLocation();
    const isAboutPage = location.pathname === '/about';

    return (
        <div className={`prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto prose-primary bg-gray-100 space-y-8 p-6 ${isAboutPage ? 'pt-20' : 'pt-6'}`}>
            {/* Introducción */}
            <p className="lead mt-4 italic">
                Bienvenidos a <span className="font-semibold">NutriWizard</span>, la plataforma donde la ciencia y la tecnología se unen para ofrecerte
                información nutricional precisa y personalizada. Nuestro objetivo es convertir el conocimiento científico en herramientas accesibles para todos, ayudándote a alcanzar tu máximo bienestar.
            </p>


            {/* Sección de misión */}
            <h2 className="mt-8">Nuestra Misión</h2>
            <p className="mt-4">
                En NutriWizard, creemos que cada persona merece acceder a información nutricional confiable para tomar decisiones informadas sobre su salud. Nuestra misión es transformar el conocimiento científico en recursos prácticos, utilizando tecnología de punta para facilitar una nutrición personalizada y sostenible.
            </p>
            <p>
                Nos esforzamos por crear una plataforma intuitiva que abarque las últimas investigaciones y avances en nutrición y ciencias de la salud. Nuestros objetivos incluyen:
            </p>
            <ol className="list-decimal pl-6 mt-4">
                <li>Fomentar una cultura de vida saludable y conocimiento nutricional accesible.</li>
                <li>Brindar herramientas de fácil uso basadas en datos científicos precisos.</li>
                <li>Desarrollar recomendaciones que se adapten a las necesidades específicas de cada usuario.</li>
                <li>Actualizar constantemente nuestro sistema para ofrecer siempre lo mejor en tecnología y nutrición.</li>
            </ol>

            {/* Sección de visión */}
            <h2 className="mt-8">Nuestra Visión</h2>
            <p className="mt-4">
                Aspiramos a ser líderes mundiales en el ámbito de la nutrición personalizada, proporcionando soluciones innovadoras que mejoren la calidad de vida de millones de personas. Visualizamos un mundo donde la información nutricional no solo esté al alcance de todos, sino que también se integre de manera efectiva en la vida diaria, promoviendo hábitos saludables y sostenibles.
            </p>
            <p>
                Para lograr esta visión, nos enfocamos en:
            </p>
            <ul className="list-disc pl-6 mt-4">
                <li>Expandir nuestra base de datos con investigaciones actualizadas y precisas.</li>
                <li>Integrar tecnologías emergentes que faciliten el acceso y la comprensión de la información nutricional.</li>
                <li>Colaborar con profesionales de la salud para asegurar la calidad y relevancia de nuestras recomendaciones.</li>
                <li>Promover la educación nutricional a través de recursos interactivos y accesibles.</li>
            </ul>

            {/* Sección de valores */}
            <h2 className="mt-8">Nuestros Valores</h2>
            <ul className="list-disc pl-6 mt-4">
                <li><strong>Compromiso con la Ciencia:</strong> Cada recomendación que brindamos está basada en estudios científicos rigurosos.</li>
                <li><strong>Personalización:</strong> Creemos que cada persona es única y, por lo tanto, su dieta debe ser única también.</li>
                <li><strong>Innovación Continua:</strong> La tecnología es una herramienta poderosa para mejorar vidas, y nosotros la aprovechamos al máximo.</li>
                <li><strong>Accesibilidad:</strong> Queremos que todas las personas puedan acceder a información confiable sobre nutrición.</li>
                <li><strong>Transparencia:</strong> Mantenemos una comunicación clara y abierta sobre cómo recopilamos y utilizamos los datos.</li>
                <li><strong>Empatía:</strong> Entendemos los desafíos individuales y trabajamos para ofrecer soluciones que realmente beneficien a nuestros usuarios.</li>
            </ul>

            {/* Sección de nutrición */}
            <h2 className="mt-8">Información Nutricional</h2>
            <p className="mt-4">
                Proporcionamos análisis detallados de macronutrientes, micronutrientes y guías basadas en
                investigaciones científicas. NutriWizard hace que el entendimiento de estos nutrientes sea fácil, mostrando el impacto que cada uno tiene en tu salud. Los principales componentes incluyen:
            </p>
            <ul className="list-disc pl-6 mt-4">
                <li><strong>Macronutrientes:</strong> Proteínas, carbohidratos y grasas que son esenciales para la energía y el crecimiento.</li>
                <li><strong>Micronutrientes:</strong> Vitaminas y minerales necesarios para funciones inmunológicas y equilibrio general.</li>
                <li><strong>Recomendaciones personalizadas:</strong> Basadas en objetivos individuales, como pérdida de peso, ganancia muscular y bienestar general.</li>
                <li><strong>Balance Calórico:</strong> Análisis de ingesta calórica y gasto energético para mantener, perder o ganar peso de manera saludable.</li>
                <li><strong>Suplementación:</strong> Guías sobre cuándo y cómo incorporar suplementos de manera segura y efectiva.</li>
            </ul>

            {/* Ejemplos de cómo NutriWizard puede ayudar */}
            <h3 className="mt-8">¿Cómo puede ayudarte NutriWizard?</h3>
            <ol className="list-decimal pl-6 mt-4">
                <li>Optimizar tu dieta y ayudarte a comprender cómo los alimentos influyen en tu bienestar.</li>
                <li>Guiarte en tus objetivos de salud, ya sea perder peso, aumentar la masa muscular o simplemente mejorar tu energía diaria.</li>
                <li>Informarte sobre los beneficios de cada nutriente, para que puedas tomar decisiones inteligentes sobre lo que comes.</li>
                <li>Brindarte recursos educativos para que te sientas empoderado y sepas más sobre nutrición.</li>
                <li>Proporcionar seguimiento continuo y ajustes en tus recomendaciones para adaptarse a tus progresos y cambios en tu vida.</li>
                <li>Ofrecer planes de comidas personalizados que se alineen con tus preferencias y restricciones dietéticas.</li>
                <li>Integrar tus datos de salud de otras aplicaciones y dispositivos para una visión holística de tu bienestar.</li>
            </ol>

            {/* Cita de famoso */}
            <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-700 mt-6">
                "NutriWizard no solo ha revolucionado mi dieta, sino también mi forma de ver la nutrición. Cada detalle está cuidadosamente calculado para hacer de mi alimentación algo óptimo y personalizado."
                <br />— <span className="font-semibold">Juan Pérez, Experto en Salud y Bienestar</span>
            </blockquote>

            {/* Tecnología y ciencia */}
            <h2 className="mt-8">Tecnología y Ciencia</h2>
            <p className="mt-4">
                Utilizamos tecnología avanzada, incluyendo <span className="italic">aprendizaje automático</span> e <span className="italic">inteligencia artificial</span>, para ofrecer recomendaciones personalizadas. Nuestro equipo de desarrolladores y científicos se asegura de que cada dato esté procesado con precisión y relevancia. Algunas de las innovaciones clave incluyen:
            </p>
            <ul className="list-disc pl-6 mt-4">
                <li><strong>Análisis de Datos en Tiempo Real:</strong> Procesamos grandes volúmenes de datos nutricionales para ofrecer resultados precisos y rápidos.</li>
                <li><strong>Modelos Predictivos:</strong> Anticipamos necesidades nutricionales basadas en tu historial y objetivos.</li>
                <li><strong>Recomendaciones Basadas en IA:</strong> Ofrecemos sugerencias de alimentos y nutrientes ideales para ti.</li>
                <li><strong>Integración con Dispositivos Wearables:</strong> Conectamos con dispositivos como smartwatches y fitness trackers para recopilar datos en tiempo real sobre tu actividad física y salud.</li>
                <li><strong>Seguridad y Privacidad:</strong> Implementamos estrictas medidas de seguridad para proteger tu información personal y de salud.</li>
                <li><strong>Actualizaciones Continuas:</strong> Nuestro sistema se actualiza regularmente con las últimas investigaciones y desarrollos tecnológicos para mantener la relevancia y precisión de nuestras recomendaciones.</li>
            </ul>

            {/* Tabla de Nutrientes */}
            <h3 className="mt-8">Composición de Nutrientes</h3>
            <p>
                A continuación, un desglose de algunos nutrientes clave y sus beneficios para tu cuerpo:
            </p>
            <table className="table-auto border-collapse w-full mt-4">
                <thead>
                <tr className="bg-gray-200">
                    <th className="px-4 py-2 border">Nutriente</th>
                    <th className="px-4 py-2 border">Función</th>
                    <th className="px-4 py-2 border">Fuentes</th>
                    <th className="px-4 py-2 border">Recomendación Diaria</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="border px-4 py-2">Proteínas</td>
                    <td className="border px-4 py-2">Esenciales para el crecimiento y la reparación celular</td>
                    <td className="border px-4 py-2">Carnes, legumbres, frutos secos, productos lácteos</td>
                    <td className="border px-4 py-2">46-56 gramos</td>
                </tr>
                <tr className="bg-gray-100">
                    <td className="border px-4 py-2">Carbohidratos</td>
                    <td className="border px-4 py-2">Fuente principal de energía</td>
                    <td className="border px-4 py-2">Frutas, vegetales, granos enteros, cereales</td>
                    <td className="border px-4 py-2">225-325 gramos</td>
                </tr>
                <tr>
                    <td className="border px-4 py-2">Grasas</td>
                    <td className="border px-4 py-2">Ayudan a absorber vitaminas y protegen órganos</td>
                    <td className="border px-4 py-2">Aceites, aguacates, nueces, pescados grasos</td>
                    <td className="border px-4 py-2">70-97 gramos</td>
                </tr>
                <tr className="bg-gray-100">
                    <td className="border px-4 py-2">Vitaminas</td>
                    <td className="border px-4 py-2">Soportan funciones inmunológicas y metabólicas</td>
                    <td className="border px-4 py-2">Frutas, verduras, lácteos, cereales fortificados</td>
                    <td className="border px-4 py-2">Varía según la vitamina</td>
                </tr>
                <tr>
                    <td className="border px-4 py-2">Minerales</td>
                    <td className="border px-4 py-2">Necesarios para equilibrio celular y salud ósea</td>
                    <td className="border px-4 py-2">Vegetales, productos lácteos, carnes, frutos secos</td>
                    <td className="border px-4 py-2">Varía según el mineral</td>
                </tr>
                </tbody>
            </table>

            {/* Sección de impacto */}
            <h2 className="mt-8">Impacto de NutriWizard</h2>
            <p className="mt-4">
                Gracias a NutriWizard, miles de usuarios han mejorado su calidad de vida mediante el conocimiento y la toma de decisiones informadas. Nos esforzamos por brindar una experiencia de usuario excepcional y un enfoque de atención al detalle que permita a nuestros usuarios ver resultados tangibles.
            </p>
            <ul className="list-disc pl-6 mt-4">
                <li><strong>Resultados Sostenibles:</strong> Ayudamos a crear hábitos saludables que se mantengan a largo plazo.</li>
                <li><strong>Bienestar Integral:</strong> Nos enfocamos en mejorar tanto la salud física como mental.</li>
                <li><strong>Soporte y Comunidad:</strong> Creemos en el poder de una comunidad informada y motivada.</li>
                <li><strong>Educación Continua:</strong> Proporcionamos recursos y herramientas para que siempre puedas aprender más sobre nutrición.</li>
                <li><strong>Acceso Global:</strong> Nuestra plataforma está disponible para usuarios de todo el mundo, eliminando barreras geográficas.</li>
            </ul>

            {/* Testimonios */}
            <h2 className="mt-8">Testimonios</h2>
            <div className="space-y-6">
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
                    "NutriWizard me ha ayudado a entender mejor mis necesidades nutricionales. Gracias a sus recomendaciones personalizadas, he logrado perder peso de manera saludable y mantener mi energía durante todo el día."
                    <br />— <span className="font-semibold">María González, Ingeniera de Software</span>
                </blockquote>
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
                    "La precisión de NutriWizard en el análisis de mis nutrientes ha sido impresionante. Ahora puedo planificar mis comidas con confianza y saber que estoy alimentando mi cuerpo de la mejor manera posible."
                    <br />— <span className="font-semibold">Carlos Ramírez, Atleta Profesional</span>
                </blockquote>
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
                    "Como nutricionista, encuentro en NutriWizard una herramienta invaluable para mis pacientes. Les proporciona información clara y basada en evidencia que complementa perfectamente mis consultas."
                    <br />— <span className="font-semibold">Dra. Laura Martínez, Nutricionista Clínica</span>
                </blockquote>
            </div>

            {/* Sección de estadísticas de impacto */}
            <h2 className="mt-8">Estadísticas de Impacto</h2>
            <p className="mt-4">
                Las cifras hablan por sí mismas. NutriWizard ha impactado positivamente a nuestros usuarios de diversas maneras:
            </p>
            <table className="table-auto border-collapse w-full mt-4">
                <thead>
                <tr className="bg-gray-200">
                    <th className="px-4 py-2 border">Métrica</th>
                    <th className="px-4 py-2 border">Valor</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="border px-4 py-2">Usuarios Activos</td>
                    <td className="border px-4 py-2">150,000+</td>
                </tr>
                <tr className="bg-gray-100">
                    <td className="border px-4 py-2">Planes Personalizados Creados</td>
                    <td className="border px-4 py-2">500,000+</td>
                </tr>
                <tr>
                    <td className="border px-4 py-2">Testimonios Recibidos</td>
                    <td className="border px-4 py-2">10,000+</td>
                </tr>
                <tr className="bg-gray-100">
                    <td className="border px-4 py-2">Países Disponibles</td>
                    <td className="border px-4 py-2">50+</td>
                </tr>
                <tr>
                    <td className="border px-4 py-2">Actualizaciones de Datos Nutricionales</td>
                    <td className="border px-4 py-2">Diarias</td>
                </tr>
                </tbody>
            </table>
            <p className="mt-4">
                Estas estadísticas reflejan nuestro compromiso continuo con la excelencia y la expansión de nuestros servicios para llegar a más personas que buscan mejorar su salud y bienestar a través de una nutrición informada.
            </p>

            {/* Preguntas Frecuentes */}
            <h2 className="mt-8">Preguntas Frecuentes (FAQ)</h2>
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold">¿Qué es NutriWizard?</h3>
                    <p>
                        NutriWizard es una plataforma integral de nutrición personalizada que utiliza ciencia avanzada y tecnología de inteligencia artificial para ofrecer recomendaciones nutricionales adaptadas a las necesidades individuales de cada usuario.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold">¿Cómo funciona NutriWizard?</h3>
                    <p>
                        Al registrarte, proporcionas información sobre tu salud, objetivos nutricionales y preferencias alimenticias. Nuestro sistema analiza estos datos utilizando algoritmos avanzados para generar un plan de nutrición personalizado que se adapta a tus necesidades específicas.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold">¿Es seguro compartir mi información personal?</h3>
                    <p>
                        Sí, la seguridad y privacidad de tus datos son nuestra prioridad. Implementamos estrictas medidas de seguridad para proteger tu información personal y de salud, cumpliendo con todas las normativas de protección de datos vigentes.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold">¿NutriWizard es adecuado para personas con condiciones de salud específicas?</h3>
                    <p>
                        Sí, NutriWizard puede adaptar sus recomendaciones para personas con diversas condiciones de salud, como diabetes, hipertensión, alergias alimentarias, entre otras. Sin embargo, siempre es recomendable consultar con un profesional de la salud antes de realizar cambios significativos en tu dieta.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold">¿Puedo utilizar NutriWizard en múltiples dispositivos?</h3>
                    <p>
                        Absolutamente. NutriWizard está diseñado para ser accesible desde cualquier dispositivo con conexión a internet, ya sea tu smartphone, tablet o computadora, permitiéndote acceder a tus planes y recomendaciones en cualquier momento y lugar.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold">¿Hay costos asociados a NutriWizard?</h3>
                    <p>
                        Ofrecemos diferentes planes de suscripción que se adaptan a tus necesidades y presupuesto. También contamos con una versión gratuita con funcionalidades limitadas para que puedas probar nuestros servicios antes de comprometerte con una suscripción paga.
                    </p>
                </div>
            </div>

            {/* Recursos Educativos */}
            <h2 className="mt-8">Recursos Educativos</h2>
            <p className="mt-4">
                En NutriWizard, no solo te proporcionamos planes de nutrición personalizados, sino que también te ofrecemos una amplia gama de recursos educativos para que puedas aprender más sobre nutrición y salud. Estos recursos incluyen:
            </p>
            <ul className="list-disc pl-6 mt-4">
                <li><strong>Artículos y Blogs:</strong> Contenido actualizado sobre las últimas tendencias y descubrimientos en nutrición.</li>
                <li><strong>Webinars y Talleres:</strong> Sesiones interactivas con expertos en nutrición y salud.</li>
                <li><strong>E-books y Guías:</strong> Materiales descargables que profundizan en temas específicos de nutrición.</li>
                <li><strong>Calculadoras Nutricionales:</strong> Herramientas para calcular tus necesidades calóricas y de macronutrientes.</li>
                <li><strong>Foros y Comunidades:</strong> Espacios para compartir experiencias, hacer preguntas y recibir apoyo de otros usuarios.</li>
            </ul>
            <p className="mt-4">
                Estos recursos están diseñados para empoderarte con el conocimiento necesario para tomar decisiones informadas sobre tu alimentación y estilo de vida.
            </p>

            {/* Sección de colaboración */}
            <h2 className="mt-8">Colaboración y Alianzas</h2>
            <p className="mt-4">
                En NutriWizard, valoramos las colaboraciones que nos permiten expandir nuestro alcance y mejorar nuestros servicios. Trabajamos junto a:
            </p>
            <ul className="list-disc pl-6 mt-4">
                <li><strong>Profesionales de la Salud:</strong> Médicos, nutricionistas y terapeutas que aportan su experiencia para validar y mejorar nuestras recomendaciones.</li>
                <li><strong>Instituciones Académicas:</strong> Universidades y centros de investigación que contribuyen con estudios y datos científicos.</li>
                <li><strong>Empresas de Tecnología:</strong> Socios tecnológicos que nos ayudan a integrar las últimas innovaciones en nuestra plataforma.</li>
                <li><strong>Organizaciones Comunitarias:</strong> Grupos que promueven la salud y el bienestar a nivel local y global.</li>
            </ul>
            <p className="mt-4">
                Estas alianzas nos permiten ofrecer un servicio más completo y adaptado a las necesidades cambiantes de nuestros usuarios.
            </p>

            {/* Sección de sostenibilidad */}
            <h2 className="mt-8">Sostenibilidad y Responsabilidad Social</h2>
            <p className="mt-4">
                En NutriWizard, estamos comprometidos con prácticas sostenibles y responsables que beneficien tanto a nuestros usuarios como al planeta. Nuestras iniciativas incluyen:
            </p>
            <ul className="list-disc pl-6 mt-4">
                <li><strong>Promoción de Dietas Sostenibles:</strong> Fomentamos el consumo de alimentos que son beneficiosos para la salud humana y el medio ambiente.</li>
                <li><strong>Reducción de Desperdicios:</strong> Ofrecemos recomendaciones que ayudan a minimizar el desperdicio de alimentos en el hogar.</li>
                <li><strong>Apoyo a Agricultores Locales:</strong> Incentivamos el consumo de productos locales y de temporada.</li>
                <li><strong>Educación Ambiental:</strong> Proporcionamos información sobre cómo tus elecciones alimenticias pueden impactar positivamente el medio ambiente.</li>
                <li><strong>Responsabilidad Social:</strong> Participamos en programas y proyectos que apoyan a comunidades vulnerables en su acceso a una nutrición adecuada.</li>
            </ul>
            <p className="mt-4">
                Creemos que una nutrición saludable va de la mano con la sostenibilidad ambiental y social, y trabajamos continuamente para integrar estos valores en todas nuestras operaciones.
            </p>

            {/* Sección de equipo */}
            <h2 className="mt-8">Conoce a Nuestro Equipo</h2>
            <p className="mt-4">
                El éxito de NutriWizard se debe al talento y dedicación de nuestro equipo multidisciplinario. Nuestro equipo está compuesto por:
            </p>
            <ul className="list-disc pl-6 mt-4">
                <li><strong>Nutricionistas y Dietistas:</strong> Profesionales certificados que desarrollan y validan nuestros planes nutricionales.</li>
                <li><strong>Científicos de Datos:</strong> Expertos en análisis de datos que optimizan nuestros algoritmos de personalización.</li>
                <li><strong>Desarrolladores de Software:</strong> Ingenieros que construyen y mantienen la plataforma, asegurando una experiencia de usuario fluida y segura.</li>
                <li><strong>Especialistas en Marketing:</strong> Profesionales que comunican nuestro valor y ayudan a crecer nuestra comunidad.</li>
                <li><strong>Atención al Cliente:</strong> Un equipo dedicado a brindar soporte y resolver cualquier duda o problema que puedan tener nuestros usuarios.</li>
            </ul>
            <p className="mt-4">
                Cada miembro de nuestro equipo comparte la pasión por la nutrición y el compromiso de hacer de NutriWizard una herramienta esencial para la salud y el bienestar de nuestros usuarios.
            </p>

            {/* Sección de innovación */}
            <h2 className="mt-8">Innovación Continua</h2>
            <p className="mt-4">
                En NutriWizard, la innovación es el corazón de todo lo que hacemos. Nos esforzamos por estar a la vanguardia de las tendencias y tecnologías emergentes para ofrecer soluciones que realmente marquen la diferencia en la vida de nuestros usuarios. Algunas de nuestras iniciativas de innovación incluyen:
            </p>
            <ul className="list-disc pl-6 mt-4">
                <li><strong>Integración con IA y Machine Learning:</strong> Utilizamos inteligencia artificial para analizar patrones de consumo y predecir necesidades nutricionales futuras.</li>
                <li><strong>Realidad Aumentada (AR) para Planificación de Comidas:</strong> Estamos explorando el uso de AR para ayudarte a visualizar y planificar tus comidas de manera interactiva.</li>
                <li><strong>Análisis Genético:</strong> Investigamos la posibilidad de incorporar análisis genéticos para ofrecer recomendaciones aún más personalizadas.</li>
                <li><strong>Gamificación:</strong> Implementamos elementos de juego para hacer que el seguimiento de tu nutrición sea más divertido y motivador.</li>
                <li><strong>Colaboraciones con Startups Innovadoras:</strong> Trabajamos con nuevas empresas que aportan ideas frescas y tecnologías disruptivas al campo de la nutrición.</li>
            </ul>
            <p className="mt-4">
                Estas iniciativas nos permiten no solo mantenernos relevantes, sino también liderar el camino en la evolución de la nutrición personalizada.
            </p>

            {/* Sección de testimonios adicionales */}
            <h2 className="mt-8">Más Testimonios</h2>
            <div className="space-y-6">
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
                    "Gracias a NutriWizard, he podido gestionar mejor mi diabetes a través de una dieta personalizada que se adapta a mis necesidades específicas."
                    <br />— <span className="font-semibold">Luis Fernández, Emprendedor</span>
                </blockquote>
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
                    "La plataforma es increíblemente fácil de usar y las recomendaciones son claras y efectivas. He visto una mejora notable en mi energía y bienestar general."
                    <br />— <span className="font-semibold">Sofía López, Estudiante Universitaria</span>
                </blockquote>
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
                    "NutriWizard ha sido una herramienta esencial en mi camino hacia una vida más saludable. La personalización y el soporte constante son invaluables."
                    <br />— <span className="font-semibold">Andrés Torres, Profesional de Marketing</span>
                </blockquote>
            </div>

            {/* Sección de blog y noticias */}
            <h2 className="mt-8">Blog y Noticias</h2>
            <p className="mt-4">
                Mantente al día con las últimas novedades en nutrición, salud y tecnología a través de nuestro blog. Publicamos regularmente artículos escritos por expertos, estudios de caso, consejos prácticos y noticias sobre nuestros avances y colaboraciones.
            </p>
            <ul className="list-disc pl-6 mt-4">
                <li><strong>Artículos Especializados:</strong> Profundizamos en temas específicos como dietas basadas en plantas, nutrición para deportistas, y más.</li>
                <li><strong>Entrevistas con Expertos:</strong> Conversaciones con nutricionistas, médicos y científicos que aportan su perspectiva sobre tendencias actuales.</li>
                <li><strong>Actualizaciones de Productos:</strong> Información sobre nuevas funcionalidades y mejoras en nuestra plataforma.</li>
                <li><strong>Historias de Éxito:</strong> Relatos inspiradores de usuarios que han transformado su salud con la ayuda de NutriWizard.</li>
                <li><strong>Investigaciones Recientes:</strong> Resúmenes y análisis de los últimos estudios en nutrición y salud.</li>
            </ul>
            <p className="mt-4">
                Suscríbete a nuestro boletín para recibir las últimas actualizaciones directamente en tu bandeja de entrada.
            </p>

            {/* Sección de eventos */}
            <h2 className="mt-8">Eventos y Talleres</h2>
            <p className="mt-4">
                Participa en nuestros eventos y talleres diseñados para brindarte conocimientos prácticos y herramientas útiles para mejorar tu nutrición y salud. Ofrecemos una variedad de formatos para adaptarnos a tus preferencias y horarios.
            </p>
            <ul className="list-disc pl-6 mt-4">
                <li><strong>Talleres en Línea:</strong> Sesiones interactivas sobre temas específicos de nutrición, lideradas por expertos en la materia.</li>
                <li><strong>Webinars Mensuales:</strong> Presentaciones en vivo sobre las últimas tendencias y descubrimientos en nutrición.</li>
                <li><strong>Retiro de Bienestar:</strong> Eventos presenciales que combinan nutrición, ejercicio y técnicas de manejo del estrés.</li>
                <li><strong>Charlas Educativas:</strong> Presentaciones informativas para empresas y organizaciones interesadas en promover la salud de sus empleados.</li>
                <li><strong>Desafíos de Salud:</strong> Competencias amigables para motivarte a alcanzar tus objetivos de salud y bienestar.</li>
            </ul>
            <p className="mt-4">
                Consulta nuestro calendario de eventos para no perderte ninguna de nuestras próximas actividades.
            </p>

            {/* Sección de partners */}
            <h2 className="mt-8">Nuestros Partners</h2>
            <p className="mt-4">
                En NutriWizard, creemos en la colaboración para lograr un impacto mayor. Hemos establecido alianzas estratégicas con organizaciones que comparten nuestra visión de promover una nutrición saludable y sostenible. Nuestros partners incluyen:
            </p>
            <ul className="list-disc pl-6 mt-4">
                <li><strong>Instituciones de Investigación:</strong> Colaboramos con universidades y centros de estudio para integrar las últimas investigaciones en nuestra plataforma.</li>
                <li><strong>Empresas de Tecnología:</strong> Trabajamos con compañías tecnológicas para mejorar nuestras capacidades de análisis de datos y personalización.</li>
                <li><strong>Organizaciones de Salud Pública:</strong> Asociaciones que promueven la salud y el bienestar a nivel comunitario y nacional.</li>
                <li><strong>Proveedores de Alimentos Saludables:</strong> Colaboraciones con productores y distribuidores que ofrecen productos nutritivos y sostenibles.</li>
                <li><strong>Startups Innovadoras:</strong> Alianzas con nuevas empresas que aportan soluciones frescas y disruptivas en el ámbito de la nutrición.</li>
            </ul>
            <p className="mt-4">
                Estas asociaciones nos permiten ampliar nuestro alcance y mejorar continuamente nuestros servicios para ofrecerte lo mejor en nutrición personalizada.
            </p>

            {/* Sección de carrera */}
            <h2 className="mt-8">Únete a Nuestro Equipo</h2>
            <p className="mt-4">
                Si compartes nuestra pasión por la nutrición y la tecnología, y deseas contribuir a mejorar la salud y el bienestar de las personas, ¡te invitamos a unirte a nuestro equipo! En NutriWizard, valoramos la diversidad, la innovación y el compromiso con la excelencia.
            </p>
            <ul className="list-disc pl-6 mt-4">
                <li><strong>Oportunidades de Crecimiento:</strong> Ofrecemos un entorno dinámico donde puedes desarrollar tus habilidades y avanzar en tu carrera.</li>
                <li><strong>Ambiente Colaborativo:</strong> Trabaja junto a profesionales talentosos y apasionados por hacer una diferencia.</li>
                <li><strong>Beneficios Competitivos:</strong> Paquetes de compensación atractivos, incluyendo seguros de salud, opciones de trabajo remoto y más.</li>
                <li><strong>Proyectos Innovadores:</strong> Participa en iniciativas que utilizan tecnología de vanguardia para resolver desafíos reales en nutrición.</li>
                <li><strong>Compromiso con la Sostenibilidad:</strong> Forma parte de una empresa que valora y promueve prácticas sostenibles y responsables.</li>
            </ul>
            <p className="mt-4">
                Explora nuestras vacantes actuales y descubre cómo puedes ser parte de la misión de NutriWizard.
            </p>

            {/* Sección de premios y reconocimientos */}
            <h2 className="mt-8">Premios y Reconocimientos</h2>
            <p className="mt-4">
                Nuestra dedicación y excelencia en el campo de la nutrición personalizada nos han valido reconocimientos y premios en diversas ocasiones. Estos logros reflejan nuestro compromiso con la calidad y la innovación:
            </p>
            <ul className="list-disc pl-6 mt-4">
                <li><strong>Premio a la Innovación en Salud:</strong> Reconocimiento por nuestras soluciones tecnológicas avanzadas en nutrición.</li>
                <li><strong>Mejor Plataforma de Nutrición:</strong> Distinción otorgada por su facilidad de uso y efectividad en recomendaciones personalizadas.</li>
                <li><strong>Certificación de Calidad:</strong> Acreditación por cumplir con los más altos estándares de calidad en servicios de salud.</li>
                <li><strong>Premio al Servicio al Cliente:</strong> Reconocimiento por nuestro excepcional soporte y atención a los usuarios.</li>
                <li><strong>Mención Honorífica en Tecnología:</strong> Destacado por nuestras innovaciones en el uso de inteligencia artificial para la nutrición.</li>
            </ul>
            <p className="mt-4">
                Estos reconocimientos nos motivan a seguir mejorando y ofreciendo lo mejor a nuestros usuarios.
            </p>

            {/* Sección de compromiso con la comunidad */}
            <h2 className="mt-8">Compromiso con la Comunidad</h2>
            <p className="mt-4">
                En NutriWizard, creemos en retribuir a la comunidad y en apoyar iniciativas que promuevan la salud y el bienestar. Nuestro compromiso incluye:
            </p>
            <ul className="list-disc pl-6 mt-4">
                <li><strong>Programas de Apoyo:</strong> Participamos en programas que brindan acceso gratuito o a bajo costo a NutriWizard para comunidades vulnerables.</li>
                <li><strong>Educación Nutricional:</strong> Organizamos talleres y charlas gratuitas para educar a la comunidad sobre la importancia de una buena nutrición.</li>
                <li><strong>Voluntariado Corporativo:</strong> Fomentamos que nuestros empleados participen en actividades de voluntariado que beneficien a la comunidad.</li>
                <li><strong>Donaciones:</strong> Contribuimos con recursos y fondos a organizaciones sin fines de lucro que trabajan en el ámbito de la salud y la nutrición.</li>
                <li><strong>Iniciativas Ambientales:</strong> Apoyamos proyectos que buscan reducir el impacto ambiental de la producción y consumo de alimentos.</li>
            </ul>
            <p className="mt-4">
                Estos esfuerzos reflejan nuestra responsabilidad social y nuestro deseo de crear un impacto positivo más allá de nuestra plataforma.
            </p>

            {/* Sección de contacto */}
            <h2 className="mt-8">Contáctanos</h2>
            <p className="mt-4">
                ¿Tienes alguna pregunta? ¿Te gustaría saber más sobre cómo NutriWizard puede ayudarte a mejorar tu
                nutrición? <a href="mailto:support@nutriwizard.com" className="text-blue-600 hover:underline">Envíanos un mensaje</a>. Estamos aquí para ayudarte en cada paso de tu viaje hacia una vida más saludable.
            </p>

            {/* Sección de redes sociales */}
            <h2 className="mt-8">Síguenos en Redes Sociales</h2>
            <p className="mt-4">
                Mantente conectado y recibe las últimas actualizaciones, consejos de nutrición y más siguiendo nuestras redes sociales:
            </p>
            <ul className="list-disc pl-6 mt-4">
                <li><a href="https://facebook.com/nutriwizard" className="text-blue-600 hover:underline">Facebook</a></li>
                <li><a href="https://twitter.com/nutriwizard" className="text-blue-600 hover:underline">Twitter</a></li>
                <li><a href="https://instagram.com/nutriwizard" className="text-blue-600 hover:underline">Instagram</a></li>
                <li><a href="https://linkedin.com/company/nutriwizard" className="text-blue-600 hover:underline">LinkedIn</a></li>
                <li><a href="https://youtube.com/nutriwizard" className="text-blue-600 hover:underline">YouTube</a></li>
            </ul>
            <p className="mt-4">
                Únete a nuestra comunidad y participa en conversaciones sobre nutrición, comparte tus logros y encuentra apoyo en tu camino hacia una vida más saludable.
            </p>

            {/* Sección de blog destacados */}
            <h2 className="mt-8">Destacados del Blog</h2>
            <p className="mt-4">
                Explora algunos de nuestros artículos más populares que han ayudado a nuestros usuarios a comprender mejor su nutrición y mejorar su salud:
            </p>
            <ul className="list-disc pl-6 mt-4">
                <li><a href="/blog/importancia-de-los-micronutrientes" className="text-blue-600 hover:underline">La Importancia de los Micronutrientes en tu Dieta Diaria</a></li>
                <li><a href="/blog/como-la-ia-revoluciona-la-nutricion" className="text-blue-600 hover:underline">Cómo la Inteligencia Artificial Revoluciona la Nutrición Personalizada</a></li>
                <li><a href="/blog/planificacion-de-comidas-sostenibles" className="text-blue-600 hover:underline">Planificación de Comidas Sostenibles: Consejos y Estrategias</a></li>
                <li><a href="/blog/nutricion-para-deportistas" className="text-blue-600 hover:underline">Nutrición para Deportistas: Maximiza tu Rendimiento</a></li>
                <li><a href="/blog/gestion-del-peso-de-forma-saludable" className="text-blue-600 hover:underline">Gestión del Peso de Forma Saludable: Mitos y Realidades</a></li>
            </ul>
            <p className="mt-4">
                Estos artículos están diseñados para proporcionarte información valiosa y prácticas recomendadas que puedes implementar en tu vida diaria.
            </p>

            {/* Sección de políticas y términos */}
            <h2 className="mt-8">Políticas y Términos</h2>
            <p className="mt-4">
                Tu confianza es importante para nosotros. Te invitamos a revisar nuestras políticas para entender cómo manejamos tu información y qué puedes esperar al utilizar nuestros servicios:
            </p>
            <ul className="list-disc pl-6 mt-4">
                <li><a href="/terms-of-service" className="text-blue-600 hover:underline">Términos de Servicio</a></li>
                <li><a href="/privacy-policy" className="text-blue-600 hover:underline">Política de Privacidad</a></li>
                <li><a href="/cookie-policy" className="text-blue-600 hover:underline">Política de Cookies</a></li>
                <li><a href="/data-security" className="text-blue-600 hover:underline">Seguridad de Datos</a></li>
                <li><a href="/refund-policy" className="text-blue-600 hover:underline">Política de Reembolsos</a></li>
            </ul>
            <p className="mt-4">
                Al utilizar NutriWizard, aceptas nuestros términos y condiciones. Nos comprometemos a proteger tu información y a ofrecerte un servicio transparente y confiable.
            </p>

            {/* Sección de newsletter */}
            <h2 className="mt-8">Suscríbete a Nuestro Newsletter</h2>
            <p className="mt-4">
                Mantente informado con las últimas novedades, consejos de nutrición y ofertas exclusivas suscribiéndote a nuestro boletín mensual. Simplemente ingresa tu correo electrónico a continuación:
            </p>
            <form className="mt-4">
                <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="border border-gray-300 p-2 rounded-l-md focus:outline-none"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700">
                    Suscribirse
                </button>
            </form>
            <p className="mt-2 text-sm text-gray-600">
                No compartimos tu información con terceros. Puedes darte de baja en cualquier momento.
            </p>
        </div>
    );
};

export default About;