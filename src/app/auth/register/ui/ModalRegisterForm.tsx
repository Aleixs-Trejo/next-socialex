'use client';

interface Props {
  onAccept: () => void;
  onClose: () => void;
}

export const ModalRegisterForm = ({ onAccept, onClose }: Props) => {
  return (
    <section className="modal-form-register fixed inset-0 w-full h-full bg-black/80 flex items-center justify-center" onClick={onClose}>
      <div className="w-9/10 max-w-2xl mx-auto bg-accent-dark px-4 py-8 rounded-lg h-4/5 overflow-auto" onClick={(e) => e.stopPropagation()}>
        <div className="w-full flex flex-col gap-4 text-white">
          <h2 className="text-lg font-bold text-center">
            Términos y Condiciones de Socialex
          </h2>
          <ul className="flex flex-col gap-4 list-decimal list-inside opacity-90">
            <li>
              En Socialex puedes explorar como se te dé la gana. Nadie supervisa tu
              actividad… o eso queremos que creas. 👀
            </li>
            <li>
              El contenido que veas aquí puede ser brillante, absurdo o
              completamente innecesario. No garantizamos estabilidad mental.
            </li>
            <li>
              Si algo te ofende, recuerda: cerrar la pestaña sigue siendo gratis.
            </li>
            <li>
              Algunos usuarios saben lo que hacen. Otros no. No preguntes.
            </li>
            <li>
              ¿Sigues leyendo esto? Increíble. Literalmente nadie llega tan lejos.
            </li>
            <li>
              No prometemos fama, dinero ni validación emocional. Pero oye, a veces
              pasan cosas.
            </li>
            <li>
              Compórtate como un ser humano decente. O al menos finge bien.
            </li>
            <li>
              Socialex puede hacerte perder tiempo de forma irresponsable. Usar bajo
              tu propio riesgo.
            </li>
            <li>
              Podemos cambiar cosas sin avisar: diseño, reglas, colores o incluso
              nuestra opinión.
            </li>
            <li>
              Al aceptar estos términos declaras oficialmente que no los leíste
              completos… excepto esta línea.
            </li>
            <li>
              Si llegaste hasta aquí, ya eres demasiado curioso para tu propio bien.
            </li>
          </ul>
          <button type="button" className="btn-primary" onClick={onAccept}>Aceptar y continuar</button>
        </div>
      </div>
    </section>
  );
};