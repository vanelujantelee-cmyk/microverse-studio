import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-zinc-300 p-6 md:p-12 pt-32 max-w-4xl mx-auto leading-relaxed">
      <h1 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tighter">
        Política de Devoluciones y Reembolsos
      </h1>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-bold text-purple-400 mb-4 uppercase tracking-widest text-sm">
            1. Derecho de Retracto (Ley 1480 de 2011)
          </h2>
          <p>
            En cumplimiento de la ley colombiana, el cliente tiene derecho a retractarse de su compra dentro de los 
            <strong> cinco (5) días hábiles</strong> siguientes a la entrega del producto. Para que el retracto sea efectivo, 
            el libro debe ser devuelto en las mismas condiciones en que fue recibido: sellado, sin señales de uso, 
            rayones o daños en el lomo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-purple-400 mb-4 uppercase tracking-widest text-sm">
            2. Garantía por Defectos de Fábrica
          </h2>
          <p>
            Si recibes un ejemplar con errores de impresión, páginas faltantes o daños físicos ocurridos durante el transporte, 
            tienes un plazo de <strong>30 días calendario</strong> para solicitar el cambio. Editorial Microcosmos asumirá 
            todos los costos de envío en casos de garantía demostrable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-purple-400 mb-4 uppercase tracking-widest text-sm">
            3. Proceso de Devolución
          </h2>
          <p>
            Para iniciar cualquier trámite, el cliente debe comunicarse a través de nuestro canal oficial de WhatsApp 
            (+57 311 491 7441) o al correo de la editorial, adjuntando el comprobante de compra y evidencia fotográfica del estado del producto.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-zinc-400">
            <li>En devoluciones por retracto (gusto personal), el costo del envío de retorno será cubierto por el cliente.</li>
            <li>En cambios por garantía o error en el envío, la editorial cubrirá la totalidad de los gastos logísticos.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-purple-400 mb-4 uppercase tracking-widest text-sm">
            4. Reembolsos
          </h2>
          <p>
            Una vez recibido el producto en nuestras instalaciones y verificado su estado, el reembolso se procesará 
            en un máximo de <strong>15 días hábiles</strong>. El dinero será devuelto a través del mismo medio de pago 
            utilizado en la compra o mediante transferencia bancaria acordada con el cliente.
          </p>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-zinc-800 text-zinc-500 text-xs">
        <p>Última actualización: Abril 2026</p>
        <p>Editorial Microcosmos - Medellín, Antioquia, Colombia.</p>
        <p className="mt-4 italic">Al realizar una compra en nuestro sitio, aceptas los términos aquí descritos.</p>
      </div>
    </div>
  );
};

export default ReturnPolicy;